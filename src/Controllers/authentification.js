const sql = require('../../Config/db.config');
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypte = require('bcrypt')
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
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
                
                const check = cryptr.encrypt(password, rows[0].password);
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
    


    if (!newuser.nom || !newuser.prenom || !newuser.poste || !newuser.tel) {
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
    console.log(newuser.tel);
    console.log(newuser.email);
    console.log(newuser.password);
    console.log(newuser.role);

    let email, password

    if (!newuser.nom || !newuser.prenom || !newuser.tel  ||!newuser.email || !newuser.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        try {
            newuser.password = cryptr.encrypt(newuser.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newuser);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO users SET ?, poste='Technicien', role="Technicien"`, newuser, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "problem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where email = ?", newuser.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    // 
                    connection.query('SELECT email, password FROM users WHERE email = ?', newuser.email, (err, res) => {
                        if (err) {
                            console.log('Error while fetching id user', err);
                            
                        } else {
                            const decryptedString = cryptr.decrypt(res[0].password);
                            email = res[0].email
                            password = decryptedString
                            console.log("email client "+email);
                            console.log("password client "+password);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.MAIL_USERNAME,
                                    pass: process.env.MAIL_PASSWORD
                                },
                            });
                            var message = {
                                from: process.env.MAIL_USERNAME,// sender address
                                to: email, // list of receivers
                                subject: "Coordonnées de votre compte de l'application opm", // Subject line
                                html: `
                                <div style="padding:10px;border-style: ridge">
                                <h3>Details</h3>
                                <ul>
                                    Voici les Coordonnées d'accées à votre compte d'application OPM:
                                    <li>Email : ${email}</li>
                                    <li>Mot de passe : ${password}</li>
                                </ul>
                                `
                            };
                            transporter.sendMail(message) 
                        }
                    }
                    
                    );
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
    

    let email, signature, password

    if (!newclient.nom || !newclient.prenom || !newclient.nomsociete || !newclient.email || !newclient.tel || !newclient.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        let v1 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

            let v2 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

            let v3 = ('OPM'.concat(v1, v2));
            
            newclient.signature =v3;

        try {
            newclient.password = cryptr.encrypt(newclient.password);
        } catch (error) {
            res.status(401).json({ msg: 'some thing went wrong' });
            next()
        }


        console.log(newclient);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO users SET ?, poste="Client", role="Client"`, newclient, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "probleme" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where role='Client' AND email = ?", newclient.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    connection.query('SELECT email, password, signature FROM users WHERE email = ?', newclient.email, (err, res) => {
                        if (err) {
                            console.log('Error while fetching id client', err);
                            
                        } else {
                            const decryptedString = cryptr.decrypt(res[0].password);
                            email = res[0].email
                            signature = res[0].signature
                            password = decryptedString
                            console.log("email client "+email);
                            console.log("signature client "+signature);
                            console.log("password client "+password);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.MAIL_USERNAME,
                                    pass: process.env.MAIL_PASSWORD
                                },
                            });
                            var message = {
                                from: process.env.MAIL_USERNAME,// sender address
                                to: email, // list of receivers
                                subject: "Coordonnées de votre compte de l'application opm", // Subject line
                                html: `
                                <div style="padding:10px;border-style: ridge">
                                <h3>Details</h3>
                                <ul>
                                    Voici les Coordonnées d'accées à votre compte d'application OPM:
                                    <li>Email : ${email}</li>
                                    <li>Mot de passe : ${password}</li>
                                    <li>Signture : ${signature}</li>
                                </ul>
                                `
                            };
                            transporter.sendMail(message) 
                        }
                    }
                    
                    );
                }
            })
        })


    }



}

exports.createCommercial = async (req, res, next) => {
    let newCommercial = req.body;
    console.log(newCommercial.nom);
    console.log(newCommercial.prenom);
    console.log(newCommercial.nomsociete);
    console.log(newCommercial.tel);
    console.log(newCommercial.email);
    console.log(newCommercial.password);
    console.log(newCommercial.role);

    let email, password

    if (!newCommercial.nom || !newCommercial.prenom || !newCommercial.tel  ||!newCommercial.email || !newCommercial.password || !newCommercial.nomsociete) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        try {
            newCommercial.password = cryptr.encrypt(newCommercial.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newCommercial);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO users SET ?, poste='Commercial', role="Commercial"`, newCommercial, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "problem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where email = ?", newCommercial.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    // 
                    connection.query('SELECT email, password FROM users WHERE email = ?', newCommercial.email, (err, res) => {
                        if (err) {
                            console.log('Error while fetching id user', err);
                            
                        } else {
                            const decryptedString = cryptr.decrypt(res[0].password);
                            email = res[0].email
                            password = decryptedString
                            console.log("email commercial "+email);
                            console.log("password commercial "+password);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.MAIL_USERNAME,
                                    pass: process.env.MAIL_PASSWORD
                                },
                            });
                            var message = {
                                from: process.env.MAIL_USERNAME,// sender address
                                to: email, // list of receivers
                                subject: "Coordonnées de votre compte de l'application opm", // Subject line
                                html: `
                                <div style="padding:10px;border-style: ridge">
                                <h3>Details</h3>
                                <ul>
                                    Voici les Coordonnées d'accées à votre compte d'application OPM:
                                    <li>Email : ${email}</li>
                                    <li>Mot de passe : ${password}</li>
                                </ul>
                                `
                            };
                            transporter.sendMail(message) 
                        }
                    }
                    
                    );
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

    let email, password

    if ( !newAdmin.nom|| !newAdmin.prenom ||!newAdmin.email || !newAdmin.password) {
        console.log("here");
        res.status(401).json({ msg: 'All fields required' });
    } else {
        try {
            newAdmin.password = cryptr.encrypt(newAdmin.password, 12);
        } catch (error) {
            res.status(401).json({ msg: 'some thingwent wrong' });
            next()
        }


        console.log(newAdmin);

        sql.getConnection((err, connection) => {

            connection.query(`INSERT INTO users SET ?, poste="admin", role="admin"`, newAdmin, (err, rows) => {

                if (!rows || rows.length == 0) {
                    res.status(200).json({ msg: "probleeeem" })
                } else {
                    console.log(rows);
                    connection.query("SELECT idu from users where email = ?", newAdmin.email, (err2, rows2) => {
                        connection.release()
                        createSendToken(rows2[0].idu, 201, res)
                    })
                    connection.query('SELECT email, password FROM users WHERE email = ?', newAdmin.email, (err, res) => {
                        if (err) {
                            console.log('Error while fetching id user', err);
                            
                        } else {
                            const decryptedString = cryptr.decrypt(res[0].password);
                            email = res[0].email
                            password = decryptedString
                            console.log("email admin "+email);
                            console.log("password admin "+password);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.MAIL_USERNAME,
                                    pass: process.env.MAIL_PASSWORD
                                },
                            });
                            var message = {
                                from: process.env.MAIL_USERNAME,// sender address
                                to: email, // list of receivers
                                subject: "Coordonnées de votre compte de l'application opm", // Subject line
                                html: `
                                <div style="padding:10px;border-style: ridge">
                                <h3>Details</h3>
                                <ul>
                                    Voici les Coordonnées d'accées à votre compte d'application OPM:
                                    <li>Email : ${email}</li>
                                    <li>Mot de passe : ${password}</li>
                                </ul>
                                `
                            };
                            transporter.sendMail(message) 
                        }
                    }
                    
                    );
                }
            })
        })


    }



}

