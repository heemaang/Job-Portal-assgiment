import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import JobCreatePage from './pages/JobCreatePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/create" element={<JobCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
