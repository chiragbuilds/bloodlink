const registerRouter = require('express').Router()

const Donor = require('../models/donors')
const bloodBank = require('../models/bloodbanks')
const Hospital = require('../models/hospitals')

registerRouter.post('/', (req, res) => {
  const { role } = req.body;
  const body = req.body

  if (!role) {
    return res.status(400).json({
      error: 'Role is required'
    });
  }

  switch (role) {
    case 'donor':
      const newDonor = new Donor({
        name: body.name,
        email: body.email,
        password: body.password,
        phone: body.phone,
        bloodGroup: body.bloodGroup,
        city: body.city,
      })

      newDonor
        .save()
        .then(()=>{
            res.status(200).json({status: 'success'})
        })
        .catch(e => res.status(400).json({error: e.message}))
        break;

    case 'hospital':
      const newHospital = new Hospital({
        name: body.name,
        email: body.email,
        password: body.password,
        phone: body.phone,
        address: body.address,
        city: body.city,
      })
      
      newHospital
        .save()
        .then(()=>{
            res.status(200).json({status: 'success'})
        })
        .catch(e => res.status(400).json({error: e.message}))
        break;

    case 'bloodbank':
        const newBloodBank = new bloodBank({
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
            address: body.address,
            city: body.city,
        })
        newBloodBank
            .save()
            .then(()=>{
                res.status(200).json({status: 'success'})
            })
            .catch(e => res.status(400).json({error: e.message}))
        break;

    default:
      return res.status(400).json({
        error: 'Invalid role'
      });
  }
});

module.exports = registerRouter