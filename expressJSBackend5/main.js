const schema = require('./schema.js');
const express = require('express');
const { createHandler } = require("graphql-http/lib/use/express")
const cors = require('cors');
const { ruruHTML } = require("ruru/server")
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');


const app = express();
const port = 8030;
const allowedOrigins = ['http://localhost:8030', 'http://localhost:8024'];
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


const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);


const psqlPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Megagram',
    password: 'WINwin1$',
});

var root = {
    async getAllProductDeals() {
        try {
            await mongoClient.connect();
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const allProductDeals = await collection.find({}, { projection: { _id: 0 } }).toArray();
            return allProductDeals;
        } catch (error) {
            return [];
        } finally {
            await mongoClient.close();
        }
    },

    async getAllProductDealsOfProduct(args) {
        try {
            const productId = args.productId;
            await mongoClient.connect();
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const allProductDealsOfProduct = await collection.find({productId: productId}, { projection: { _id: 0 } }).toArray();
            return allProductDealsOfProduct;
        } catch (error) {
            return [];
        } finally {
            await mongoClient.close();
        }
    },

    async addProductDeal(args) {
        try {
            const productId = args.productId;
            const deal = args.deal;
            const required = args.required;
            const expiration = args.expiration;
            const newProductDeal = {
                productId: productId,
                deal: deal,
                required: required,
                expiration: expiration
            };
            await mongoClient.connect();
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const result = await collection.insertOne(newProductDeal);
            return result.insertedId.toString();
        } catch (error) {
            return null;
        } finally {
            await mongoClient.close();
        }
    },

    async editProductDeal(args) {
        try {
            const productId = args.productId;
            const deal = args.deal;
            const required = args.required;
            const expiration = args.expiration;
            const updatedProductDeal = {
                productId: productId,
                deal: deal,
                required: required,
                expiration: expiration
            };
            await mongoClient.connect();
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const result = await collection.updateOne(
                { productId: productId, deal: deal },
                { $set: updatedProductDeal }
            );
    
            if (result.modifiedCount === 0) {
                return null;
            }
            return updatedProductDeal;
        } catch (error) {
            return null;
        } finally {
            await mongoClient.close();
        }
    },

    async deleteProductDeal(args) {
        try {
            const productId = args.productId;
            const deal = args.deal;
            await mongoClient.connect();
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const result = await collection.deleteOne({ productId: productId, deal: deal });
            if (result.deletedCount === 0) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        } finally {
            await mongoClient.close();
        }
    },

    async getAllUsedShoppingProducts() {
        try {
            const psqlQuery = "SELECT * FROM used_shopping_products";
            const results = await psqlPool.query(psqlQuery);
            return results.rows;
        }
        catch (error) {
            console.error('Error querying PostgresSQL:', error);
            return [];
        }
    },

    async getAllUsedShoppingProductsOfOriginal(args) {
        try {
            const original_product_id = args.original_product_id;
            const psqlQuery = "SELECT * FROM used_shopping_products WHERE original_product_id = $1 ORDER BY condition DESC";
            const results = await psqlPool.query(psqlQuery, [original_product_id]);
            return results.rows;
        }
        catch (error) {
            console.error('Error querying PostgresSQL:', error);
            return [];
        }
    },

    async addUsedShoppingProduct(args) {
        try {
            const used_product_id = args.used_product_id;
            const original_product_id = args.original_product_id;
            const condition = args.condition;
            const options = args.options;
            const price_of_each_option = args.price_of_each_option;
            const price_per_unit_of_each_option = args.price_per_unit_of_each_option;
            const seller_username = args.seller_username;
            const psqlMutation = `
            INSERT INTO used_shopping_products (used_product_id, original_product_id, condition, options, price_of_each_option,
            price_per_unit_of_each_option, seller_username)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;
            await psqlPool.query(psqlMutation, [used_product_id, original_product_id, condition, options,
            price_of_each_option, price_per_unit_of_each_option, seller_username]);
            return {
                used_product_id: used_product_id,
                original_product_id: original_product_id,
                condition: condition,
                options: options,
                price_of_each_option: price_of_each_option,
                price_per_unit_of_each_option: price_per_unit_of_each_option,
                seller_username: seller_username,
            };
        }
        catch (error) {
            console.error('Error querying PostgresSQL:', error);
            return null;
        }
    },

    async editUsedShoppingProduct(args) {
        try {
            const used_product_id = args.used_product_id;
            const original_product_id = args.original_product_id;
            const condition = args.condition;
            const options = args.options;
            const price_of_each_option = args.price_of_each_option;
            const price_per_unit_of_each_option = args.price_per_unit_of_each_option;
            const seller_username = args.seller_username;
            const psqlMutation = `
            UPDATE used_shopping_products
            SET original_product_id = $2,
                condition = $3,
                options = $4,
                price_of_each_option = $5,
                price_per_unit_of_each_option = $6,
                seller_username = $7
            WHERE used_product_id = $1
            `;
            const result = await psqlPool.query(psqlMutation, [used_product_id, original_product_id, condition, options,
            price_of_each_option, price_per_unit_of_each_option, seller_username]);
            if(result.rowCount>0) {
                return {
                    used_product_id: used_product_id,
                    original_product_id: original_product_id,
                    condition: condition,
                    options: options,
                    price_of_each_option: price_of_each_option,
                    price_per_unit_of_each_option: price_per_unit_of_each_option,
                    seller_username: seller_username,
                };
            }
            return null;
        }
        catch (error) {
            console.error('Error querying PostgresSQL:', error);
            return null;
        }
    },

    async deleteUsedShoppingProduct(args) {
        try {
            const used_product_id = args.used_product_id;
            const psqlMutation = `DELETE FROM used_shopping_products WHERE used_product_id = $1`;
            const result = await psqlPool.query(psqlMutation, [used_product_id]);
            if(result.rowCount>0) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error querying PostgresSQL:', error);
            return false;
        }
    }
};

app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
);

//GraphiQL: GraphQL's IDE
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: `http://localhost:${port}/graphql` }))
})

app.post("/getProductIdsOfThoseInStock", (req, res) => {
    const output = [];
    let numProductsLeftForListOfProducts = req.body.numProductsLeftForListOfProducts;
    for(let elem of numProductsLeftForListOfProducts) {
        if(productIsInStock(JSON.parse(elem.numForEachOption)[1])) {
            output.push(elem.productId);
        }
    }
    res.send(output);
})

//DFS
function productIsInStock(partOfNumProductsLeftForListOfProducts) {
    if(typeof partOfNumProductsLeftForListOfProducts === 'number') {
        return partOfNumProductsLeftForListOfProducts>0;
    }
    //if it is not an int is a dict of type <string, object>
    for(let key of Object.keys(partOfNumProductsLeftForListOfProducts)) {
        if(productIsInStock(partOfNumProductsLeftForListOfProducts[key])) {
            return true;
        }
    }
    return false;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


process.on('SIGINT', async () => {
    await psqlPool.end();
    await mongoClient.end();
    process.exit(0);
});
