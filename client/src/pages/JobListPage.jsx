import { useEffect, useState } from 'react';
import { getAllJobs } from '../services/jobServices';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

// Import multiple logos
import cardlogo1 from "../assets/cardlogo.png";
import cardlogo2 from "../assets/cardlogo2.png";
import cardlogo3 from "../assets/cardlogo3.png";

function JobListPage() {
  const [jobs, setJobs] = useState([]);

  // All filter states:
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([50000, 150000]);

  // Array of logos to cycle through
  const cardLogos = [cardlogo1, cardlogo2, cardlogo3];

  useEffect(() => {
    const fetchJobs = async () => {
      const filteredJobs = await getAllJobs({ searchTerm, location, jobType, salaryRange });
      setJobs(filteredJobs);
    };

    fetchJobs();
  }, [searchTerm, location, jobType, salaryRange]);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
      />

      {/* Grid layout with 4 cards per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 justify-items-center">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard
              key={job._id}
              job={job}
              logo={cardLogos[index % cardLogos.length]} // Pass alternating logo here
            />
          ))
        ) : (
          <p className="col-span-full text-center">No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobListPage;
