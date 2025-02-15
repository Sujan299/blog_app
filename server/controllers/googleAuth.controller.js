const axios = require("axios");
const jwt = require("jsonwebtoken");
const GoogleUserModel = require("../models/google.model.js");
const {google} = require("googleapis")
const googleLogin = async(req, res)=>{
    try{
        const code = req.query.code;
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,        
            "postmessage"
        )
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const {email, name, picture} = userRes.data;
        let user = await GoogleUserModel.findOne({email});
        if(!user){
            user = await GoogleUserModel.create({
                name, email, image: picture
            })
        };
        console.log("4")

        const { _id } = user;
        const token = jwt.sign({_id, email},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TIMEOUT
            }
        );
        return res.status(200).json({
            message: "Success",
            token, 
            user
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    };
}
 const getLogins = async (req, res)=>{
    const {email} = req.body;
    const user = await GoogleUserModel.findOne({email});
    if(!user){
        return res.status(404).json({message: "can not find the user !"});
    }
    res.status(200).send(user);
}

module.exports = {googleLogin, getLogins}
