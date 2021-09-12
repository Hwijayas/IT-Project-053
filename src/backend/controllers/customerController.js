const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// Add customer function
const addCustomer = (customer, user, res) => {
  try {
    Customer.find({
      name: customer.name,
      company: customer.company,
      email: customer.email,
      phone: customer.phone,
    }).exec()
      // eslint-disable-next-line consistent-return
      .then((data) => {
        if (data.length >= 1) {
          if (!data[0].user.includes(user._id)) data[0].user.push(user._id);
          return res.status(422).json({
            message: 'Customer already exists',
            deal: data,
          });
        }
        const newCustomer = new Customer({
          _id: new mongoose.Types.ObjectId(),
          name: customer.name,
          company: customer.company,
          email: customer.email,
          phone: customer.phone,
        });
        newCustomer.user.push(user._id);

        newCustomer.save()
          .then(() => {
            res.status(201).json({ success: true, msg: 'Customer Created!', deal: newCustomer });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    res.status(201);
  } catch (error) {
    console.log(error);
  }
};

// handler to create deals
const userAddsCustomer = async (req, res) => {
  addCustomer(req.body, req.user, res);

};

module.exports.addCustomer = addCustomer;
module.exports.userAddsCustomer = userAddsCustomer;
