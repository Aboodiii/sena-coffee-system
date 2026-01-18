const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
const auth = require('../middleware/auth');

// Get all suppliers
router.get('/', auth, async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create supplier
router.post('/', auth, async (req, res) => {
    try {
        const { name, contact, email } = req.body;
        const supplier = await prisma.supplier.create({
            data: { name, contact, email }
        });
        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
