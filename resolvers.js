const Customer = require("./models/customer");
const resolvers = {
  customers: async () => {
    const customers = await Customer.find();
    console.log("customers--", customers.length);
    return customers;
  },

  getCustomer: async ({ id }) => {
    console.log(id);
    const customer = await Customer.findById(id);
    console.log(customer);
    return customer;
  },

  createCustomer: async ({ input }) => {
    const customer = await Customer.create({
      first_name: input.first_name,
      last_name: input.last_name,
      age: input.age,
      cust_type: input.cust_type,
    });
    return customer;
  },

  updateCustomer: async ({ id, input }) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, input, {
      new: true,
    });
    return updatedCustomer;
  },

  deleteCustomer: async ({ id }) => {
    const deletedCustomer = await Customer.deleteOne({
      _id: id,
    });
    return "Sucessfully deleted";
  },
};

module.exports = resolvers;
