import React from "react";
import { Range, getTrackBackground } from "react-range";
import searchIcon from "../assets/search.png";
import locationIcon from "../assets/location.png";
import jobIcon from "../assets/job.png";

const STEP = 5000;
const MIN = 50000;
const MAX = 150000;

function FilterBar({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
  salaryRange,
  setSalaryRange,
}) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl flex flex-wrap gap-4 justify-between items-center">
      {/* Search Input */}
      <div className="relative w-full sm:w-[280px]">
        <img
          src={searchIcon}
          alt="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search By JobTitle, Role"
          className="border border-gray-300 rounded-lg px-10 py-2.5 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="hidden sm:block h-[48px] border-l border-[2px] border-[#EAEAEA]"></div>

      {/* Location Input */}
      <div className="relative w-full sm:w-[280px]">
        <img
          src={locationIcon}
          alt="location"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Preferred Location"
          className="border border-gray-300 rounded-lg px-10 py-2.5 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="hidden sm:block h-[48px] border-l border-[2px] border-[#EAEAEA]"></div>

      {/* Job Type Selector */}
      <div className="relative w-full sm:w-[280px]">
  {/* Job icon on the left */}
  <img
    src={jobIcon}
    alt="job"
    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
  />

  {/* Down arrow icon on the right */}
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>

  {/* Dropdown */}
  <select
    className="border border-gray-300 rounded-lg px-10 py-2.5 w-full appearance-none"
    value={jobType}
    onChange={(e) => setJobType(e.target.value)}
  >
    <option value="">Job Type</option>
    <option value="Full-time">Full-time</option>
    <option value="Part-time">Part-time</option>
    <option value="Internship">Internship</option>
    <option value="Contract">Contract</option>
    <option value="Remote">Remote</option>
  </select>
</div>

      <div className="hidden sm:block h-[48px] border-l border-[2px] border-[#EAEAEA]"></div>

      {/* Salary Range Slider */}
      <div className="flex flex-col items-start gap-1 w-full sm:w-[280px] relative">
        <label
          className="text-[#222222] text-[15px] leading-[100%] font-semibold"
          style={{ fontFamily: "Satoshi Variable, sans-serif" }}
        >
          Salary Per Month
        </label>

        <span
          className="absolute right-0 top-0 text-[#222222] text-[15px] leading-[100%] font-semibold"
          style={{
            width: 120,
            height: 22,
            fontFamily: "Satoshi Variable, sans-serif",
          }}
        >
          ₹{(salaryRange[0] / 1000).toFixed(0)}k - ₹
          {(salaryRange[1] / 1000).toFixed(0)}k
        </span>

        {/* Wrap Range with a div to add margin-top */}
        <div className="mt-2 w-full">
          <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={salaryRange}
            onChange={(values) => setSalaryRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "2px",
                  width: "100%",
                  background: getTrackBackground({
                    values: salaryRange,
                    colors: ["#ddd", "#222222", "#ddd"],
                    min: MIN,
                    max: MAX,
                  }),
                  borderRadius: "4px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "16px",
                  width: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "6px solid #000000",
                  boxShadow: "0px 0px 2px #aaa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
