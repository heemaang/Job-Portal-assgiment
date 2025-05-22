import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import JobCreateModal from '../pages/JobCreatePage'; // Check if this is the modal component

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full flex justify-center top-[21px] z-50">
      <nav className="w-[890px] h-[80px] bg-white border border-[#FCFCFC] rounded-[122px] shadow-[0_0_20px_0_#7F7F7F26] px-6 flex items-center">
        <div className="w-[838px] h-[48px] flex items-center justify-between mx-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex gap-10 font-satoshi font-semibold text-[16px] leading-[100%] tracking-[0%] text-[#303030]">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Find Jobs</Link></li>
            <li><Link to="/">Find Talents</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Testimonials</Link></li>
          </ul>

          {/* Create Jobs Button */}
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-semibold text-sm"
            style={{
              width: '123px',
              height: '38px',
              borderRadius: '30px',
              padding: '8px 24px',
              background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
            }}
          >
            Create Jobs
          </button>
        </div>
      </nav>

      {/* Modal Rendering */}
      {showModal && (
        <JobCreateModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Navbar;
