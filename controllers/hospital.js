const hospitalRouter = require('express').Router();

const Hospital = require('../models/hospital');
const Request = require('../models/request');


// Get Hospital Profile
hospitalRouter.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital
      .findById(req.params.id)
      .select('-password');

    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      });
    }

    return res.json(hospital);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Update Hospital Profile
hospitalRouter.put('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(
      req.params.id
    );

    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      });
    }

    hospital.name = req.body.name || hospital.name;
    hospital.phone = req.body.phone || hospital.phone;
    hospital.address = req.body.address || hospital.address;
    hospital.city = req.body.city || hospital.city;

    const updatedHospital = await hospital.save();

    return res.json(updatedHospital);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Get All Requests Created By Hospital
hospitalRouter.get('/:id/requests', async (req, res) => {
  try {
    const requests = await Request.find({
      hospitalId: req.params.id
    });

    return res.json(requests);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// Create Blood Request
hospitalRouter.post('/:id/requests', async (req, res) => {
  try {
    const hospital = await Hospital.findById(
      req.params.id
    );

    if (!hospital) {
      return res.status(404).json({
        error: 'Hospital not found'
      });
    }

    const request = new Request({
      hospitalId: hospital._id,
      bloodGroup: req.body.bloodGroup,
      unitsRequired: req.body.unitsRequired,
      city: hospital.city,
      priority: req.body.priority || 'normal',
      status: 'pending'
    });

    const savedRequest = await request.save();

    return res.status(201).json(savedRequest);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});



// Delete Request
hospitalRouter.delete('/:hospitalId/requests/:requestId', async (req, res) => {
  try {
    const request = await Request.findById(
      req.params.requestId
    );

    if (!request) {
      return res.status(404).json({
        error: 'Request not found'
      });
    }

    await Request.findByIdAndDelete(
      req.params.requestId
    );

    return res.status(204).end();

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = hospitalRouter;