const adminRouter = require('express').Router();

const Donor = require('../models/donors');
const Hospital = require('../models/hospitals');
const BloodBank = require('../models/bloodbanks');
const Request = require('../models/requests');


// Admin Login
adminRouter.post('/login', async (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({
      error: 'Missing credentials'
    });
  }

  if (
    adminId !== process.env.ADMIN_ID ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      error: 'Invalid credentials'
    });
  }

  return res.status(200).json({
    status: 'success',
    role: 'admin'
  });
});

// Get All Donors
adminRouter.get('/donors', async (req, res) => {
  try {
    const donors = await Donor
      .find({})
      .select('-password');

    return res.json(donors);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});


// Get All Hospitals
adminRouter.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital
      .find({})
      .select('-password');

    return res.json(hospitals);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});


// Get All Blood Banks
adminRouter.get('/bloodbanks', async (req, res) => {
  try {
    const bloodBanks = await BloodBank
      .find({})
      .select('-password');

    return res.json(bloodBanks);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// Verify Donor
adminRouter.put('/donors/:id/verify', async (req, res) => {
  try {
    const donor = await Donor.findById(
      req.params.id
    );

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    donor.verified = true;

    await donor.save();

    return res.json({
      status: 'verified'
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Verify Hospital
adminRouter.put('/hospitals/:id/verify', async (req, res) => {
  try {
    const hospital = await Hospital.findById(
      req.params.id
    );

    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      });
    }

    hospital.verified = true;

    await hospital.save();

    return res.json({
      status: 'verified'
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Verify Blood Bank
adminRouter.put('/bloodbanks/:id/verify', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.id
    );

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    bloodBank.verified = true;

    await bloodBank.save();

    return res.json({
      status: 'verified'
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = adminRouter;