const Customer = require('../models/customer');
const Deal = require('../models/deal');
// Add customer to DB
const addCustomer = async (customerDetails, userID) => {
  // https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
  const query = {
    name: customerDetails.name,
    company: customerDetails.company,
    email: customerDetails.email,
    phone: customerDetails.phone,
  };
  const update = {
    name: customerDetails.name,
    company: customerDetails.company,
    email: customerDetails.email,
    phone: customerDetails.phone,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  const customer = await Customer.findOneAndUpdate(query, update, options);

  // Add the user if not present
  if (customer.user.indexOf(userID) === -1) customer.user.push(userID);
  await customer.save();

  return customer;
};

// handler to create deals
const userAddsCustomer = async (req, res) => {
  const customer = await addCustomer(req.body, req.user._id);
  res.status(422).json({
    message: 'Customer added',
    customer,
  });
};

const updateCustomer = async (customerID, userID, newDetails) => Customer.findOneAndUpdate(
  { _id: customerID, user: userID }, {
    name: newDetails.name,
    company: newDetails.company,
    email: newDetails.email,
    phone: newDetails.phone,
  }, { new: true },
);

// handles updates customer request
const userUpdateCustomer = async (req, res) => {
  const customer = await updateCustomer(req.params.id, req.user._id, req.body);

  if (customer == null) {
    return res.status(401).json({ success: false, msg: 'could not find customer' });
  }
  return res.status(200).json({
    success: true,
    customer,
  });
};

// Function to delete customer
const userDeleteCustomer = async (req, res) => {
  const customerID = req.params.id;

  const count = await Deal.countDocuments({ customer: customerID });

  // Safe delete option: Delete customer if not referenced in deal
  if (count === 0) {
    Customer.findOneAndDelete({ _id: customerID, user: req.user._id }, (err, deal) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, msg: 'Bad request' });
      } else if (deal != null) {
        res.status(200).json({ success: true, msg: 'Customer deleted!' });
      } else {
        res.status(404).json({ success: false, msg: 'Customer not found!' });
      }
    });
  } else {
    res.status(405).json({ success: false, msg: 'Customer reference present in a deal; cannot delete' });
  }
};

module.exports.userAddsCustomer = userAddsCustomer;
module.exports.userUpdateCustomer = userUpdateCustomer;
module.exports.userDeleteCustomer = userDeleteCustomer;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
