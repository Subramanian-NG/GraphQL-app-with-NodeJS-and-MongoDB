const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  first_name: String,
  last_name: String,
  age: Number,
  cust_type: String,
});

module.exports = mongoose.model("customers", customerSchema, "customers");
