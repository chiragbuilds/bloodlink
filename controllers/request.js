const requestsRouter = require('express').Router();

const Request = require('../models/request');
const Donor = require('../models/donor');
const BloodBank = require('../models/bloodbank');


// Create Request (Hospital)
requestsRouter.post('/', async (req, res) => {
  try {
    const request = new Request(req.body);

    const savedRequest = await request.save();

    return res.status(201).json(savedRequest);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Get All Requests
requestsRouter.get('/', async (req, res) => {
  try {
    const requests = await Request.find({});

    return res.json(requests);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});


// Donor Dashboard Requests
requestsRouter.get('/donor/:donorId', async (req, res) => {
  try {
    const donor = await Donor.findById(
      req.params.donorId
    );

    if (!donor) {
      return res.status(404).json({
        error: 'Donor not found'
      });
    }


    // if else to check if stock is present in bloodbank from same city
    const requests = await Request.find({
      bloodGroup: donor.bloodGroup,
      city: donor.city,
      status: 'pending'
    });

    return res.json(requests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Blood Bank Dashboard Requests
requestsRouter.get('/bloodbank/:bloodBankId', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(
      req.params.bloodBankId
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

    return res.json(requests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Get Single Request
requestsRouter.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        error: 'Request not found'
      });
    }

    return res.json(request);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Blood Bank Accept Request
requestsRouter.put('/:id/accept', async (req, res) => {
  try {
    const request = await Request.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        error: 'Request not found'
      });
    }

    request.status = 'accepted';

    request.acceptedBy =
      req.body.bloodBankId;

    const updatedRequest =
      await request.save();

    return res.json(updatedRequest);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Mark Completed
requestsRouter.put('/:id/complete', async (req, res) => {
  try {
    const request = await Request.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        error: 'Request not found'
      });
    }

    request.status = 'completed';

    const updatedRequest =
      await request.save();

    return res.json(updatedRequest);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Delete Request
requestsRouter.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(
      req.params.id
    );

    return res.status(204).end();

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = requestsRouter;