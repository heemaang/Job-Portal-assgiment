const Job = require('../models/Job');

// GET all jobs with optional filters
// const getAllJobs = async (req, res) => {
//   try {
//     const { title, location, jobType, minSalary, maxSalary } = req.query;

//     const query = {};

//     if (title) {
//       query.title = { $regex: title, $options: 'i' };
//     }

//     if (location) {
//       query.location = { $regex: location, $options: 'i' };
//     }

//     if (jobType) {
//       query.jobType = jobType;
//     }

//     // Filtering based on monthly salary range
//     if (minSalary && maxSalary) {
//       query.monthlySalaryFrom = { $lte: maxSalary };
//       query.monthlySalaryTo = { $gte: minSalary };
//     } else if (minSalary) {
//       query.monthlySalaryTo = { $gte: minSalary };
//     } else if (maxSalary) {
//       query.monthlySalaryFrom = { $lte: maxSalary };
//     }

//     const jobs = await Job.find(query).sort({ createdAt: -1 });
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getAllJobs = async (req, res) => {
  try {
    const { search, location, jobType, maxSalary } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (maxSalary !== undefined && maxSalary !== '') {
      const maxSalaryNum = Number(maxSalary);
      if (!isNaN(maxSalaryNum)) {
        query.monthlySalaryFrom = { $lte: maxSalaryNum };
      }
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
      description,
      requirements,
      responsibilities,
      deadline
    } = req.body;

    // Generate salaryRange string in LPA
    const fromLPA = (monthlySalaryFrom * 12) / 100000;
    const toLPA = (monthlySalaryTo * 12) / 100000;
    const salaryRange = `${fromLPA} - ${toLPA} LPA`;

    const job = await Job.create({
      title,
      companyName,
      location,
      jobType,
      monthlySalaryFrom,
      monthlySalaryTo,
      salaryRange,
      description,
      requirements,
      responsibilities,
      deadline
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
