const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

exports.register = async (req, res) => {
const { username, password } = req.body;
    try {

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca usuário pelo nome
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json(
            { error: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
             error: 'Senha incorreta' });

        // Cria web token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, 
            { expiresIn: '1h' });
       // res.json({ token });
        res.status(200).json({message: "Login realizado"});
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

