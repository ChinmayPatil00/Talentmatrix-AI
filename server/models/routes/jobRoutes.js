const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


router.post('/', async (req, res) => {
  try {
    const { title, description, requiredSkills, experienceRequired } = req.body;
    const newJob = await Job.create({ title, description, requiredSkills, experienceRequired });
    res.status(201).json({ success: true, data: newJob });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ... your routing endpoints up here ...

module.exports = router; 