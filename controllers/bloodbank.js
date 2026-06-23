const bloodBankRouter = require('express').Router();

const BloodBank = require('../models/bloodbank');
const Request = require('../models/request');


// Get Blood Bank Profile
bloodBankRouter.get('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank
      .findById(req.params.id)
      .select('-password');

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    return res.json(bloodBank);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Blood Bank Profile
bloodBankRouter.put('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.id
    );

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    bloodBank.name =
      req.body.name || bloodBank.name;

    bloodBank.phone =
      req.body.phone || bloodBank.phone;

    bloodBank.address =
      req.body.address || bloodBank.address;

    bloodBank.city =
      req.body.city || bloodBank.city;

    const updatedBloodBank =
      await bloodBank.save();

    return res.json(updatedBloodBank);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Get Inventory
bloodBankRouter.get('/:id/inventory', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.id
    );

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    return res.json(bloodBank.inventory);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Inventory
bloodBankRouter.put('/:id/inventory', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.id
    );

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    bloodBank.inventory = req.body.inventory;

    const updatedBloodBank =
      await bloodBank.save();

    return res.json(updatedBloodBank.inventory);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Requests This Blood Bank Can Fulfill
bloodBankRouter.get('/:id/requests', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.id
    );

    if (!bloodBank) {
      return res.status(404).json({
        error: 'Blood bank not found'
      });
    }

    const requests = await Request.find({
      city: bloodBank.city,
      status: 'pending'
    });

    const matchingRequests = requests.filter(
      request => {
        const availableUnits =
          bloodBank.inventory?.[
            request.bloodGroup
          ] || 0;

        return (
          availableUnits >= request.unitsRequired
        );
      }
    );

    return res.json(matchingRequests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Accepted Requests History
bloodBankRouter.get('/:id/accepted-requests', async (req, res) => {
  try {
    const requests = await Request.find({
      acceptedBy: req.params.id
    });

    return res.json(requests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = bloodBankRouter;