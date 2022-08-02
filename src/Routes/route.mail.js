const express = require('express');
const router = express.Router();
const MailController = require('../Controllers/mail.controller')

router.post("/sendmail", MailController.sendMails)
router.post("/sendMailUser", MailController.sendMailsUser)

module.exports = router