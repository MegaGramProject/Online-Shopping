const { buildSchema } = require("graphql")

var schema = buildSchema(`
    type ProductDeal {
        productId: String!
        deal: String!
        required: String!
        expiration: String!
    }

    type UsedShoppingProduct {
        used_product_id: String!
        original_product_id: String!
        condition: Int!
        options: String!
        price_of_each_option: String!
        price_per_unit_of_each_option: String!
        seller_username: String!
    }

    type Query {
        getAllProductDeals: [ProductDeal!]!
        getAllProductDealsOfProduct(productId: String!): [ProductDeal!]!

        getAllUsedShoppingProducts: [UsedShoppingProduct!]!
        getAllUsedShoppingProductsOfOriginal(original_product_id: String!): [UsedShoppingProduct!]!
    }

    type Mutation {
        addProductDeal(productId: String!, deal: String!, required: String!, expiration: String!): String
        editProductDeal(productId: String!, deal: String!, required: String!, expiration: String!): ProductDeal
        deleteProductDeal(productId: String!, deal: String!): Boolean!

        addUsedShoppingProduct(used_product_id: String!, original_product_id: String!, condition: Int!, options: String!, price_of_each_option: String!, price_per_unit_of_each_option: String!, seller_username: String!): UsedShoppingProduct
        editUsedShoppingProduct(used_product_id: String!, original_product_id: String! condition: Int!, options: String!, price_of_each_option: String!, price_per_unit_of_each_option: String!, seller_username: String!): UsedShoppingProduct
        deleteUsedShoppingProduct(used_product_id: String!): Boolean!
    }
`);


module.exports = schema;