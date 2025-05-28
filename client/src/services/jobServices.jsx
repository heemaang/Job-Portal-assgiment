import axios from 'axios';

// const API_URL = 'https://job-portal-assgiment-u2nr.onrender.com/api/jobs';

const API_URL = 'http://localhost:5000/api/jobs';

// filters is expected to be an object: { searchTerm, location, jobType, salaryRange }
export const getAllJobs = async (filters = {}) => {
  try {
    const {
      searchTerm = '',
      location = '',
      jobType = '',  // jobType string
      salaryRange = null, // default null to know if it's set or not
    } = filters;

    const params = {};

    if (searchTerm) params.search = searchTerm;
    if (location) params.location = location;

    // Only add jobType param if it's not empty string
    if (jobType && jobType.trim() !== '') {
      params.jobType = jobType;
    }

    if (salaryRange && Array.isArray(salaryRange)) {
      const [minSalary, maxSalary] = salaryRange;
      if (minSalary) params.minSalary = minSalary;
      if (maxSalary) params.maxSalary = maxSalary;
    }

    const { data } = await axios.get(API_URL, { params });

    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};


export const createJob = async (jobData) => {
  try {
    const { data } = await axios.post(API_URL, jobData);
    return data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};


// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/jobs';

// // filters is expected to be an object: { searchTerm, location, jobType, salaryRange }
// export const getAllJobs = async (filters = {}) => {
//   try {
//     const { searchTerm = '', location = '', jobType = '', salaryRange = '' } = filters;

//     const { data } = await axios.get(API_URL, {
//       params: {
//         search: searchTerm,
//         location,
//         jobType,
//         maxSalary: salaryRange // assuming backend expects maxSalary for filtering by salary range
//       }
//     });

//     return data;
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     return [];
//   }
// };

// export const createJob = async (jobData) => {
//   try {
//     const { data } = await axios.post(API_URL, jobData);
//     return data;
//   } catch (error) {
//     console.error('Error creating job:', error);
//     throw error;
//   }
// };








