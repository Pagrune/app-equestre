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

router.post('/cheval', async (req, res) => {
  const { nomcheval, token } = req.body;

  try {
    // Vérifier si le token est valide
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Première requête pour insérer le cheval
    const insertChevalQuery = 'INSERT INTO cheval (cheval_name) VALUES (?)';
    const [chevalResult] = await pool.promise().query(insertChevalQuery, [nomcheval]);

    if (chevalResult.affectedRows === 0) {
      return res.status(404).send('Erreur lors de l\'insertion du cheval');
    }

    // Deuxième requête pour lier le cheval à l'utilisateur
    const chevalId = chevalResult.insertId; // Récupérer l'ID du cheval inséré
    const insertProprieteQuery = 'INSERT INTO propriete (id_user, cheval_id) VALUES (?, ?)';
    await pool.promise().query(insertProprieteQuery, [userId, chevalId]);

    res.status(200).send('Cheval lié à l\'utilisateur avec succès');
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      res.status(401).send('Token invalide');
    } else {
      res.status(500).send('Erreur du serveur');
    }
  }
});


router.post('/meschevaux', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const query = 'SELECT * FROM cheval INNER JOIN propriete ON cheval.cheval_id = propriete.cheval_id WHERE propriete.id_user = ?';
    const [results] = await pool.promise().query(query, [userId]);

    res.status(200).json(results);
  }
  catch(error){
    console.error(error);
    res.status(401).send('Token invalide');
  }
});

router.post('/propriete', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const query = 'SELECT * FROM cheval INNER JOIN propriete ON cheval.cheval_id = propriete.cheval_id WHERE propriete.id_user = ?';
    const [results] = await pool.promise().query(query, [userId]);

    res.status(200).json(results);
  }
  catch(error){
    console.error(error);
    res.status(401).send('Token invalide');
  }
});


router.post('/chevaux', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const query = 'SELECT * FROM cheval INNER JOIN propriete ON cheval.cheval_id = propriete.cheval_id WHERE propriete.id_user = ?';
    const [results] = await pool.promise().query(query, [userId]);

    res.status(200).json(results);
  }
  catch(error){
    console.error(error);
    res.status(401).send('Token invalide');
  }
});

module.exports = router;
