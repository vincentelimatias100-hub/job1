const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const storage =
multer.memoryStorage();

const upload =
multer({storage});

const cloudinary =
require("../config/cloudinary");

const Application =
require("../models/application");

router.post(
"/apply",

upload.single("photo"),

async(req,res)=>{

try{

const result =
await new Promise(
(resolve,reject)=>{

cloudinary.uploader.upload_stream(

{
folder:
"digital-wave-applications"
},

(error,result)=>{

if(error)
reject(error);

resolve(result);

}

).end(
req.file.buffer
);

}
);

await Application.create({

fullName:
req.body.fullName,

email:
req.body.email,

age:
req.body.age,

gender:
req.body.gender,

district:
req.body.district,

jobTitle:
req.body.jobTitle,

photoUrl:
result.secure_url

});

res.redirect("/");

}catch(err){

console.log(err);

res.send(
"Application failed"
);

}

});

module.exports =
router;
