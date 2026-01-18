const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
const auth = require('../middleware/auth');

// Get all stores
router.get('/', auth, async (req, res) => {
    try {
        const stores = await prisma.store.findMany();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create store
router.post('/', auth, async (req, res) => {
    try {
        const { name, location, capacity } = req.body;
        const store = await prisma.store.create({
            data: { name, location, capacity }
        });
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
