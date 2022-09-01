var dbConn = require('../../Config/db.config');
var path = require('path')

var offre = function (Offre) {
    this.ticket_id = Offre.ticket_id;
    this.offre = Offre.offre;   
}

offre.createOffre= (id, data, result) => {
     
        dbConn.query(
            `INSERT INTO offre  SET offre="${data}", ticket_id =(SELECT idti FROM partorder WHERE idti="${id}")`, (err, res) => {
                if (err) {
                    console.log('Error while addinh offre');
                    result(null, err);
                }else {
                    console.log("offre added successfully");
                    result(null, res);
                }
            }
        );
           
     
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

offre.updateOffre = (id, data, result) => {

    dbConn.query(`UPDATE offre SET offre='${data}' WHERE ticket_id = ?`, [id], (err, res) => {
        if (err) {
            console.log('Error while updating the offre');
            result(null, err);
        } else {
            console.log("offre updated successfully");
            result(null, res);
        }
    });
}


module.exports = offre