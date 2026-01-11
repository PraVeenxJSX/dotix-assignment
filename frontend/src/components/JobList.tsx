import React from 'react';
import type { Job } from '../types';
import { Link } from 'react-router-dom';
import { FaPlay, FaEye } from 'react-icons/fa';

interface JobListProps {
    jobs: Job[];
    onRunJob: (id: number) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onRunJob, filterStatus, setFilterStatus }) => {
    const filteredJobs = filterStatus === 'all'
        ? jobs
        : jobs.filter(job => job.status === filterStatus);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'running': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 font-semibold';
            case 'Medium': return 'text-orange-500 font-medium';
            case 'Low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Job List</h2>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-1 text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No jobs found.</td>
                            </tr>
                        ) : filteredJobs.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{job.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.taskName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={getPriorityColor(job.priority)}>{job.priority}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(job.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => onRunJob(job.id)}
                                        disabled={job.status === 'running'}
                                        className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                                        title="Run Job"
                                    >
                                        <FaPlay />
                                    </button>
                                    <Link to={`/jobs/${job.id}`} className="text-gray-600 hover:text-gray-900 transition-colors" title="View Details">
                                        <FaEye />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobList;
