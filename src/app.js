const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("hbs");
const path = require("path");

const app = express();
require("./db/conn");
const Register=require("./models/register.js")
const port = process.env.PORT || 6900;

const static_path = path.join(__dirname,"../public");
const tempath = path.join(__dirname,"../views");
const parpath = path.join(__dirname,"../views/partials");
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));

app.set("view engine", "hbs");

app.set("views",tempath);
handlebars.registerPartials(parpath);
//console.log(path.join(__dirname,"../public"))
app.get('/',(req,res) => {
    res.render("register")
});
app.post('/',async (req,res) => {
    try {
        const Password = req.body.Password;
        const CPassword = req.body.CPassword;
        if(Password===CPassword){
            const reguser = Register({
                Name: req.body.Name,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Password: req.body.Password,
                CPassword: req.body.CPassword
            })
            const registered=await reguser.save();
            res.status(201).render("register");
        }else{
            req.send("Passwords are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
// app.post('/', (req,res)=>{
//     console.log(req.body);
// })

app.listen(port, () => {
    console.log(`chude chatni bekar khatni`)
});

