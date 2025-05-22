const express = require('express');
const { createJob, getAllJobs, getJobById } = require('../controllers/jobController');

const router = express.Router();

router.route('/')
  .post(createJob)       // Create new job
  .get(getAllJobs);      // Get jobs with optional filters from query

router.route('/:id')
  .get(getJobById);      // Get job by ID

module.exports = router;
