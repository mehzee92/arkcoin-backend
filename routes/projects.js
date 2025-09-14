const express = require('express');
const router = express.Router();
const projectsModel = require('../models/projectsModel');

// Get all projects with pagination and optional search
router.get('/', async (req, res) => {
  try {
    const data = await projectsModel.getProjects(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching projects', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get recent projects
router.get('/recent', async (req, res) => {
  try {
    const data = await projectsModel.getLatestProjects(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching recent projects', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new project entry
router.post('/new', async (req, res) => {
  console.log({ ...req.body });
  try {
    const result = await projectsModel.createProject(req.body);
    res.json({...result, success:true});
  } 
  catch (err) 
  {
    console.error('Error creating project', err);
    res.status(500).json({success:false, error: 'Internal Server Error' });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await projectsModel.getProjectById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching project', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
