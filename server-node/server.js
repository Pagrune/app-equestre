const express = require('express');
const app = express();
const authRouter = require('./router/authRouter.js');

app.use(express.json()); // Pour analyser les requêtes JSON

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API!');
});

app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});