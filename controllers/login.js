const loginRouter = require('express').Router()

const Donor = require('../models/donors')
const bloodBank = require('../models/bloodbanks')
const Hospital = require('../models/hospitals')

loginRouter.post('/', async (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({
      error: 'Missing required fields'
    });
  }

  try {
    let user;

    switch (role) {
      case 'donor':
        user = await Donor.findOne({ email });
        break;

      case 'hospital':
        user = await Hospital.findOne({ email });
        break;

      case 'bloodbank':
        user = await bloodBank.findOne({ email });
        break;

      default:
        return res.status(400).json({
          error: 'Invalid role'
        });
    }

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    return res.status(200).json({
      status: 'success',
      userId: user._id,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = loginRouter