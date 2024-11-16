const schema = require('./schema.js');
const express = require('express');
const { createHandler } = require("graphql-http/lib/use/express")
const cors = require('cors');
const { ruruHTML } = require("ruru/server")
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');


const app = express();
const port = 8030;
const allowedOrigins = ['http://localhost:8030', 'http://localhost:8024', 'http://localhost:8033'];
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

async function connectToDatabase() {
    if (!mongoClient.isConnected) {
        await mongoClient.connect();
    }
}

connectToDatabase().catch(console.error);

const psqlPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Megagram',
    password: 'WINwin1$',
});

var root = {
    async getAllProductDeals() {
        try {
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const allProductDeals = await collection.find({}, { projection: { _id: 0 } }).toArray();
            return allProductDeals;
        } catch (error) {
            return [];
        }
    },

    async getAllProductDealsOfProduct(args) {
        try {
            const productId = args.productId;
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const allProductDealsOfProduct = await collection.find({productId: productId}, { projection: { _id: 0 } }).toArray();
            return allProductDealsOfProduct;
        } catch (error) {
            return [];
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
            const database = mongoClient.db('Megagram');
            const collection = database.collection('productDeals');
            const result = await collection.insertOne(newProductDeal);
            return result.insertedId.toString();
        } catch (error) {
            return null;
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
});

app.post("/getPairsOfProductIdsAndOptionsOfThoseInStock", (req, res) => {
    const numProductsLeftForListOfProducts = req.body.numProductsLeftForListOfProducts;
    const productIdToOptionsListMappings = req.body.productIdToOptionsListMappings;

    const output = {};
    for(let elem of numProductsLeftForListOfProducts) {
        const productId = elem.productId;
        const givenProductOptionsForCurrentProduct = productIdToOptionsListMappings[productId];
        output[productId] = [];
        for(let givenProductOptions of givenProductOptionsForCurrentProduct) {
            if(specificProductOptionsAreInStock(givenProductOptions, JSON.parse(elem.numForEachOption))) {
                output[productId].push(givenProductOptions);
            }
        }
    }
    res.send(output);
});

//DFS
function productIsInStock(partOfNumProductsLeftForSpecificProduct) {
    if(typeof partOfNumProductsLeftForSpecificProduct === 'number') {
        return partOfNumProductsLeftForSpecificProduct>0;
    }
    //if it is not an int is a dict of type <string, object>
    for(let key of Object.keys(partOfNumProductsLeftForSpecificProduct)) {
        if(productIsInStock(partOfNumProductsLeftForSpecificProduct[key])) {
            return true;
        }
    }
    return false;
}

//Not-DFS
function specificProductOptionsAreInStock(givenProductOptions, numProductsLeftForDifferentOptionsOfSpecificProduct) {
    const optionsInCorrectOrderForDeterminingNumLeft = numProductsLeftForDifferentOptionsOfSpecificProduct[0];
    //example of a value of optionsInCorrectOrderForDeterminingNumLeft would be something like ['Size', 'Color']
    const providedProductOptionsInCorrectOrderForDeterminingNumLeft = optionsInCorrectOrderForDeterminingNumLeft.map(x=>(givenProductOptions[x]).toString());
    //example of a value for above would be something like ['0', '3']

    let currentDict = numProductsLeftForDifferentOptionsOfSpecificProduct[1];
    for(let i=0; i<providedProductOptionsInCorrectOrderForDeterminingNumLeft.length; i++) {
        currentDict = currentDict[providedProductOptionsInCorrectOrderForDeterminingNumLeft[i]];
        if(typeof currentDict === 'number') {
            return currentDict>0;
        }
    }

    return currentDict>0;
}

app.post("/checkIfDealsAreAvailableForProducts", async (req, res) => {
    const output = {};
    try {
        const hasPremium = req.body.hasPremium;
        const productIds = new Set(req.body.productIds);

        for (let productId of productIds) {
            output[productId] = false;
        }

        const database = mongoClient.db('Megagram');
        const productDealsCollection = database.collection('productDeals');
        const currDateTime = new Date();
        let allDealsOfGivenProductsForUser;

        if (!hasPremium) {
            allDealsOfGivenProductsForUser = await productDealsCollection
                .find({ productId: { '$in': Array.from(productIds) }, required: { '$eq': 'NONE' } },
                { projection: { productId: 1, expiration: 1 } })
                .toArray();
        } else {
            allDealsOfGivenProductsForUser = await productDealsCollection
                .find({ productId: { '$in': Array.from(productIds) }, required: { '$in': ['NONE', 'PREMIUM'] } },
                { projection: { productId: 1, expiration: 1 } })
                .toArray();
        }

        allDealsOfGivenProductsForUser
            .filter(x => new Date(x.expiration) > currDateTime)
            .forEach(x => output[x.productId] = true);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while checking deals." });
    }

    res.send(output);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


process.on('SIGINT', async () => {
    await psqlPool.end();
    await mongoClient.close();
    process.exit(0);
});
