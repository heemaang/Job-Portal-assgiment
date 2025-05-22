import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import JobCreateModal from "../pages/JobCreatePage"; // Check if this is the modal component

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full flex justify-center top-[21px] z-50 px-4 sm:px-0">
      <nav className="w-full max-w-[890px] h-[80px] bg-white border border-[#FCFCFC] rounded-[122px] shadow-[0_0_20px_0_#7F7F7F26] px-4 sm:px-6 flex items-center">
        <div className="w-full flex items-center justify-between mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Navigation Links */}
          <ul
            className="hidden md:flex gap-6 font-satoshi text-[#303030]"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0",
            }}
          >
            <li>
              <Link to="/" style={{ fontWeight: 500, fontSize: "16px" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" style={{ fontWeight: 500, fontSize: "16px" }}>
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/" style={{ fontWeight: 500, fontSize: "16px" }}>
                Find Talents
              </Link>
            </li>
            <li>
              <Link to="/" style={{ fontWeight: 500, fontSize: "16px" }}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" style={{ fontWeight: 500, fontSize: "16px" }}>
                Testimonials
              </Link>
            </li>
          </ul>

          {/* Create Jobs Button */}
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-semibold text-sm ml-4"
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
