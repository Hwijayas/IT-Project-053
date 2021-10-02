const Deal = require('../models/deal');
const customerController = require('./customerController');

const USER_ONLY = 'Access Denied';

// Function to create deals
const userCreateDeal = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }
  const customer = await customerController.addCustomer(req.body.customer, req.user._id);

  // https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
  const query = {
    dealName: req.body.dealName,
    value: req.body.value,
    customer: customer._id,
  };
  const update = {
    dealName: req.body.dealName,
    value: req.body.value,
    customer: customer._id,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document or create one
  const deal = await Deal.findOneAndUpdate(query, update, options);

  // Add the user if not present
  if (deal.user.indexOf(req.user._id) === -1) deal.user.push(req.user._id);
  await deal.save();

  return res.status(201).json({
    success: true, msg: 'Deal created!', deal, customer,
  });
};

// Function to update deals
const userUpdateDeal = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const deal = await Deal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { dealName: req.body.dealName, value: req.body.value },
      { new: true },
    );

    if (deal === null) {
      res.status(400).json({ success: false, msg: 'Deal not found!' });
    } else {
      const customer = await customerController.addCustomer(req.body.customer, req.user._id);
      deal.customer = customer._id;
      await deal.save();
      res.status(200).json({
        success: true, msg: 'Deal updated!', deal, customer,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateDealStatus = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const dealId = req.params.id;
    const newStatus = req.body.status;
    Deal.findOneAndUpdate({ _id: dealId }, { status: newStatus }, (err, deal) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, msg: 'Bad request' });
      } else if (deal != null) {
        res.status(200).json({ success: true, msg: 'Deal status updated!' });
      } else {
        res.status(404).json({ success: false, msg: 'Deal not found!' });
      }
    });
  } catch (err) {
    next(err);
  }
};

// view all Deals
const viewDeals = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }
  const deals = await Deal.find({ user: req.user._id, delStatus: false }).populate('customer');
  res.send(deals);
};

// Function to toggle deal deletion status
const flagDealDeletion = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const dealId = req.params.id;

    Deal.findOne({ _id: dealId }, (err, deal) => {
      if (err) {
        console.log(err);
        res.status(404);
      } else {
        const newDelStatus = !deal.delStatus;
        Deal.findOneAndUpdate({ _id: dealId }, { delStatus: newDelStatus },
          { new: true }, (error, dealFound) => {
            if (error) {
              console.log(error);
              res.status(404);
            } else if (dealFound == null) {
              console.log(error);
              res.status(404);
            } else {
              res.status(200).json({ success: true, msg: 'Deal deletion flag updated!' });
            }
          });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.userCreateDeal = userCreateDeal;
module.exports.userUpdateDeal = userUpdateDeal;
// module.exports.userDeleteDeal = userDeleteDeal;
module.exports.updateDealStatus = updateDealStatus;
module.exports.viewDeals = viewDeals;
module.exports.flagDealDeletion = flagDealDeletion;
