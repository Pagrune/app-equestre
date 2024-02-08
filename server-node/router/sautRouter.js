const express = require('express');
const router = express.Router();
const { pool } = require('../services/BDD/dbConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/getresult_saut', (req, res) => {
  pool.query('SELECT * FROM saut', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur du serveur');
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/enregsaut', (req, res) => {
//   const { nom, prenom, cheval, club, categorie, epreuve, date, temps, fautes, place } = req.body;
    // pool.query('INSERT INTO saut (nom, prenom, cheval, club, categorie, epreuve, date, temps, fautes, place) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nom, prenom, cheval, club, categorie, epreuve, date, temps, fautes, place], (error, results) => {
    //     if (error) {
    //     console.error(error);
    //     res.status(500).send('Erreur du serveur');
    //     } else {
    //     res.status(201).send('Enregistrement réussi');
    //     }
    // });
}
);

module.exports = router;