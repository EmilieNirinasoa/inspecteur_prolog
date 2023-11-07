// const tauProlog = require('tau-prolog');

// const session = new tauProlog.create();

// // Chemin vers le fichier Prolog
// const cheminFichierProlog = './inspecteur.pl';

// // Charger le fichier Prolog
// session.consultFile(cheminFichierProlog);

// session.consult("./inspecteur", {
//   success: function() { /* Program loaded correctly */ },
//   error: function(err) { /* Error parsing program */ }
// });
// // Fonction pour exécuter le code Prolog
// function executerProlog(query, callback) {
//   session.query(query);

//   const resultat = [];
//   session.answers(answer => {
//     resultat.push(session.format_answer(answer));
//   }, () => {
//     callback(resultat.join('\n'));
//   });
// }

// module.exports = executerProlog;
