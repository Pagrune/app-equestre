const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../services/BDD/dbConfig.js');

// Exemple de route d'inscription
router.post('/register', (req, res) => {
  // Votre logique d'inscription ici
});

// Exemple de route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
   const { rows } = await pool.query('SELECT * FROM user WHERE email = $1', [req.body.email]);
    if (rows.length > 0) {
      const user = rows[0];

      // Comparer le mot de passe fourni avec le mot de passe haché stocké
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Générer un token JWT
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.json({ token });
      } else {
        res.status(401).json({ message: 'Mot de passe incorrect' });
      }
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

module.exports = router;