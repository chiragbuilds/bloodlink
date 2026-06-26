const requestsRouter = require('express').Router();

const Request = require('../models/requests');
const Donor = require('../models/donors');
const BloodBank = require('../models/bloodbanks');




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

    request.acceptedBy = req.body.bloodBankId;

    await BloodBank.findByIdAndUpdate(
      req.body.bloodBankId,
      {
        $inc: {
          [`inventory.${request.bloodGroup}`]: -request.unitsRequired
        }
      },
      { new: true }
    );
      
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