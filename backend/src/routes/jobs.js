const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.get('/', jobController.listJobs);
router.get('/:id', jobController.getJob);
router.post('/run-job/:id', jobController.runJob);

module.exports = router;
