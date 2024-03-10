const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken');
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'bjhkdajsdajbdajbdajs';

app.use(express.json());
app.use(cookieParser());

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173',
}));    
//VGlwi0tIRM8lHNMC

 mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res)=>{
    res.json("test ok");
});

app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
});

app.post('/login',async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});

    if(userDoc){
        const passOk = bcrypt.compare(password,userDoc.password);
        if(passOk){ 
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token) => {
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            })
            // res.json("pass correct");
        }else{
            res.status(422).json("pass not ok");
        }
        // res.json('found');
    }else{
        res.json('not found');
    }

});

app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
});

app.post('/logout',(req,res) => {
    res.cookie('token','').json(true);
});

app.post("/upload-by-link",async (req,res) => {
    const {link} = req.body;
    const newName = 'photos' + Date.now() + ".jpg";
    await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/' + newName,
    });

    res.json(newName);
});

const photosMiddleware = multer({dest : 'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res) => {
    // console.log(req.files);
    const uploadedFiles = [];
    for(let i=0; i<req.files.length ; i++){
        console.log(req.files[i]);
        const {path,filename} = req.files[i];
        const parts = filename.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles)
    
})

app.listen(4000);