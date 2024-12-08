const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();
const port = 8036;
const allowedOrigins = ['http://localhost:8033'];
const corsOptions = {
origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
},
optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));


const psqlPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Megagram',
    password: 'WINwin1$',
});

const mySQLPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'WINwin1$',
    database: 'Megagram',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const countryCurrencyMap = {
    "the United States": "$", // USD - US Dollar
    "Australia": "A$",     // AUD - Australian Dollar
    "Canada": "C$",        // CAD - Canadian Dollar
    "China": "CN¥",          // CNY - Chinese Yuan
    "Germany": "€",        // EUR - Euro
    "India": "₹",          // INR - Indian Rupee
    "Japan": "¥",          // JPY - Japanese Yen
    "Mexico": "MX$",         // MXN - Mexican Peso
    "United Kingdom": "£"  // GBP - British Pound
};

let idsOfPendingOrdersToCancel;
try {
    const data = fs.readFileSync('idsOfPendingOrdersToCancel.json', 'utf8');
    idsOfPendingOrdersToCancel = new Set(JSON.parse(data));

} catch (err) {
    console.log('No previous data found, starting fresh.');
    idsOfPendingOrdersToCancel = new Set();
}

let idToPaymentIntentIdMappings;
try {
    const data = fs.readFileSync('idToPaymentIntentIdMappings.json', 'utf8');
    idToPaymentIntentIdMappings = JSON.parse(data);

} catch (err) {
    console.log('No previous data found, starting fresh.');
    idToPaymentIntentIdMappings = {};
}


app.get("/listStripePaymentMethodsOfUser", async (req, res) => {
    try {
        const username = req.query.username;
        const customers = await stripe.customers.list();
        let customer = customers.data.find(c => c.metadata.username === username);
        if(customer==null) {
            customer = await stripe.customers.create({
                metadata: {
                    username: username
                }
            });
        }
        let customerId = customer.id;

        let paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card'
        });


        const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

        paymentMethods = paymentMethods.data.map(pm => {
            return {
            ...pm,
            isDefault: pm.id === defaultPaymentMethodId
            };
        });

        res.send({
            paymentMethods: paymentMethods,
            customerId: customerId
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.post("/createSetupIntent", async (req, res) => {
    try {
        const customerId = req.body.customerId;
        const setupIntent = await stripe.setupIntents.create({
            customer: customerId
        });
        res.send({ clientSecret: setupIntent.client_secret });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.patch('/setDefaultPayment', async (req, res) => {
    try {
        const customerId = req.body.customerId;
        const paymentMethodID = req.body.paymentMethodID;

        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodID
            }
        });

        res.status(200).send('Payment method set as default');

        }
    catch (error) {
        console.error('Error setting default payment method:', error);
        res.status(500).send('Error setting default payment method');
    }
});

app.delete('/removePaymentMethod', async (req, res) => {
    try {
        const { paymentMethodId } = req.body;
        const detachedPaymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

        res.status(200).send(`Payment method ${detachedPaymentMethod.id} removed successfully`);
    }
    catch (error) {
        console.error('Error removing payment method:', error);
        res.status(500).send('Error removing payment method');
    }
});

app.get("/getAllPlacedOrders", async (req, res) => {
    try {
        const psqlQuery = "SELECT * FROM placed_orders";
        const results = await psqlPool.query(psqlQuery);
        res.send(results.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.post("/addPlacedOrder/:order_id", async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const username = req.body.username;
        const product_id = req.body.product_id;
        const date_time_of_purchase = req.body.date_time_of_purchase;
        const options_chosen = req.body.options_chosen;
        const country_of_purchase = req.body.country_of_purchase;
        const net_item_payment = req.body.net_item_payment;
        const net_shd_payment = req.body.net_shd_payment;
        const tax = req.body.tax;
        const scheduled_for = req.body.scheduled_for;
        const quantity = req.body.quantity;
        const factory_address = req.body.factory_address;
        const delivery_address = req.body.delivery_address;
        const is_pickup = req.body.is_pickup;
        const has_premium = req.body.has_premium;
        const deal_chosen = req.body.deal_chosen;
        const payment_method_id = req.body.payment_method_id;
        
        const psqlMutation = `
        INSERT INTO placed_orders (order_id, username, product_id, date_time_of_purchase, options_chosen,
        country_of_purchase, net_item_payment, net_shd_payment, tax, scheduled_for, quantity, factory_address,
        delivery_address, is_pickup, has_premium, deal_chosen, payment_method_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,  $17)
        RETURNING id;`;

        const insertResult = await psqlPool.query(psqlMutation, [order_id, username, product_id, date_time_of_purchase,
        options_chosen, country_of_purchase, net_item_payment, net_shd_payment, tax, scheduled_for, quantity, factory_address,
        delivery_address, is_pickup, has_premium, deal_chosen, payment_method_id]);

        res.status(201).send({ id: insertResult.rows[0].id });
    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.patch("/editPlacedOrder/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {
            order_id,
            username,
            product_id,
            date_time_of_purchase,
            options_chosen,
            country_of_purchase,
            net_item_payment,
            net_shd_payment,
            tax,
            scheduled_for,
            status,
            quantity,
            factory_address,
            delivery_address,
            is_pickup,
            has_premium,
            deal_chosen,
            payment_method_id
        } = req.body;

        const fieldsToUpdate = [];
        const values = [];
        let index = 1;

        if(order_id) {
            fieldsToUpdate.push(`order_id = $${index++}`);
            values.push(order_id);
        }
        if (username) {
            fieldsToUpdate.push(`username = $${index++}`);
            values.push(username);
        }
        if (product_id) {
            fieldsToUpdate.push(`product_id = $${index++}`);
            values.push(product_id);
        }
        if (date_time_of_purchase) {
            fieldsToUpdate.push(`date_time_of_purchase = $${index++}`);
            values.push(date_time_of_purchase);
        }
        if (options_chosen) {
            fieldsToUpdate.push(`options_chosen = $${index++}`);
            values.push(options_chosen);
        }
        if (country_of_purchase) {
            fieldsToUpdate.push(`country_of_purchase = $${index++}`);
            values.push(country_of_purchase);
        }
        if (net_item_payment) {
            fieldsToUpdate.push(`net_item_payment = $${index++}`);
            values.push(net_item_payment);
        }
        if (net_shd_payment) {
            fieldsToUpdate.push(`net_shd_payment = $${index++}`);
            values.push(net_shd_payment);
        }
        if (tax) {
            fieldsToUpdate.push(`tax = $${index++}`);
            values.push(tax);
        }
        if (scheduled_for) {
            fieldsToUpdate.push(`scheduled_for = $${index++}`);
            values.push(scheduled_for);
        }
        if (status) {
            fieldsToUpdate.push(`status = $${index++}`);
            values.push(status);
        }
        if (quantity) {
            fieldsToUpdate.push(`quantity = $${index++}`);
            values.push(quantity);
        }
        if(factory_address) {
            fieldsToUpdate.push(`factory_address = $${index++}`);
            values.push(factory_address);
        }
        if(delivery_address) {
            fieldsToUpdate.push(`delivery_address = $${index++}`);
            values.push(delivery_address);
        }
        if(is_pickup) {
            fieldsToUpdate.push(`is_pickup = $${index++}`);
            values.push(is_pickup);
        }
        if(has_premium) {
            fieldsToUpdate.push(`has_premium = $${index++}`);
            values.push(has_premium);
        }
        if(deal_chosen) {
            fieldsToUpdate.push(`deal_chosen = $${index++}`);
            values.push(deal_chosen);
        }
        if(payment_method_id) {
            fieldsToUpdate.push(`payment_method_id = $${index++}`);
            values.push(payment_method_id);
        }
        if (fieldsToUpdate.length === 0) {
            return res.status(400).send({ error: "No fields provided for update" });
        }

        values.push(id);

        const psqlMutation = `
        UPDATE placed_orders
        SET ${fieldsToUpdate.join(", ")}
        WHERE id = $${index}
        RETURNING *;`;

        const editResult = await psqlPool.query(psqlMutation, values);

        if (editResult.rows.length == 0) {
            return res.status(404).send({ error: "Placed Order not found" });
        }

        res.status(200).send(editResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});


app.delete("/deleteSinglePlacedOrder/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const psqlMutation = `
        DELETE FROM placed_orders WHERE id = $1;`;

        const deleteResult = await psqlPool.query(psqlMutation, [id]);

        if(deleteResult.rowCount>0) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.delete("/deletePlacedOrders/:order_id", async (req, res) => {
    try {
        const order_id = req.params.order_id;

        const psqlMutation = `
        DELETE FROM placed_orders WHERE order_id = $1;`;

        const deleteResult = await psqlPool.query(psqlMutation, [order_id]);

        if(deleteResult.rowCount>0) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.patch("/cancelSinglePlacedOrder/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const psqlQuery = "SELECT status FROM placed_orders WHERE id = $1";
        const queryResult = await psqlPool.query(psqlQuery, [id]);
        if (queryResult.rows.length == 0) {
            return res.status(404).send({ error: "Placed Order not found" });
        }

        const row = queryResult.rows[0];
        if(row.status==='Pending') {
            idsOfPendingOrdersToCancel.add(row.id);
            res.status(200).send({
                message: "Success!"
            });
        }
        else if(row.status==='Confirmed') {
            const psqlMutation = `
            UPDATE placed_orders
            SET status = 'Cancelled'
            WHERE id = $1;`;

            await psqlPool.query(psqlMutation, [id]);

            res.status(200).send({
                message: "Success!"
            });
        }
        else {
            res.status(400).send({
                error: "Too late to cancel this placed order"
            });
        }

    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

app.patch("/cancelPlacedOrders/:order_id", async (req, res) => {
    try {
        const order_id = req.params.order_id;

        const psqlQuery = "SELECT id, status FROM placed_orders WHERE order_id = $1";
        const queryResults = await psqlPool.query(psqlQuery, [order_id]);
        if (queryResults.rows.length == 0) {
            return res.status(404).send({ error: "Placed Orders not found" });
        }

        let numIndividualOrdersTooLateToCancel = 0;
        let idsOfIndividualOrdersToCancel = [];
        for(let row of queryResults.rows) {
            if(row.status==='Pending') {
                idsOfPendingOrdersToCancel.add(row.id);
            }
            else if(row.status==='Confirmed') {
                idsOfIndividualOrdersToCancel.push(row.id);
            }
            else {
                numIndividualOrdersTooLateToCancel++;
            }
        }

        if(idsOfIndividualOrdersToCancel.length>0) {
            const psqlMutation = `
            UPDATE placed_orders
            SET status = 'Cancelled'
            WHERE id = ANY($1);`;

            await psqlPool.query(psqlMutation, [idsOfIndividualOrdersToCancel]);
        }

        if(numIndividualOrdersTooLateToCancel>0) {
            res.status(400).send({
                numIndividualOrdersTooLateToCancel: numIndividualOrdersTooLateToCancel
            });
        }
        else {
            res.status(200).send({
                message: "Success!"
            });
        }
    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});


app.post("/placeNewOrders/:order_id", async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const username = req.body.username;
        const date_time_of_purchase = req.body.date_time_of_purchase;
        const orderedItems = req.body.orderedItems;
        const country_of_purchase = req.body.country_of_purchase;
        const has_premium = req.body.has_premium;
        const delivery_address = req.body.delivery_address;
        const is_pickup = req.body.is_pickup;
        const payment_method_id = req.body.payment_method_id;

        const currency = countryCurrencyMap[country_of_purchase];
        const fieldsToInsert = [];
        const values = [];
        let index = 1;

        for(let item of orderedItems) {
            fieldsToInsert.push(`($${index}, $${index+1}, $${index+2}, $${index+3}, $${index+4}, $${index+5}, $${index+6}, $${index+7}, $${index+8}, $${index+9}, $${index+10}, $${index+11}, $${index+12}, $${index+13}, $${index+14}, $${index+15}, $${index+16})`);
            index+=17;
            values.push(order_id); //order_id
            values.push(username); //username
            values.push(item.productId); //product_id
            values.push(date_time_of_purchase); //date_time_of_purchase
            values.push(item.productOptionsWithoutText); //options_chosen
            values.push(country_of_purchase); //country_of_purchase
            if(item.deals.length==0 || (has_premium==false && item.deals[0].requirement==='PREMIUM')) {
                let net_item_payment = parseFloat(item.productPrice.substring(currency.length))*item.quantity;
                net_item_payment = net_item_payment.toFixed(2);
                net_item_payment = parseFloat(net_item_payment);
                values.push(net_item_payment); //net_item_payment
            }
            else {
                let net_item_payment = parseFloat(item.deals[0].prices[1].substring(currency.length));
                net_item_payment = net_item_payment.toFixed(2);
                net_item_payment = parseFloat(net_item_payment);
                values.push(net_item_payment); //net_item_payment
            }
            if(has_premium==false) {
                let net_shd_payment = parseFloat(item.shippingAndHandlingPrice.substring(currency.length))*item.quantity;
                net_shd_payment = net_shd_payment.toFixed(2);
                net_shd_payment = parseFloat(net_shd_payment);
                values.push(net_shd_payment); //net_shd_payment
            }
            else {
                let net_shd_payment = parseFloat(item.shippingAndHandlingPrice.substring(currency.length))*item.quantity - parseFloat(item.shdPriceSavedWithPremium.substring(currency.length))*item.quantity
                net_shd_payment = net_shd_payment.toFixed(2);
                net_shd_payment = parseFloat(net_shd_payment);
                values.push(net_shd_payment); //net_shd_payment
            }
            let tax = parseFloat(item.tax.substring(currency.length)*item.quantity);
            tax = tax.toFixed(2);
            tax = parseFloat(tax);
            values.push(tax); //tax
            if('deliveryDate' in item) {
                const newWeekday = item.deliveryDate[0];
                const newMonthAndDay = item.deliveryDate[1];
                const newYear = item.deliveryDate[3];
                let newSHDPriceDifference = parseFloat(item.deliveryDate[4]);
                let newTaxDifference = parseFloat(item.deliveryDate[5]);
                let newSHDPriceSavedForPremiumDifference = parseFloat(item.deliveryDate[6]);

                values.push(newWeekday + ", " + newMonthAndDay + " " + newYear); //scheduled_for

                let net_shd_payment = values[values.length-3] + newSHDPriceDifference*item.quantity;
                net_shd_payment = net_shd_payment.toFixed(2);
                net_shd_payment = parseFloat(net_shd_payment);
                values[values.length-3] = net_shd_payment; //updating net_shd_payment
                if(has_premium==true) {
                    net_shd_payment = values[values.length-3] - newSHDPriceSavedForPremiumDifference*item.quantity;
                    net_shd_payment = net_shd_payment.toFixed(2);
                    net_shd_payment = parseFloat(net_shd_payment);
                    values[values.length-3]= net_shd_payment; //updating net_shd_payment
                }
                let tax = values[values.length-2] + newTaxDifference*item.quantity;
                tax = tax.toFixed(2);
                tax = parseFloat(tax);
                values[values.length-2] = tax //updating tax
            }
            else {
                values.push(item.scheduled_for); //scheduled_for
            }
            values.push(item.quantity); //quantity
            if('deliveryDate' in item) {
                values.push(item.deliveryDate[6]); //factory_address
            }
            else {
                values.push(item.factoryAddress); //factory_address
            }
            values.push(delivery_address); //delivery_address
            values.push(is_pickup); //is_pickup
            values.push(has_premium); //has_premium
            if(item.deals.length==0 || (has_premium==false && item.deals[0].requirement==='PREMIUM')) {
                values.push(null); //deal_chosen
            }
            else {
                values.push(item.deals[0]); //deal_chosen
            }
            values.push(payment_method_id); //payment_method_id
        }

        const psqlMutation = `
        INSERT INTO placed_orders (order_id, username, product_id, date_time_of_purchase, options_chosen,
        country_of_purchase, net_item_payment, net_shd_payment, tax, scheduled_for, quantity, factory_address,
        delivery_address, is_pickup, has_premium, deal_chosen, payment_method_id) VALUES
        ${fieldsToInsert.join(", ")};`;

        await psqlPool.query(psqlMutation, values);

        res.status(201).send(true);
    }
    catch(error) {
        console.error(error);
        res.status(500).send({error: error.message});
    }
});

//disclaimer: the complex function below contains a bunch of pseudocode in place of actual code
async function processPlacedOrdersEvery12s() {
    try {
        const psqlQuery = "SELECT * FROM placed_orders WHERE status = 'Pending' OR status = 'Cancelled' OR status = 'Delivered'";
        const results = await psqlPool.query(psqlQuery);
        let idsOfIndividualOrdersToDelete = new Set();
        let idsOfIndividualOrdersToConfirm = new Set();
        let rowsOfIndividualOrdersThatHaveBeenDelivered = new Set();
        const usernameToOrderNotificationsMappings = {};
        const idToPlacedOrderMappings = {};

        const countryToStripeCurrencyCode = {
            "the United States": "usd",
            "United Kingdom": "gbp",
            "India": "inr",
            "Japan": "jpy",
            "China": "cny",
            "Mexico": "mxn",
            "Germany": "eur",
            "Canada": "cad",
            "Australia": "aud"
        };

        const countryToStripeCurrencyCoefficients = {
            "the United States": 100, // USD - cents
            "United Kingdom": 100,    // GBP - pence
            "India": 100,             // INR - paisa
            "Japan": 1,               // JPY - no subunit
            "China": 100,             // CNY - fen
            "Mexico": 100,            // MXN - centavos
            "Germany": 100,           // EUR - cents
            "Canada": 100,            // CAD - cents
            "Australia": 100          // AUD - cents
        };

        for(let placedOrder of results.rows) {
            let {
                id,
                order_id,
                username,
                product_id,
                date_time_of_purchase,
                options_chosen,
                country_of_purchase,
                net_item_payment,
                net_shd_payment,
                tax,
                scheduled_for,
                status,
                quantity,
                factory_address,
                delivery_address,
                is_pickup,
                has_premium,
                deal_chosen,
                payment_method_id
            } = placedOrder;

            idToPlacedOrderMappings[id] = placedOrder;


            if(placedOrder.status==='Pending') {
                /*
                    check if product still delivers to delivery-address of user, if not delete this order

                    check the upto-date prices(i.e for net_item_payment, net_shd_payment, tax) and
                    if the total exceeds what is neccesary, update net_item_payment, net_shd_payment, and tax, else delete this order

                    check if the deal chosen by the user still exists and is not expired currently, if not delete order

                    check if product can deliver in time of scheduled_for if not update scheduled_for

                    check if product-options are sufficient in-stock for the quantity and if so update quantity, else delete this order

                    charge user for the total of the net_item_payment, net_shd_payment, and tax and deduct the appropriate amount
                    if there is change

                    update status of order to 'Confirmed' if order has not been deleted by the process above

                    whenever an order is confirmed or change is found or an order cannot be made or an order needs to be delayed, send user an email/text about it
                */
                if(idsOfPendingOrdersToCancel.has(id)) {
                    idsOfIndividualOrdersToDelete.add(id);
                    idsOfPendingOrdersToCancel.remove(id);
                    if(username in usernameToOrderNotificationsMappings == false) {
                        usernameToOrderNotificationsMappings[username] = {};
                    }
                    usernameToOrderNotificationsMappings[username][id] = ['Cancelled Pending Order', placedOrder];
                    continue;
                }

                //the code below assumes that the order above has cleared all the criteria and is ready for purchase
                const customers = await stripe.customers.list();
                const customer = customers.data.find(c => c.metadata.username === username);
                const totalAmountToChargeUser = net_item_payment+net_shd_payment+tax;
                const paymentIntent = await stripe.paymentIntents.create({
                    customer: customer.id,
                    payment_method: payment_method_id,
                    amount: Math.round(totalAmountToChargeUser*countryToStripeCurrencyCoefficients[country_of_purchase]),
                    currency: countryToStripeCurrencyCode[country_of_purchase],
                    confirm: true,
                    automatic_payment_methods: {
                        enabled: true,
                        allow_redirects: 'never',
                    },
                });
                idToPaymentIntentIdMappings[id] = paymentIntent.id;

                idsOfIndividualOrdersToConfirm.add(id);
                if(username in usernameToOrderNotificationsMappings == false) {
                    usernameToOrderNotificationsMappings[username] = {};
                }
                usernameToOrderNotificationsMappings[username][id] = ['Confirmed', placedOrder];
            }
            else if(placedOrder.status==='Cancelled') {
                //update stock of product-and-options if the product-and-options still exist
                await stripe.refunds.create({
                    payment_intent: idToPaymentIntentIdMappings[id],
                });

                idsOfIndividualOrdersToDelete.add(id);
                if(username in usernameToOrderNotificationsMappings == false) {
                    usernameToOrderNotificationsMappings[username] = {};
                }
                usernameToOrderNotificationsMappings[username][id] = ['Cancelled', placedOrder];
            }
            else {  //status is 'Delivered'
                idsOfIndividualOrdersToDelete.add(id);
                rowsOfIndividualOrdersThatHaveBeenDelivered.add(placedOrder);
                if(username in usernameToOrderNotificationsMappings == false) {
                    usernameToOrderNotificationsMappings[username] = {};
                }
                usernameToOrderNotificationsMappings[username][id] = ['Delivered', placedOrder];
            }
        }

        
        if(idsOfIndividualOrdersToConfirm.size>0) {
            const psqlMutation = `
            UPDATE placed_orders
            SET status = 'Confirmed'
            WHERE id = ANY($1);`;
    
            await psqlPool.query(psqlMutation, [[...idsOfIndividualOrdersToConfirm]]);
        }

        if(idsOfIndividualOrdersToDelete.size>0) {
            const psqlMutation = `
            DELETE FROM placed_orders
            WHERE id = ANY($1);`;
    
            await psqlPool.query(psqlMutation, [[...idsOfIndividualOrdersToDelete]]);
        }

        for(let ID of idsOfPendingOrdersToCancel) {
            if(idsOfIndividualOrdersToConfirm.has(ID)) {
                //update stock of product-and-options if the product-and-options still exist
                await stripe.refunds.create({
                    payment_intent: idToPaymentIntentIdMappings[ID],
                });

                const psqlMutation = `
                DELETE FROM placed_orders
                WHERE id = $1;`;
                await psqlPool.query(psqlMutation, [ID]);

                usernameToOrderNotificationsMappings[username][ID] = ['Cancelled', idToPlacedOrderMappings[ID]];
                idsOfPendingOrdersToCancel.remove(ID);
            }
            else if(idsOfIndividualOrdersToDelete.has(ID)) {
                usernameToOrderNotificationsMappings[username][ID] = ['Cancelled Pending Order', idToPlacedOrderMappings[ID]];
                idsOfPendingOrdersToCancel.remove(ID);
            }
        }

        for(let deliveredOrder of rowsOfIndividualOrdersThatHaveBeenDelivered) {
            const addPastOrder = 'INSERT INTO pastOrders (productId, customerUsername, date_time_of_purchase, optionsChosen, countryOfPurchase) VALUES (?, ?, ?, ?, ?)';
            mySQLPool.query(addPastOrder, [deliveredOrder.product_id, deliveredOrder.username, deliveredOrder.date_time_of_purchase, deliveredOrder.options_chosen, deliveredOrder.country_of_purchase], (err, _) => {
                if (err) {
                    console.error('Error executing query: ', err);
                }
            });
        }

        for(let _username of Object.keys(usernameToOrderNotificationsMappings)) {
            //send email or text to the username about their orderNotifications
        }
    }
    catch (error) {
        console.error(error);
    }
}

setInterval(processPlacedOrdersEvery12s, 12000);
processPlacedOrdersEvery12s();


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



process.on('exit', () => {
    fs.writeFileSync('idsOfPendingOrdersToCancel.json', JSON.stringify([...idsOfPendingOrdersToCancel]));
    fs.writeFileSync('idToPaymentIntentIdMappings.json', JSON.stringify(idToPaymentIntentIdMappings));
});

process.on('SIGINT', async () => {
    await psqlPool.end();
    mySQLPool.end();
    process.exit(0);
});
