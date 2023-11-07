const express = require('express');
const executerProlog = require('./app');
const cors = require('cors'); // Importez cors
const essai = require('./essai');
const fs = require('fs');
const app = express();
const { exec } = require('child_process');
const PORT = process.env.PORT || 3001;
const pl = require("tau-prolog");
const session = pl.create(1000);
app.use(express.json());
app.use(cors()); // Utilisez cors

app.post('/executerProlog', (req, res) => {
  const donnees = req.body.donnees; 
  const victime=donnees[0]
  const lieuv=donnees[1]
  const jourv=donnees[2]
  const suspect=donnees[3]
  const lieu=donnees[4]
  const jour=donnees[5]
  // Les données à envoyer au code Prolog
 console.log(victime,lieuv,jourv,suspect,lieu,jour) 
const enigme="setrouve("+suspect+","+lieu+","+jour+").\n jaloux("+suspect+","+victime+").\n sansargent("+victime+").";
const suitEnigme="\n suspect(X) :-setrouve(x,"+victime+","+lieuv+").\n jaloux(x,"+victime+").\n sansargent(x).";
const total=enigme+suitEnigme;
console.log(total);




fs.writeFile('./inspecteur.pl', total, (err) => {
  if (err) throw err;
  console.log('Le script Prolog a été écrit avec succès.');

  // Maintenant, vous pouvez exécuter le script Prolog
  // et envoyer la réponse à votre application React
});


const { spawn } = require('child_process');

const process = spawn('swipl', ['inspecteur.pl']);

process.stdout.on('data', (data) => {
  console.log(`Données de sortie : ${data}`);
});

process.stderr.on('data', (data) => {
  console.error(`Erreur de sortie : ${data}`);
});

process.on('close', (code) => {
  console.log(`Le processus s'est terminé avec le code ${code}`);
});






return total;

  
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
