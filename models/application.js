const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    district: { type: String, required: true },
    jobTitle: { type: String, required: true },
    photoUrl: { type: String, required: true }
},
{ timestamps: true }
);

const Application =
mongoose.models.Application ||
mongoose.model("Application", applicationSchema);

module.exports = Application;