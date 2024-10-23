const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao registrar usuário', details: err });
    }
});

// Rota para listar todos os usuários (opcional, pode remover)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

module.exports = router;
