import expIcon from "../assets/exp.png";
// import jobtypeIcon from "../assets/jobtype.png";
import packageIcon from "../assets/package.png";
// import default logo removed, now use logo from prop
import TypeIcon from "../assets/type.png";

function getFixedSalaryLPA(monthlySalaryTo) {
  if (!monthlySalaryTo || isNaN(monthlySalaryTo)) return "12 LPA";
  const annualSalary = monthlySalaryTo * 12;
  const lpa = Math.round(annualSalary / 100000);
  return `${lpa} LPA`;
}

function getFirstTwoPoints(desc) {
  if (!desc) return [];
  const sentences = desc
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.slice(0, 2);
}

function JobCard({ job, logo }) {
  // accept logo as prop
  const points = getFirstTwoPoints(job.description || "");

  return (
    <div className="relative bg-[#ffffff] p-4 rounded-[12px] shadow-[0px_0px_14px_0px_#D3D3D326] w-[316px] h-[360px] flex flex-col justify-between">
      {/* Time Tag */}
      <span className="absolute top-[16px] right-[16px] bg-[#B0D9FF] rounded-[10px] px-[10px] py-[7px] w-[75px] h-[33px] flex items-center justify-center">
        <span className="font-[Satoshi Variable] font-medium text-[14px] leading-[100%] text-center text-[#000000]">
          24h Ago
        </span>
      </span>

      {/* Logo & Job Title Side-by-side */}
      <div className="flex flex-col items-start mb-4">
        {/* Logo */}
        <div
          className="flex items-center justify-center mb-3"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "13.18px",
            border: "1px solid #FFFFFF",
            background: "linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)",
            boxShadow: "0px 0px 10.25px 0px #94949440",
          }}
        >
          <img
            src={logo} // <-- use logo prop here
            alt="Company Logo"
            className="w-13 h-13 object-contain"
          />
        </div>

        {/* Job Title */}
        <div className="font-[Satoshi Variable]"
          style={{
        
            fontWeight: 550,
            fontSize: "19px",
            lineHeight: "100%",
            color: "#000000",
            marginBottom: "4px",
          }}
        >
          {job.title}
        </div>
      </div>

      {/* Amenities row */}
     <div className="grid grid-cols-3 gap-x-[12px] items-center mb-3 w-full">
  {/* Experience */}
  <div className="flex items-center gap-[4px] justify-center">
    <img src={expIcon} alt="Experience Icon" className="w-4 h-4 object-contain" />
    <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A] whitespace-nowrap">
      {job.experience || "1–3 yr Exp"}
    </span>
  </div>

  {/* Job Type */}
  <div className="flex items-center gap-[4px] justify-center">
    <img src={TypeIcon} alt="Job Type Icon" className="w-4 h-4 object-contain" />
    <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A] whitespace-nowrap">
      {job.jobType || "Onsite"}
    </span>
  </div>

  {/* Salary */}
  <div className="flex items-center gap-[4px] justify-center">
    <img src={packageIcon} alt="Salary Icon" className="w-4 h-4 object-contain" />
    <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A] whitespace-nowrap">
      {getFixedSalaryLPA(job.monthlySalaryTo)}
    </span>
  </div>
</div>


      {/* Description bullets */}
      <div className="text-gray-600 text-sm text-left font-[Satoshi Variable] mt-2 min-h-[56px]">
        {points.map((point, idx) => (
          <p
            key={idx}
            className="mb-1 before:content-['•'] before:mr-2 before:text-black"
          >
            {point}.
          </p>
        ))}
      </div>

      {/* Apply Button */}
      <div className="flex justify-center mt-auto pt-4">
        <button className="w-[284px] h-[46px] mt-auto rounded-[10px] border border-[#00AAFF] px-[10px] py-[12px] bg-[#00AAFF] text-white shadow-[0_0_14px_0_#5D5D5D26] self-center">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
