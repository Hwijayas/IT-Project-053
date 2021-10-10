const Deal = require('../models/deal');
const customerController = require('./customerController');

const NOT_ADMIN = 'Unauthorized, Access to Admin only';
const USER_ONLY = 'Access Denied';

// Function to create deals
const Create = async (req, res) => {
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
  const dealFound = await Deal.findOneAndUpdate(query, update, options);

  // Add the user if not present
  if (dealFound.user.indexOf(req.user._id) === -1) dealFound.user.push(req.user._id);
  await dealFound.save();

  return res.status(201).json({
    success: true, msg: 'Deal created!', deal: dealFound, customer,
  });
};

// view all Deals
const Get = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(401).json({
      message: USER_ONLY,
    });
  }
  const deals = await Deal.find({ user: req.user._id, delStatus: false }).populate('customer');
  res.send(deals);
};

// Function to get all deals that are flagged for deletion
const GetFlagged = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  const dealsFound = await Deal.find({ delStatus: true }).populate('customer');
  if (dealsFound === null) {
    res.status(400).json({ success: false, msg: 'Bad request' });
  } else {
    res.send(dealsFound);
  }
};

// view all Deals
const GetAll = async (req, res) => {
  if (req.user.isAdmin) {
    GetFlagged(req, res);
  } else {
    Get(req, res);
  }
};

// Function to update deals
const Update = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const dealFound = await Deal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { dealName: req.body.dealName, value: req.body.value },
      { new: true },
    );

    if (dealFound === null) {
      res.status(400).json({ success: false, msg: 'Deal not found!' });
    } else {
      const customer = await customerController.addCustomer(req.body.customer, req.user._id);
      dealFound.customer = customer._id;
      await dealFound.save();
      res.status(200).json({
        success: true, msg: 'Deal updated!', deal: dealFound, customer,
      });
    }
  } catch (err) {
    next(err);
  }
};

// Function to Update the status
const UpdateStatus = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const dealId = req.params.id;
    const newStatus = req.body.status;
    Deal.findOneAndUpdate({ _id: dealId, user: req.user._id },
      { status: newStatus }, (err, dealFound) => {
        if (err) {
          console.log(err);
          res.status(400).json({ success: false, msg: 'Bad request' });
        } else if (dealFound != null) {
          res.status(200).json({ success: true, msg: 'Deal status updated!' });
        } else {
          res.status(404).json({ success: false, msg: 'Deal not found!' });
        }
      });
  } catch (err) {
    next(err);
  }
};

// Function to toggle deal deletion status
const FlagDelete = (req, res) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).json({
        message: USER_ONLY,
      });
    }
    const dealId = req.params.id;

    Deal.findOne({ _id: dealId, user: req.user._id }, (err, dealFound) => {
      if (err) {
        console.log(err);
        res.status(404);
      } else {
        const newDelStatus = !dealFound.delStatus;
        Deal.findOneAndUpdate({ _id: dealId, user: req.user._id }, { delStatus: newDelStatus },
          { new: true }, (error, dealFound2) => {
            if (error) {
              console.log(error);
              res.status(404);
            } else if (dealFound2 == null) {
              console.log(error);
              res.status(404);
            } else {
              res.status(200).json({ success: true, msg: 'Deal deletion flag updated!' });
            }
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const Remove = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  const dealId = req.params.id;
  Deal.findOneAndDelete({ _id: dealId, delStatus: true }, (err, dealFound) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (dealFound != null) {
      res.status(200).json({ success: true, msg: 'Deal deleted!' });
    } else {
      res.status(404).json({ success: false, msg: 'Deal not found!' });
    }
  });
};

const Delete = async (req, res) => {
  if (req.user.isAdmin) {
    Remove(req, res);
  } else {
    FlagDelete(req, res);
  }
};

module.exports.Create = Create;
module.exports.Update = Update;
module.exports.UpdateStatus = UpdateStatus;
module.exports.GetAll = GetAll;
module.exports.Delete = Delete;
