const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Exemple de route d'inscription
router.post('/register', (req, res) => {
  // Votre logique d'inscription ici
});

// Exemple de route de connexion
router.post('/login', (req, res) => {
  // Votre logique de connexion ici
  const { email, password } = req.body;

});

module.exports = router;
