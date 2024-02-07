const express = require('express');
const router = express.Router();
const { pool } = require('../services/BDD/dbConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Nombre de tours pour le salage
  const saltRounds = 10;

  // Vérifier si l'utilisateur existe déjà
  pool.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur du serveur');
    } else if (results.length > 0) {
      res.status(400).send('Cet utilisateur existe déjà');
    } else {
      // Hasher le mot de passe avant de l'insérer dans la base de données
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        pool.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          } else {
            // res.status(201).send('Utilisateur enregistré avec succès');
            // generate a token expire in 1hour
             const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, {
              expiresIn: '1h'
            });

            // send the token to the client
            res.status(201).json({ token });
                       


          }
        });
      } catch (hashError) {
        console.error(hashError);
        res.status(500).send('Erreur lors du hachage du mot de passe');
      }
    }
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur du serveur');
    } 
    else if (results.length > 0) {
      const user = results[0];
      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // res.status(200).send('Connexion réussie');
        // generate a token expire in 1hour
        console.log('je veux le user.id' +user.id_user);
        const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });

        // // send the token to the client
        res.status(200).json({ token });


        // res.status(200).json({ message: 'Connexion réussie' });

      } else {
        res.status(401).send('Mot de passe incorrect');
      }
    } else {
      res.status(404).send('Cet utilisateur n\'existe pas');
    }
  });
});

module.exports = router;
