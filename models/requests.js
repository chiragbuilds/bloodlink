const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    hospitalName: {
      type: String,
      required: true,
    },

    hospitalPhone: {
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

    city: {
      type: String,
      required: true,
      lowercase: true
    },

    unitsRequired: {
      type: Number,
      required: true,
      min: 1,
    },

    priority: {
      type: String,
      enum: ["normal", "urgent", "critical"],
      default: "normal",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "completed",
        "cancelled"
      ],
      default: "pending",
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodBank",
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);