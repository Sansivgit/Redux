var express = require('express');
var router = express.Router();
const Userschema = require('../model/userModel'); 



router.post('/upload', async (req, res) => {
    try {
        const {  email, password } = req.body;
        const load = req.body
        console.log(load);
        const loginexist = await Userschema.findOne({ email: email, password: password })
        if (loginexist) {
            return res.status(200).json({ loginexist })
            
        }
        else {
            res.status(400).json({ message: "invalid users" })
        }
       
    } catch (error) {
        console.log(error);
       
    }
});



module.exports = router;
