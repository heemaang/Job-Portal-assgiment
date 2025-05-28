const Job = require('../models/Job');
const getAllJobs = async (req, res) => {
  try {
    const { search, location, jobType } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType && jobType.trim() !== '') {
      query.jobType = jobType;
    }

    const minSalaryNum = Number(req.query.minSalary);
    const maxSalaryNum = Number(req.query.maxSalary);

    if (!isNaN(minSalaryNum) && !isNaN(maxSalaryNum)) {
      query.monthlySalaryFrom = { $gte: minSalaryNum, $lte: maxSalaryNum };
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CREATE a new job
const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      jobType,
      monthlySalaryFrom,
      monthlySalaryTo,
      description = '',
      requirements = '',
      responsibilities = '',
      deadline,
    } = req.body;

    // Basic validation for required fields
    if (!title || !companyName || !location || !jobType) {
      return res.status(400).json({ message: 'Title, companyName, location and jobType are required.' });
    }

    // Parse salary fields safely
    const fromSalaryNum = Number(monthlySalaryFrom);
    const toSalaryNum = Number(monthlySalaryTo);

    // Only generate salaryRange if both are valid numbers and > 0
    let salaryRange = '';
    if (!isNaN(fromSalaryNum) && !isNaN(toSalaryNum) && fromSalaryNum > 0 && toSalaryNum > 0) {
      const fromLPA = (fromSalaryNum * 12) / 100000;
      const toLPA = (toSalaryNum * 12) / 100000;
      salaryRange = `${fromLPA} - ${toLPA} LPA`;
    }

    // Create new job object
    const job = new Job({
      title,
      companyName,
      location,
      jobType,
      monthlySalaryFrom: !isNaN(fromSalaryNum) ? fromSalaryNum : undefined,
      monthlySalaryTo: !isNaN(toSalaryNum) ? toSalaryNum : undefined,
      salaryRange,
      description,
      requirements,
      responsibilities,
      deadline: deadline ? new Date(deadline) : undefined,
    });

    await job.save();

    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// GET single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
};
