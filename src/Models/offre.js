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

offre.getOffre = (id,result) => {
    dbConn.query('SELECT offre FROM offre WHERE ticket_id=?',[id], function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

module.exports = offre