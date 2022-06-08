var dbConn = require('../../Config/db.config');
var technicien_taches = function (technicien_taches) {

    this.idti = technicien_taches.idticket;
    this.tache = technicien_taches.tache;
}

// creation des ticket de la part de l'admin  //  
technicien_taches.tachesrealisees = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
             `INSERT INTO technicien_taches SET idti=? , tache = ? `, [idti, data.tache],
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



module.exports = technicien_taches