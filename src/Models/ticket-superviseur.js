var dbConn = require('../../Config/db.config');

var ticket_superviseur = function (ticket_superviseur) {

    this.idti = ticket_superviseur.idti;
    this.idu= ticket_superviseur.idu;
    this.email = ticket_superviseur.email;
}

// creation des ticket de la part de l'admin  //  
ticket_superviseur.affecterticketSuperviseur = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `INSERT INTO ticket_affectation SET idti=? , idu=(SELECT idu FROM users WHERE email = "${data.email}" )`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("ticket affectée avec succée !");
            }
        );
    });
};
// get all email superviseurs 
ticket_superviseur.getAllEmailSuperviseurs = (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Superviseur"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

module.exports = ticket_superviseur