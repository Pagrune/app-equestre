const express = require('express');
const router = express.Router();
const { pool } = require('../services/BDD/dbConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/cavalier', (req, res) => {
  const { nomcavalier, prenomcavalier, token } = req.body;

  // Vérifier si le token est valide
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      console.error(error);
      res.status(401).send('Token invalide');
    } else {
      // decode the token
      const userId = decodedToken.id;
      // Utilisation d'une requête UPDATE pour mettre à jour l'enregistrement existant
      const query = 'UPDATE user SET cavalier_name = ?, cavalier_firstname = ? WHERE id_user = ?';
      pool.query(query, [nomcavalier, prenomcavalier, userId], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else if (results.affectedRows === 0) {
          // Aucune ligne mise à jour, cela pourrait signifier que l'utilisateur n'existe pas
          res.status(404).send('Utilisateur non trouvé');
        } else {
          res.status(200).send('Cavalier mis à jour avec succès');
        }
      });
    }
  });
});

module.exports = router;
