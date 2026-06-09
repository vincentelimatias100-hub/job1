const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
fullName: String,
email: String,
phonenumber: String,
age: Number,
gender: String,
district: String,
jobTitle: String,
photoUrl: String
},
{
timestamps: true
}
);

const Application = mongoose.model(
"Application",
applicationSchema
);

module.exports = Application;
