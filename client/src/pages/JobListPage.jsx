import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobServices";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";

// Import multiple logos
import cardlogo1 from "../assets/cardlogo.png";
import cardlogo2 from "../assets/cardlogo2.png";
import cardlogo3 from "../assets/cardlogo3.png";

function JobListPage() {
  const [jobs, setJobs] = useState([]);

  // All filter states:
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([50000, 150000]);

  // Array of logos to cycle through
  const cardLogos = [cardlogo1, cardlogo2, cardlogo3];

  useEffect(() => {
    const fetchJobs = async () => {
      const filteredJobs = await getAllJobs({
        searchTerm,
        location,
        jobType,
        salaryRange,
      });
      setJobs(filteredJobs);
    };

    fetchJobs();
  }, [searchTerm, location, jobType, salaryRange]);

  return (
   <div className="min-h-screen">
  {/* Filter bar - Full screen width */}
  <div className="w-full px-4 sm:px-6 lg:px-12 py-6 ">
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
  </div>

  {/* Job cards - Centered in max-width container */}
  <div className="max-w-[1400px] mx-auto p-6 flex flex-col gap-8">
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard
            key={job._id}
            job={job}
            logo={cardLogos[index % cardLogos.length]}
          />
        ))
      ) : (
        <p className="col-span-full text-center">Loading...</p>
      )}
    </div>
  </div>
</div>

  );
}

export default JobListPage;

