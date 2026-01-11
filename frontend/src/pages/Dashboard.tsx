import React, { useEffect, useState } from 'react';
import api from '../api';
import JobList from '../components/JobList';
import type { Job } from '../types';
import { FaSync } from 'react-icons/fa';

const Dashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // Poll every 5 seconds to update statuses
        const interval = setInterval(fetchJobs, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleRunJob = async (id: number) => {
        try {
            // Optimistic update
            setJobs(jobs.map(j => j.id === id ? { ...j, status: 'running' } : j));

            await api.post(`/jobs/run-job/${id}`);
            fetchJobs();
        } catch (error) {
            console.error('Error running job:', error);
            fetchJobs(); // Revert on error
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Job Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and track your background tasks</p>
                </div>
                <button
                    onClick={fetchJobs}
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-all transform active:scale-95 active:bg-gray-200"
                    title="Refresh"
                >
                    <FaSync className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <JobList
                jobs={jobs}
                onRunJob={handleRunJob}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />
        </div>
    );
};

export default Dashboard;
