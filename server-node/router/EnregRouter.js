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

router.post('/saut', async (req, res) => {
  const { token, concours_date, categorie_id, niveau_id, classement, participant, selectedCheval, lieu } = req.body;

  // Vérifier si le token est valide
  try{
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.error(error);
        res.status(401).send('Token invalide');
      } else {
        // decode the token
        const userId = decodedToken.id;
        const discipline_id = "2";

        const propriete_id_query = 'SELECT propriete_id FROM propriete WHERE id_user = ? AND cheval_id = ?';
        pool.query(propriete_id_query, [userId, selectedCheval], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          } else {
            const propriete_id = results[0].propriete_id;
            console.log(propriete_id);
            // Utilisation d'une requête INSERT pour insérer un nouvel enregistrement
            const query = 'INSERT INTO concours (propriete_id, concours_date, concours_lieu, categorie_id, niveau_id, concours_classement, concours_participant, discipline_id	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(query, [propriete_id, concours_date, lieu, categorie_id, niveau_id, classement, participant, discipline_id], (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send('Erreur du serveur');
              } else {
                res.status(201).send('Enregistrement réussi');
              }
            });
          }
        });
      }
    });
  }
  catch{
    res.status(401).send('Token invalide');
  
  }

}
);

router.post('/dressage', async (req, res) => {
  const { token, concours_date, categorie_id, niveau_id, classement, participant, selectedCheval, lieu } = req.body;

  // Vérifier si le token est valide
  try{
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.error(error);
        res.status(401).send('Token invalide');
      } else {
        // decode the token
        const userId = decodedToken.id;
        const discipline_id = "1";

        const propriete_id_query = 'SELECT propriete_id FROM propriete WHERE id_user = ? AND cheval_id = ?';
        pool.query(propriete_id_query, [userId, selectedCheval], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          } else {
            const propriete_id = results[0].propriete_id;
            console.log(propriete_id);
            // Utilisation d'une requête INSERT pour insérer un nouvel enregistrement
            const query = 'INSERT INTO concours (propriete_id, concours_date, concours_lieu, categorie_id, niveau_id, concours_classement, concours_participant, discipline_id	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(query, [propriete_id, concours_date, lieu, categorie_id, niveau_id, classement, participant, discipline_id], (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send('Erreur du serveur');
              } else {
                res.status(201).send('Enregistrement réussi');
              }
            });
          }
        });
      }
    });
  }
  catch{
    res.status(401).send('Token invalide');
  
  }

}
);

router.post('/cce', async (req, res) => {
  const { token, concours_date, categorie_id, niveau_id, classement, participant, selectedCheval, lieu } = req.body;

  // Vérifier si le token est valide
  try{
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.error(error);
        res.status(401).send('Token invalide');
      } else {
        // decode the token
        const userId = decodedToken.id;
        const discipline_id = "3";

        const propriete_id_query = 'SELECT propriete_id FROM propriete WHERE id_user = ? AND cheval_id = ?';
        pool.query(propriete_id_query, [userId, selectedCheval], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Erreur du serveur');
          } else {
            const propriete_id = results[0].propriete_id;
            console.log(propriete_id);
            // Utilisation d'une requête INSERT pour insérer un nouvel enregistrement
            const query = 'INSERT INTO concours (propriete_id, concours_date, concours_lieu, categorie_id, niveau_id, concours_classement, concours_participant, discipline_id	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(query, [propriete_id, concours_date, lieu, categorie_id, niveau_id, classement, participant, discipline_id], (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send('Erreur du serveur');
              } else {
                res.status(201).send('Enregistrement réussi');
              }
            });
          }
        });
      }
    });
  }
  catch{
    res.status(401).send('Token invalide');
  
  }

}
);

module.exports = router;
