const { buildSchema } = require("graphql");
const schema = buildSchema(`

type Customer{
    _id: String
    first_name : String
    last_name : String
    age:Int
    cust_type: custTypeEnum
}

enum custTypeEnum
{
    Basic
    Gold
    Premium
}


input CustomerInput{
    first_name : String
    last_name : String
    age:Int
    cust_type: custTypeEnum
}

type Mutation{
    createCustomer(input:CustomerInput):Customer
    updateCustomer(id:String,input:CustomerInput):Customer
    deleteCustomer(id:String):String
}

type CustomQueryType{
    customers : [Customer],
    getCustomer(id:String):Customer
}

schema {
    query: CustomQueryType
    mutation: Mutation
}`);

module.exports = schema;
