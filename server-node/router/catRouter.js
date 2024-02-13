const express = require('express');
const router = express.Router();
const { pool } = require('../services/BDD/dbConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/categories', (req, res) => {
    pool.query('SELECT * FROM categorie', (error, results) => {
        if (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
        } else {
        res.status(200).json(results);
        }
    });
});

router.get('/niveau', (req, res) => {
    pool.query('SELECT * FROM niveau WHERE categorie_id = ?', [req.query.categorie_id], (error, results) => {
        if (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
        } 
        else {
        res.status(200).json(results);
        }
    }
    );
});

module.exports = router;