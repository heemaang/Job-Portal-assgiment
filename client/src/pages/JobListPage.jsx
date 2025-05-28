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
  const [loading, setLoading] = useState(false);  // Add loading state

  // All filter states:
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([50000, 80000]);

  const [filterTriggered, setFilterTriggered] = useState(false);

  // Array of logos to cycle through
  const cardLogos = [cardlogo1, cardlogo2, cardlogo3];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);  // Start loading
      if (filterTriggered) {
        const filters = {};

        if (searchTerm.trim() !== "") filters.searchTerm = searchTerm;
        if (location.trim() !== "") filters.location = location;
        if (jobType.trim() !== "") filters.jobType = jobType;
        if (salaryRange) filters.salaryRange = salaryRange;

        const filteredJobs = await getAllJobs(filters);
        setJobs(filteredJobs);
      } else {
        const allJobs = await getAllJobs();
        setJobs(allJobs);
      }
      setLoading(false);  // Loading done
    };

    fetchJobs();
  }, [searchTerm, location, jobType, salaryRange, filterTriggered]);

  return (
    <div className="min-h-screen">
      {/* Filter bar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-6">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={(val) => {
            setSearchTerm(val);
            setFilterTriggered(true);
          }}
          location={location}
          setLocation={(val) => {
            setLocation(val);
            setFilterTriggered(true);
          }}
          jobType={jobType}
          setJobType={(val) => {
            setJobType(val);
            setFilterTriggered(true);
          }}
          salaryRange={salaryRange}
          setSalaryRange={(val) => {
            setSalaryRange(val);
            setFilterTriggered(true);
          }}
        />
      </div>

      {/* Job cards */}
      <div className="max-w-[1400px] mx-auto p-6 flex flex-col gap-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="col-span-full text-center">
              No results found for your search.
            </p>
          ) : (
            jobs.map((job, index) => (
              <JobCard
                key={job._id}
                job={job}
                logo={cardLogos[index % cardLogos.length]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobListPage;
