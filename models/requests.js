const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
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

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);