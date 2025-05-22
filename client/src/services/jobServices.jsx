import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

// filters is expected to be an object: { searchTerm, location, jobType, salaryRange }
export const getAllJobs = async (filters = {}) => {
  try {
    const {
      searchTerm = '',
      location = '',
      jobType = '',
      salaryRange = [50000, 150000], // default range if not provided
    } = filters;

    const [minSalary, maxSalary] = salaryRange;

    const { data } = await axios.get(API_URL, {
      params: {
        search: searchTerm,
        location,
        jobType,
        minSalary,
        maxSalary,
      },
    });

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








