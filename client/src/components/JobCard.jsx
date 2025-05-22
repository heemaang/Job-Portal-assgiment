
import expIcon from "../assets/exp.png";
// import jobtypeIcon from "../assets/jobtype.png";
import packageIcon from "../assets/package.png";
import cardlogo from "../assets/cardlogo.png"; // adjust extension if needed

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

function JobCard({ job }) {
  const points = getFirstTwoPoints(job.description || "");

  return (
    <div className="relative bg-white p-4 rounded-[12px] shadow-[0px_0px_14px_0px_#D3D3D326] border border-gray-200 hover:shadow-xl transition w-[316px] h-[360px] flex flex-col justify-between">
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
    className="flex items-center justify-center mb-3" // 👈 Adds spacing below the logo
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
      src={cardlogo}
      alt="Company Logo"
      className="w-15 h-15 object-contain"
    />
  </div>

  {/* Job Title */}
  <div
    style={{
      fontFamily: "Satoshi Variable",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "100%",
      color: "#000000",
      marginBottom: "4px", // 👈 Optional spacing before company name
    }}
  >
    {job.title}
  </div>

  {/* Company Name */}
  {/* <div
    style={{
      fontFamily: "Satoshi Variable",
      fontWeight: 400,
      fontSize: "16px",
      color: "#5A5A5A",
    }}
  >
    {job.companyName || "Company Name"}
  </div> */}
</div>


      {/* Amenities row */}
      <div className="flex items-center gap-[24px] mb-3 w-full h-[22px]">
        <div className="flex items-center gap-[4px] w-[94.9px] h-[22px] whitespace-nowrap">
          <img
            src={expIcon}
            alt="Experience Icon"
            className="w-4 h-4 object-contain"
          />
          <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A]">
            {job.experience || "1–3 yr Exp"}
          </span>
        </div>

        <div className="flex items-center gap-[4px] w-[94.9px] h-[22px] whitespace-nowrap">
          <img
            // src={jobtypeIcon}
            alt="Job Type Icon"
            className="w-4 h-4 object-contain"
          />
          <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A]">
            {job.jobType || "Onsite"}
          </span>
        </div>

        <div className="flex items-center gap-[4px] w-[94.9px] h-[22px] whitespace-nowrap">
          <img
            src={packageIcon}
            alt="Salary Icon"
            className="w-4 h-4 object-contain"
          />
          <span className="font-[Satoshi Variable] font-medium text-[16px] leading-[100%] text-[#5A5A5A]">
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
        <button className="w-[284px] h-[46px] mt-auto rounded-[10px] border border-[#00AAFF] px-[10px] py-[12px] bg-[#00AAFF] text-white font-semibold shadow-[0_0_14px_0_#5D5D5D26] self-center">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
