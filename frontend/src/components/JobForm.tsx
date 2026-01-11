import React, { useState } from 'react';
import api from '../api';

interface JobFormProps {
    onJobCreated: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onJobCreated }) => {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [payload, setPayload] = useState('{\n  "key": "value"\n}');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Validate JSON
            try {
                JSON.parse(payload);
            } catch (e) {
                throw new Error('Invalid JSON payload');
            }

            await api.post('/jobs', {
                taskName,
                priority,
                payload: JSON.parse(payload)
            });
            setTaskName('');
            // Reset to default template
            setPayload('{\n  "key": "value"\n}');
            setPriority('Medium');
            onJobCreated();
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Error creating job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Job</h2>
            {error && <div className="text-red-500 bg-red-100 p-3 rounded-md text-sm">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    placeholder="e.g. Email Processing"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 bg-white"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payload (JSON)</label>
                <textarea
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    rows={5}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 font-mono text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Creating...' : 'Create Job'}
            </button>
        </form>
    );
};

export default JobForm;
