const { Job } = require('../../models');
const axios = require('axios');

exports.createJob = async (req, res) => {
    try {
        const { taskName, payload, priority } = req.body;
        let jobPayload = payload;
        if (typeof payload === 'string') {
            try {
                jobPayload = JSON.parse(payload);
            } catch (e) {
                // Keep as string or error? Requirement says "payload (JSON textarea)", likely sent as string from frontend but needs parsing if client sends string.
                // But if client sends JSON object, use it.
            }
        }

        const job = await Job.create({
            taskName,
            payload: jobPayload,
            priority,
            status: 'pending'
        });
        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.listJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.runJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByPk(id);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        // Update to running
        await job.update({ status: 'running' });

        // Simulate processing (3 seconds)
        setTimeout(async () => {
            try {
                // Refetch to ensure we have latest data if needed, but instance is fine
                // Update to completed
                await job.update({ status: 'completed' });

                console.log(`Job ${id} completed. Sending webhook...`);

                // Prepare Webhook Payload
                const webhookPayload = {
                    jobId: job.id,
                    taskName: job.taskName,
                    priority: job.priority,
                    payload: job.payload,
                    completedAt: new Date()
                };

                // Send Webhook
                // Using a test URL or provided one. For now I'll use the local test endpoint if testing.
                // User requested: POST https://webhook.site/<your-id>
                // I will use a dummy one if no env var provided, but logging is safer.
                const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:4000/webhook-test';

                try {
                    await axios.post(webhookUrl, webhookPayload);
                    console.log('Webhook sent successfully');
                } catch (webhookError) {
                    console.error('Webhook failed:', webhookError.message);
                    // Optional: update DB logs
                }

            } catch (err) {
                console.error('Error in background job:', err);
                await job.update({ status: 'failed' });
            }
        }, 3000);

        res.json({ message: 'Job started', jobId: job.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
