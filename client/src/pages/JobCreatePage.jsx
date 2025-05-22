import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobServices";
import draftImg from "../assets/draft.png";
import publishImg from "../assets/publish.png";

function JobCreatePage({ onClose }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      jobType: "Full-time",
      minSalary: "", // Changed here
      maxSalary: "", // Changed here
      description: "",
      requirements: "",
      responsibilities: "",
      deadline: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const minSalary = data.minSalary ? Number(data.minSalary) : undefined;
      const maxSalary = data.maxSalary ? Number(data.maxSalary) : undefined;

      // Optional validation: minSalary <= maxSalary
      if (
        minSalary !== undefined &&
        maxSalary !== undefined &&
        minSalary > maxSalary
      ) {
        alert("Minimum salary cannot be greater than maximum salary");
        return;
      }

      const payload = {
        ...data,
        monthlySalaryFrom: minSalary,
        monthlySalaryTo: maxSalary,
      };

      // Remove old fields
      delete payload.minSalary;
      delete payload.maxSalary;
      delete payload.salaryRange; // Just in case

      await createJob(payload);
      reset();
      onClose?.();
      navigate("/");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const inputStyle = {
    width: "370px",
    height: "55px",
    borderRadius: "10px",
    borderWidth: "1px",
    border: "1px solid #222222",
    padding: "0 12px",
    boxSizing: "border-box",
  };
  const salaryInputStyle = {
    width: "180px",
    height: "48px",
    borderRadius: "10px",
    border: "1px solid #222222",
    padding: "0 12px",
    boxSizing: "border-box",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
    >
      <div
        className="bg-white rounded-xl p-8 relative"
        style={{
          width: "848px",
          height: "650px",
          boxShadow: "0px 0px 24px 0px #A9A9A940",
          overflowY: "auto",
        }}
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Create Job Opening
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Other inputs unchanged */}

          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Job Title"
              style={inputStyle}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              {...register("companyName", {
                required: "Company Name is required",
              })}
              type="text"
              placeholder="Amazon, Microsoft, Swiggy"
              style={inputStyle}
              className={errors.companyName ? "border-red-500" : ""}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Choose Preferred Location"
              style={inputStyle}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              {...register("jobType", { required: true })}
              style={inputStyle}
              className="rounded"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Salary Range + Deadline Row */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Salary Range</label>
              <div className="flex gap-4">
                <input
                  {...register("minSalary", {
                    required: "Min Salary is required",
                  })}
                  type="number"
                  placeholder="₹ 0"
                  style={salaryInputStyle}
                  className={errors.minSalary ? "border-red-500" : ""}
                  min={0}
                />
                <input
                  {...register("maxSalary", {
                    required: "Max Salary is required",
                  })}
                  type="number"
                  placeholder="₹ 12,00,000"
                  style={salaryInputStyle}
                  className={errors.maxSalary ? "border-red-500" : ""}
                  min={0}
                />
              </div>
              {errors.minSalary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.minSalary.message}
                </p>
              )}
              {errors.maxSalary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maxSalary.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Application Deadline
              </label>
              <input
                {...register("deadline")}
                type="date"
                style={inputStyle}
                className="rounded"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Job Description</label>
            <textarea
              {...register("description")}
              placeholder="Please share a description to let the candidate know more about the job role"
              className="w-full border p-3 rounded min-h-[120px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-between items-center mt-2">
            <div className="w-[200px] h-[55px] rounded-[10px] px-4 py-4 border-[1.5px] border-[#222222] bg-white flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-transparent border-none text-[#222222] font-satoshi font-semibold text-[18px] leading-[100%] tracking-[0%] flex items-center gap-2"
              >
                Save Draft
                <img src={draftImg} alt="Draft" className="w-4 h-4" />
              </button>
            </div>

            {/* Right side - Publish */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[200px] h-[55px] rounded-[10px] pt-4 pr-[60px] pb-4 pl-[60px] bg-[#00AAFF] text-white font-satoshi font-semibold text-[18px] leading-[100%] tracking-[0%] disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? "Submitting..." : "Publish"}
                <img src={publishImg} alt="Publish" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Close icon */}
        <button
          onClick={() => onClose?.()}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default JobCreatePage;
