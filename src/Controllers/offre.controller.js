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
            file.mv('src/Controllers/download/'+file.name, function(err) {
                if(err){
                    console.log("No Files Found");
                }else{
                    
                    console.log(img_name);
                    offre.createOffre(req.params.id, [img_name], (err, tic) => {
                        if (err)
                            res.send(err);
                        else {
                            res.send(tic)
                            
                        }
                    })            
                }    
            })
                         
          } else {
            message = "This format is not allowed , please upload file with '.pdf' extension";
            
          }
   } else {
      console.log("error");
   }
};




exports.getOffre = (req, res) => {
    offre.getOffre(req.params.id, (err, users) => {
        console.log('offre');
        if (err) {
            res.send(err);
        }
        else {
            console.log('offre');
            res.send(users)
            
        }
    })
}

exports.downloadOffre = (req, res) => {
    offre.getOffre(req.params.id, (err, users) => {
        console.log('offre');
        if (err) {
            res.send(err);
        }
        else {
            console.log('offre downloaded', users[0].offre);
            const file = `${__dirname}/download/${users[0].offre}`;
            res.download(file);
        }
    })
}

exports.updateOffre = function(req, res){
    message = '';
   if(req.method == "PUT"){
      
      if (!req.files)
                return res.status(400).send('No files were uploaded.');
        var file = req.files.uploaded_pdf
        var img_name=file.name;
         if(file.mimetype == "application/pdf"){
            file.mv('src/Controllers/download/'+file.name, function(err) {
                if(err){
                    console.log("No Files Found");
                }else{
                    
                    console.log(img_name);
                    offre.updateOffre(req.params.id, [img_name], (err, tic) => {
                        if (err)
                            res.send(err);
                        else {
                            res.json({ status: true, message: 'ticket updated Successfully' })                           
                        }
                    })            
                }    
            })
                         
          } else {
            message = "This format is not allowed , please upload file with '.pdf' extension";
            
          }
   } else {
      console.log("error");
   }
};




