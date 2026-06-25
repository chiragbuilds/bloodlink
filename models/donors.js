const mongoose = require('mongoose')

const donorSchema = mongoose.Schema(
    {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minLength: 6
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    available: {
      type: Boolean,
      default: true,
    },

    lastDonationDate: {
      type: Date,
      default: null,
    },

    city: {
      type: String,
      require: true,
      lowercase: true
    },

    role: {
      type: String,
      default: "donor",
      lowercase: true
    },
    
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Donor', donorSchema)