const techtaches = require('../Models/tech_taches');

// taches réalisées 
exports.tachesRealisees = (req, res) => {
    const userReqData = new techtaches(req.body);
    console.log('userReqData', userReqData);
        techtaches.tachesrealisees(req.params.idti,userReqData, (err, user) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'User Created Successfully', data: user.insertId })
        })
}
