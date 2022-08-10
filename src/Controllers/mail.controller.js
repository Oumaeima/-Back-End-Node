const nodemailer = require('nodemailer')

exports.sendMails = async function(req, res){
    console.log("req body", req.body);
    let userMail = req.body.userMail
    let userMessage = req.body.userMessage
    let Object = req.body.object

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
    });
    var message = {
        from: process.env.MAIL_USERNAME,// sender address
        to: userMail, // list of receivers
        subject: Object, // Subject line
        text: userMessage,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Compte Details</h3>
        <ul>
            <li>Email: ${userMail}</li>
            <li>Subject: ${Object} </li>
            <li>Message: ${userMessage}</li>
        </ul>
        `
    };

    transporter.sendMail(message, (err,info)=>{
        if(err){
            console.log('error in sending mail', err);
            return res.status(400).json({
                message: `error in sending mail ${err}`
            })
        }else{
            console.log('sucessfully send mail', info);
            return res.status(400).json({
                message: info
            })
        }
    })
    
}

// send email from client
exports.sendMailsUser = (req, res)=>{
    console.log("req body", req.body);
    let user1 = req.body.user1
    let userMail = req.body.userMail
    let userMessage = req.body.userMessage
    let Object = req.body.object

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
           
            user: user1,
            
        },
    });
    var message = {
        from: user1,// sender address
        to: userMail, // list of receivers
        subject: Object, // Subject line
        text: userMessage,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Compte Details</h3>
        <ul>
            <li>Email: ${userMail}</li>
            <li>Subject: ${Object} </li>
            <li>Message: ${userMessage}</li>
        </ul>
        `
    };

    transporter.sendMail(message, (err,info)=>{
        if(err){
            console.log('error in sending mail', err);
            return res.status(400).json({
                message: `error in sending mail ${err}`
            })
        }else{
            console.log('sucessfully send mail', info);
            return res.status(400).json({
                message: info
            })
        }
    })
    
}