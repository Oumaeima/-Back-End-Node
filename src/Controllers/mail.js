app.post('/users', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prologic.opm@gmail.com',
            pass: '123456789?@'

        }
    });
    var mailOptions = {
        from: 'habhoubtest@gmail.com',// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.description,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.to}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ status: true, respMesg: 'Email  not Sent Successfully' })
        }
        else {
            res.json({ status: true, respMesg: 'Email Sent Successfully' })
        }

    });
});