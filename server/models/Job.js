const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  salaryRange: { type: String },           // optional, store raw string (for display)
  monthlySalaryFrom: { type: Number },     // optional, store min salary as number
  monthlySalaryTo: { type: Number },       // optional, store max salary as number
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  responsibilities: { type: String, default: '' },
  deadline: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
