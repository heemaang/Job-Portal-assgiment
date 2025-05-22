import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobServices";

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
      salaryRange: "",
      description: "",
      requirements: "",
      responsibilities: "",
      deadline: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createJob(data);
      reset(); // Clear the form
      onClose?.(); // Close the modal
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  // Common style for all inputs
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
          width: "848px", // width thoda kam kar diya
          height: "626px", // height thoda badha diya
          boxShadow: "0px 0px 24px 0px #A9A9A940",
          overflowY: "auto", // agar content zyada ho toh scroll aaye
        }}
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Create Job Opening
        </h2>

     <form
  onSubmit={handleSubmit(onSubmit)}
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
>
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
      <p className="text-red-500 text-sm">{errors.companyName.message}</p>
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
          {...register("salaryRange", {
            required: "Min Salary is required",
          })}
          type="text"
          placeholder="₹ 0"
      style={salaryInputStyle}
          className={errors.salaryRange ? "border-red-500" : ""}
        />
        <input
          {...register("maxSalary")}
          type="text"
          placeholder="₹ 12,00,000"
          style={salaryInputStyle}
        />
      </div>
      {errors.salaryRange && (
        <p className="text-red-500 text-sm mt-1">
          {errors.salaryRange.message}
        </p>
      )}
    </div>

    <div className="flex-1">
      <label className="block mb-1 font-medium">Application Deadline</label>
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
  <div className="md:col-span-2 flex justify-between items-center gap-4 mt-2">
    <button
      type="button"
      onClick={() => navigate("/")}
      className="border rounded px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
    >
      Save Draft
    </button>

    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
    >
      {isSubmitting ? "Submitting..." : "Publish ➤"}
    </button>
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
