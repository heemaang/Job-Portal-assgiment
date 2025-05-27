import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import JobCreateModal from "../pages/JobCreatePage"; // Check if this is the modal component

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full flex justify-center mt-6 z-50 px-4 sm:px-0">
      <nav className="w-full max-w-[800px] h-[78px] bg-white border border-[#FCFCFC] rounded-[122px] shadow-[0_0_20px_0_#7F7F7F26] px-4 sm:px-6 flex items-center mt-4">
        <div className="w-full flex items-center justify-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Navigation Links */}
          <ul
            className="hidden md:flex gap-8 font-satoshi text-[#303030] justify-center"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0",
            }}
          >
            {[
              "Home",
              "Find Jobs",
              "Find Talents",
              "About Us",
              "Testimonials",
            ].map((item, index) => (
              <li key={index}>
                <Link to="/">{item}</Link>
              </li>
            ))}
          </ul>

          {/* Create Jobs Button */}
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-semibold text-sm"
            style={{
              width: "125px",
              height: "38px",
              borderRadius: "30px",
              padding: "8px 16px",
              background:
                "linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)",
            }}
          >
            Create Jobs
          </button>
        </div>
      </nav>

      {/* Modal Rendering */}
      {showModal && <JobCreateModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Navbar;
