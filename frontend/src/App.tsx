import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob.tsx';
import JobDetail from './components/JobDetail';
import { FaPlus, FaTasks } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center text-indigo-600 font-bold text-xl hover:text-indigo-700 transition-colors">
                  <FaTasks className="mr-2" /> Dotix Scheduler
                </Link>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8 h-full">
                  <Link to="/" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all h-full">
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Link to="/create" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <FaPlus className="mr-2" /> New Job
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateJob />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
