const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const Application =
require("../models/application");

router.get(
"/login",
(req,res)=>{

res.render(
"admin-login"
);

});

router.post(
"/login",
(req,res)=>{

const {
username,
password
}=req.body;

if(

username ===
process.env.ADMIN_USERNAME

&&

password ===
process.env.ADMIN_PASSWORD

){

req.session.admin =
true;

return res.redirect(
"/admin/dashboard"
);

}

res.send(
"Invalid credentials"
);

});

router.get(
"/dashboard",

auth,

async(req,res)=>{

const applications =
await Application.find()
.sort({
createdAt:-1
});

res.render(
"dashboard",
{
applications
}
);

});

router.get(
"/logout",

(req,res)=>{

req.session.destroy();

res.redirect(
"/admin/login"
);

});

module.exports =
router;
