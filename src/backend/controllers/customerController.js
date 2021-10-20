const Customer = require('../models/customer');
const Deal = require('../models/deal');

const USER_ONLY = 'Access Denied';

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
const Create = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }
  const customer = await addCustomer(req.body, req.user._id);
  return res.status(200).json({
    success: true,
    message: 'Customer added',
    customer,
  });
};

// Function to get all users
// from https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users by user soulcheck
const GetAll = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }

  const customersFound = await Customer.find({ user: req.user._id });
  if (customersFound != null) {
    return res.status(200).json({
      success: true,
      customers: customersFound,
    });
  }
  return res.status(400).json({
    message: 'Error',
  });
};

// handles updates customer request
const Update = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }

    const oldCustomer = await Customer.findOne({ _id: req.params.id, user: req.user._id });

    if (!oldCustomer) {
      return res.status(401).json({ success: false, msg: 'could not find customer' });
    }

    // Create new customer
    const updatedCustomer = await addCustomer(req.body, req.user._id);

    if (updatedCustomer._id !== oldCustomer._id) {
      oldCustomer.user.forEach((present) => {
        if (updatedCustomer.user.indexOf(present) === -1) updatedCustomer.user.push(present);
      });
      await updatedCustomer.save();

      // Update all the references in Deal
      await Deal.updateMany({ customer: oldCustomer._id }, { customer: updatedCustomer._id });

      await Customer.findByIdAndDelete(oldCustomer._id);
    }

    return res.status(200).json({
      success: true,
      customer: updatedCustomer,
    });
  } catch (err) {
    next(err);
  }
};

// Function to delete customer
const Delete = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }

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

module.exports.Create = Create;
module.exports.GetAll = GetAll;
module.exports.Update = Update;
module.exports.Delete = Delete;
module.exports.addCustomer = addCustomer;
