import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

function FilterBar({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
  salaryRange,
  setSalaryRange
}) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl flex flex-wrap gap-4 justify-between items-center">

      {/* Search Input with icon */}
      <div className="relative w-full sm:w-[250px]">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search By JobTitle, Role"
          className="border border-gray-300 rounded-lg px-10 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Location Dropdown with icon */}
      <div className="relative w-full sm:w-[180px]">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Preferred Location"
          className="border border-gray-300 rounded-lg px-10 py-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Job Type Dropdown with icon */}
      <div className="relative w-full sm:w-[180px]">
        <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <select
          className="border border-gray-300 rounded-lg px-10 py-2 w-full appearance-none"
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

      {/* Salary Range */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-[250px]">
        <label className="text-sm text-gray-700 font-medium">Salary Per Month</label>
        <input
          type="range"
          min="50000"
          max="150000"
          step="5000"
          value={salaryRange}
          onChange={(e) => setSalaryRange(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-gray-600 text-sm whitespace-nowrap">
          ₹{(salaryRange / 1000).toFixed(0)}k
        </span>
      </div>
    </div>
  );
}

export default FilterBar;
