const pl = require("tau-prolog");
const session = pl.create(1000);

function essai(suspect, lieu, jour) {
    const program = `
        etait_present(ralay, bar, mercredi).
        etait_present(eric, bar, mardi).
        etait_present(rasoa, 'EMIT', lundi).
        a_vole(rosine, lundi).
        a_vole(jao, mardi).
        a_vole(zo, jeudi).
        sans_argent(ralay).
        jaloux_de(rasoa, rosine).
    `;

    const goal = `
        suspect(X) :- voleur_potentiel(X).
        voleur_potentiel(X) :- etait_present(${suspect}, ${lieu}, ${jour}), a_vole(_, lundi), peut_voler(X).
        peut_voler(X) :- sans_argent(X).
        peut_voler(X) :- jaloux_de(X, rosine).
    `;

    return new Promise((resolve, reject) => {
        session.consult(program, {
            success: function() {
                session.query(goal, {
                    success: function() {
                        const answers = [];
                      return  session.answers(x => answers.push(session.format_answer(x)), () => resolve(answers));
                    }
                });
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

module.exports = essai;
