const express = require('express');
const app = express();
const authRouter = require('./router/authRouter.js');
const mysql = require('mysql2/promise');
require('dotenv').config();



const pool = require('./services/BDD/dbConfig.js');

const cors = require('cors');
app.use(cors());

app.use(express.json()); // Pour analyser les requêtes JSON

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API!');
});

app.use('/auth', authRouter);

app.use('/enreg', require('./router/EnregRouter.js'));

app.use('/cat', require('./router/catRouter.js'));

app.use('/infoscompte', require('./router/authInfosCompte.js'));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Tester la connexion à la base de données
  try {
    const connection = await pool.getConnection();

    // const [rows] = await connection.execute('SELECT * from user');
    // console.log('Données de la table user :', rows);
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  }
});