const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Rota para adicionar um novo produto
router.post('/', async (req, res) => {
    try {
        const { name, price, description, stock, category } = req.body;
        const newProduct = new Product({ name, price, description, stock, category });
        await newProduct.save();
        res.status(201).json({ message: 'Produto criado com sucesso!', product: newProduct });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar produto', details: err });
    }
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

module.exports = router;
