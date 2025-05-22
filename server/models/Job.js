const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true
  },
  salaryRange: { type: String },           // optional
  monthlySalaryFrom: { type: Number },     // optional
  monthlySalaryTo: { type: Number },       // optional
  description: { type: String, default: '' },      // optional
  requirements: { type: String, default: '' },     // optional
  responsibilities: { type: String, default: '' }, // optional
  deadline: { type: Date },                 // optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
