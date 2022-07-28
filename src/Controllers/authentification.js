const sql = require('../../Config/db.config');
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypte = require('bcrypt')
const nodemailer = require('nodemailer');
const creetoken = (id) => {
    return jwt.sign({ id }, "The word of tokens", {
        expiresIn: "30d"
    })
}


const createSendToken = (users, statusCode, res) => {
    const token = creetoken(users.idu);
    const cookieOptions = {
        expires: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    users.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            users
        }
    });
};




exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    sql.getConnection((err, connection) => {
        if (err) throw err

        console.log("connectd sucssesfuly");
        console.log(req.body);

        connection.query("select * from users  where email = ?", email, async (err, rows) => {
            connection.release();
            if (rows.length == 0) {
                res.status(401).json({ msg: "User not found " })
               
            } else {
                const check = await bcrypte.compare(password, rows[0].password);
                console.log(check);
                if (check) {
                    console.log(rows[0]);
                    createSendToken(rows[0], 200, res);

                } else {
                    res.status(401).json({ msg: "User or password are wrong" });
                }
            }
        })
    })
    
}

exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    sql.getConnection((err, connection) => {
        if (err) throw err

        console.log("connectd sucssesfuly");
        console.log(req.body);

        connection.query("select * from admin  where email = ?", email, async (err, rows) => {
            connection.release();
            if (rows.length == 0) {
                res.status(401).json({ msg: "User not found " })

            } else {
                const check = await bcrypte.compare(password, rows[0].password);
                console.log(check);
                if (check) {
                    console.log(rows[0]);
                    createSendToken(rows[0], 200, res);

                } else {
                    res.status(401).json({ msg: "User or password are wrong" });
                }
            }
        })
    })
    
}
exports.loginSuperAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    sql.getConnection((err, connection) => {
        if (err) throw err

        console.log("connectd sucssesfuly");
        console.log(req.body);

        connection.query("SELECT * FROM superadmin WHERE email = ?",email, async (err, rows) => {
            connection.release();
            if (rows.length == 0) {
                res.status(401).json({ msg: "User not found " })

            }else {
                const check = await bcrypte.compare(password, rows[0].password);
                console.log(check);
                if (check) {
                    console.log(rows[0]);
                    createSendToken(rows[0], 200, res);

                } else {
                    res.status(401).json({ msg: "User or password are wrong" });
                }
            }
        })
    })
    
}
exports.loginClient = async (req, res, next) => {
    const { email, password } = req.body;

    sql.getConnection((err, connection) => {
        if (err) throw err

        console.log("connectd sucssesfuly");
        console.log(req.body);

        connection.query("select * from client  where email = ?", email, async (err, rows) => {
            connection.release();
            if (rows.length == 0) {
                res.status(401).json({ msg: "User not found " })

            } else {
                const check = await bcrypte.compare(password, rows[0].password);
                console.log(check);
                if (check) {
                    console.log(rows[0]);
                    createSendToken(rows[0], 200, res);

                } else {
                    res.status(401).json({ msg: "User or password are wrong" });
                }
            }
        })
    })
    
}

exports.signup = async (req, res, next) => {
    let newuser = req.body;
    console.log(newuser.nom);
    console.log(newuser.prenom);
    console.log(newuser.poste);
    console.log(newuser.tel);
    console.log(newuser.photo);


    if (!newuser.nom || !newuser.prenom || !newuser.poste || !newuser.tel || !newuser.photo) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {



        console.log(newuser);

        sql.getConnection((err, connection) => {

            connection.query("INSERT INTO users SET ?", newuser, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "problem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where email = ?", newuser.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    // 
                }
            })
        })


    }



}
exports.createuser = async (req, res, next) => {
    let newuser = req.body;
    console.log(newuser.nom);
    console.log(newuser.prenom);
    console.log(newuser.poste);
    console.log(newuser.tel);
    console.log(newuser.email);
    console.log(newuser.password);
    console.log(newuser.role);

    if (!newuser.nom || !newuser.prenom || !newuser.poste || !newuser.tel  ||!newuser.email || !newuser.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        try {
            newuser.password = await bcrypte.hash(newuser.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newuser);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO users SET ?,role="${newuser.poste}"`, newuser, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "problem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where email = ?", newuser.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    // 
                }
            })
        })


    }
  
}


exports.createClient = async (req, res, next) => {
    let newclient = req.body;
    console.log(newclient.nom);
    console.log(newclient.prenom);
    console.log(newclient.nomsociete);
    console.log(newclient.tel);
    console.log(newclient.email);
    console.log(newclient.signature);
    
    console.log(newclient.password);
    console.log(newclient.role);

    if (!newclient.nom || !newclient.prenom || !newclient.nomsociete || !newclient.email || !newclient.tel || !newclient.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        let v1 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

            let v2 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

            let v3 = ('OPM'.concat(v1, v2));
newclient.signature =v3;
        try {
            newclient.password = await bcrypte.hash(newclient.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newclient);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO client SET ?,role="client"`, newclient, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "probleeeem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idclt from client where email = ?", newclient.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idclt, 201, res)
                    })
                    // 
                }
            })
        })


    }



}


exports.createAdmin = async (req, res, next) => {
    let newAdmin = req.body;
    console.log(newAdmin.nom);
    console.log(newAdmin.prenom);
    console.log(newAdmin.email);
   
    console.log(newAdmin.password);
    console.log(newAdmin.role);
    if ( !newAdmin.nom|| !newAdmin.prenom ||!newAdmin.email || !newAdmin.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        try {
            newAdmin.password = await bcrypte.hash(newAdmin.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newAdmin);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO admin SET ? ,role="admin"`, newAdmin, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "probleeeem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT ida from admin where email = ?", newAdmin.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].ida, 201, res)
                    })
                    
                }
            })
        })


    }



}

