require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const database = require("./config/database");
const {
  gql,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} = require("@apollo/client");

const app = express();

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8080/graphql",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

app.get("/", (req, res) => {
  res.send("Home page GraphQL");
});

app.get("/api/customers/:customer_id", (req, res) => {
  const customerId = req.params.customer_id;

  const GET_CUSTOMER = gql`
    query getCustomer($customerId: String) {
      getCustomer(id: $customerId) {
        first_name
      }
    }
  `;

  client
    .query({
      query: GET_CUSTOMER,
      variables: { customerId },
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const connectToDB = async () => {
  //console.log("database url--" + database.url);
  await mongoose.connect(database.url);
};

connectToDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(8080, () => {
      console.log("server running on 8080");
    });
  })
  .catch((e) => {
    console.log("Cannot connect to database");
    console.error(e);
  });
