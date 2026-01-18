const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
const auth = require('../middleware/auth');

// Get all purchases
router.get('/', auth, async (req, res) => {
    try {
        const purchases = await prisma.purchase.findMany({
            include: {
                supplier: true,
                store: true
            }
        });
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create purchase
router.post('/', auth, async (req, res) => {
    try {
        const { supplierId, storeId, coffeeType, quantity, totalCost } = req.body;
        const purchase = await prisma.purchase.create({
            data: { supplierId, storeId, coffeeType, quantity, totalCost }
        });
        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
