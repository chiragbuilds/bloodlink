const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema(
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
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      lowercase: true
    },

    inventory: {
      "A+": { type: Number, default: 0 },
      "A-": { type: Number, default: 0 },
      "B+": { type: Number, default: 0 },
      "B-": { type: Number, default: 0 },
      "AB+": { type: Number, default: 0 },
      "AB-": { type: Number, default: 0 },
      "O+": { type: Number, default: 0 },
      "O-": { type: Number, default: 0 },
    },

    role: {
      type: String,
      default: "bloodbank",
      lowercase: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BloodBank", bloodBankSchema);