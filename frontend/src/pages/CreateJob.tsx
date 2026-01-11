import React from 'react';
import JobForm from '../components/JobForm';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CreateJob: React.FC = () => {
    const navigate = useNavigate();

    const handleJobCreated = () => {
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <FaArrowLeft className="mr-2" /> Cancel
            </Link>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
                <p className="text-gray-500 mt-2 text-lg">Define task parameters and priority queue settings.</p>
            </div>
            <JobForm onJobCreated={handleJobCreated} />
        </div>
    );
};

export default CreateJob;
