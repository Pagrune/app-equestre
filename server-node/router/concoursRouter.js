const express = require('express');
const router = express.Router();
const { pool } = require('../services/BDD/dbConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/showconcours', (req, res) => {
  const { token } = req.body;

  // Vérifier si le token est valide
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      console.error(error);
      res.status(401).send('Token invalide');
    } else {
      // decode the token
      const userId = decodedToken.id;

      const query = 'SELECT * FROM propriete INNER JOIN concours on concours.propriete_id=propriete.propriete_id WHERE propriete.id_user = ?';
      pool.query(query, [userId], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(200).json(results);
        }
      });
      
    }
  });
});

router.get('/show/:id', (req, res) => {
  const { token, id } = req.body;

  // Vérifier si le token est valide
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      console.error(error);
      res.status(401).send('Token invalide');
    } else {
      // decode the token
      const userId = decodedToken.id;

      const query = 'SELECT * FROM concours WHERE discipline_id = ?';
      pool.query(query, [id], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(200).json(results);
        }
      });
    }
  });


});


module.exports = router;
