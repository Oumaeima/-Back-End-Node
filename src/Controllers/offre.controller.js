const multer = require("multer")
const path = require("path")
const offre = require('../Models/offre');
var db = require('../../Config/db.config');


// create new offre
/* exports.addOffre = (req, res) => {
    
     let offreItem = new offre(req.body)
    offre.createOffre(req.params.id, offreItem, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.send(tic)
            res.json({ status: true, message: 'offre Created Successfully' })
        }
    })
} */



exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      
      if (!req.files)
                return res.status(400).send('No files were uploaded.');
        var file = req.files.uploaded_pdf
        var img_name=file.name;
         if(file.mimetype == "application/pdf"){
                                
              file.mv('../offres'+file.name, function(err) {
                            
                  if (err)
                    return res.status(500).send(err);
                    offre.createOffre(req.params.id, img_name, (err, tic) => {
                        if (err)
                            res.send(err);
                        else {
                            res.send(tic)
                            res.json({ status: true, message: 'offre Created Successfully' })
                        }
                    })
                            
                       });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            
          }
   } else {
      console.log("error");
   }
};


