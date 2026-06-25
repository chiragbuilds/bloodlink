const statsRouter = require('express').Router()

const Donor = require('../models/donors')
const BloodBank = require('../models/bloodbanks')
const Hospital = require('../models/hospitals')
const Request = require('../models/requests')

statsRouter.get('/', async (req, res) => {
    try{
        let totalDonors = await Donor.countDocuments()
        let totalHospitals = await Hospital.countDocuments()
        let totalBloodBank = await BloodBank.countDocuments()
        let totalRequests = await Request.countDocuments({status: "completed"})
        res.json({
            totalDonors,
            totalHospitals,
            totalBloodBank,
            totalRequests 
        })
    } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

module.exports = statsRouter