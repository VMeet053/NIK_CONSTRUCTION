const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find();
    // Convert array of objects to a single object with keys
    const contentMap = {};
    content.forEach(item => {
      contentMap[item.key] = item.data;
    });
    res.json(contentMap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific content key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const content = await Content.findOne({ key });
    if (!content) {
        return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update specific content key
router.post('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    // Expecting body to be the data object directly or wrapped in data
    const data = req.body; 
    
    // Check if body has 'data' property, if so use it, otherwise use whole body
    // Actually, for consistency with Context which sends the whole object, let's assume body is the data.
    // However, usually API expects { data: ... }
    // Let's assume the client sends the data object directly.
    
    const updatedContent = await Content.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true }
    );
    res.json(updatedContent.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
