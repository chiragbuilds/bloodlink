const statsRouter = require('express').Router()

const Donor = require('../models/donors')
const BloodBank = require('../models/bloodbanks')
const Hospital = require('../models/hospitals')

statsRouter.get('/', async (req, res) => {
    try{
        let totalDonors = await Donor.countDocuments()
        let totalHospitals = await Hospital.countDocuments()
        let totalBloodBank = await BloodBank.countDocuments()

        res.json({
            totalDonors,
            totalHospitals,
            totalBloodBank
        })
    } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

module.exports = statsRouter