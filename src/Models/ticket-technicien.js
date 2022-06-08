var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');
//const { DATE } = require('sequelize/types');

var ticket_technicien = function (ticket_technicien) {

    this.idti = ticket_technicien.idti;
    this.idu = ticket_technicien.idu;
    this.email = ticket_technicien.email;
}

// creation des ticket de la part de l'admin  //  
ticket_technicien.affecterticketTechniciens = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            //  `INSERT INTO ticket_technicien (idticket,idUser) VALUES (?,SELECT idUser from users where email=  "${data.email}")`, [userItem.idticket,userItem.idUser],        
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

module.exports = ticket_technicien

