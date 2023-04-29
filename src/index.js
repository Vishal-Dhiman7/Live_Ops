const express = require("express");
// const router = require('express').Router();
const app = express();
const bodyParser = require("body-parser");
const {offer_connection,user_connection} = require("./model/db");
const routes = require("./routes/route")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.post("/login",routes.login);
app.post("/register",routes.register);


const PORT = 8080

app.listen(PORT);


// //data send through body, data is hidden,sign-up like follow this like form
// require("dotenv").config();
// const express = require("express");



// const app = express();
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
// app.post("/info",(req,res)=>{
//     console.log(req.body);
//     let name = req.body.name;
//     let age = req.body.age;
//     res.send({name,age});
//     res.end();
// })
// app.get("*",(req,res)=>{
//     return res.status(404).send("404");
// })
// app.listen(process.env.PORT);

