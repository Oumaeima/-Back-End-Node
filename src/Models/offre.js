var dbConn = require('../../Config/db.config');
var path = require('path')

var offre = function (Offre) {
    this.offre = Offre.offre;   
}

offre.createOffre= (id,data) => {
    return new Promise(async (resolve, reject) => {
        
        dbConn.query(
            `INSERT INTO offre  SET offre="${data}", ticket_id =(SELECT idti FROM partorder WHERE idti="${id}")`,
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre crée avec succée !");
            }
        );
           
    }); 
};

module.exports = offre