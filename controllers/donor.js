const donorRouter = require('express').Router();
const Donor = require('../models/donors');
const Request = require('../models/requests');
const BloodBank = require('../models/bloodbanks');

// Get Donor Profile
donorRouter.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).select('-password');

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    return res.json(donor);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Donor Profile
donorRouter.put('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    donor.name = req.body.name || donor.name;
    donor.phone = req.body.phone || donor.phone;
    donor.city = req.body.city || donor.city;
    donor.bloodGroup = req.body.bloodGroup || donor.bloodGroup;

    const updatedDonor = await donor.save();

    return res.json(updatedDonor);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Availability
donorRouter.put('/:id/availability', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    donor.available = req.body.available;

    const updatedDonor = await donor.save();

    return res.json(updatedDonor);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Last Donation Date
donorRouter.put('/:id/donate', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    donor.lastDonationDate = new Date();

    const updatedDonor = await donor.save();

    return res.json(updatedDonor);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


donorRouter.get('/:id/requests', async (req, res) => {
    try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }

    const requests = await Request.find({
      city: donor.city,
      bloodGroup: donor.bloodGroup,
      status: 'pending'
    });

    const emergencyRequests = [];

    for (const request of requests) {

      const bloodBanks = await BloodBank.find({
        city: request.city
      });

      let stockAvailable = false;

      for (const bank of bloodBanks) {

        const units =
          bank.inventory?.[request.bloodGroup] || 0;

        if (units > 0) {
          stockAvailable = true;
          break;
        }
      }

      if (!stockAvailable) {
        emergencyRequests.push(request);
      }
    }

    return res.json(emergencyRequests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
})

// Delete Donor
donorRouter.delete('/:id', async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);

    return res.status(204).end();

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = donorRouter;