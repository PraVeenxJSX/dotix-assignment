import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const JobDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                setJob(response.data);
            } catch (err: any) {
                setError(err.message || 'Error fetching job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!job) return <div className="p-8 text-center text-gray-500">Job not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Dashboard
            </Link>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="px-6 py-6 sm:px-8 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-2xl leading-6 font-bold text-gray-900">
                        Job Details <span className="text-indigo-600">#{job.id}</span>
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-gray-500">
                        {job.taskName}
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                  ${job.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        job.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                            job.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {job.status}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-white px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                            <dt className="text-sm font-medium text-gray-500">Priority</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job.priority}</dd>
                        </div>
                        <div className="bg-gray-50 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Date(job.createdAt).toLocaleString()}
                            </dd>
                        </div>
                        <div className="bg-white px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                            <dt className="text-sm font-medium text-gray-500">Payload</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-xs font-mono shadow-inner">
                                    {JSON.stringify(job.payload, null, 2)}
                                </pre>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
