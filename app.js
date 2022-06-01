//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");


const app = express();
mongoose.connect("mongodb+srv://admin-Pratham:Test123@cluster0.isrco.mongodb.net/realestatenewDB",{useNewUrlParser:true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
const userSchema =new mongoose.Schema ({

  email:String,
  password:String
});

const Realestate = "Realestate.";
userSchema.plugin(encrypt, { secret: Realestate,encryptedFields: ["password"]});


const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.render("home");
  });

  app.get("/login",function(req,res){
    res.render("login");
    });

    app.get("/register",function(req,res){
      res.render("register");
      });

app.post("/register",function(req,res){
  const newUser = new User({

    email:req.body.username,
    password:req.body.password
  });
newUser.save(function(err){
if (err) {
  console.log(err);
}else {
  res.render("index");
}

});
});

app.post("/login",function(req,res){
const username = req.body.username;
const password = req.body.password;


User.findOne({email:username},function(err,foundUser){
  if (err) {
    console.log(err);
  }else{
    if (foundUser) {
      if (foundUser.password === password) {
        res.render("index");
      }else {
        res.render("failure");
      }
    }
  }
});

});
const formBAHSchema ={
  Fname:String,
  Lname:String,
  username:String,
  city:String,
  state:String,
  zip:Number,
  address:String,
  phnumber:Number,
  price:Number,
  area:Number,
  mail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',

        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  image:{ data: Buffer, contentType: String },
  image:{ data: Buffer, contentType: String },
  image:{ data: Buffer, contentType: String }

};

const FormBAH = mongoose.model("FormBAH",formBAHSchema);

const form1BAH=new FormBAH({
  Fname:"Pratham",
  Lname:"Mirdoddiwar",
  username:"nobitaprat",
  city:"Ballarpur",
  state:"Maharashtra",
  zip:442701,
  address:"budha nagar ward",
  phnumber:7028640462,
  price:100000,
  area:1500,
  mail:"20145@iiitu.ac.in",
  image:"JPEG_20210524_185319_2269773547026169050 (2).jpg",
  image:"JPEG_20210524_185319_2269773547026169050 (2).jpg",
  image:"JPEG_20210524_185319_2269773547026169050 (2).jpg"
});

// FormBAH.insertMany(form1BAH,function(err){
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("success");
//   }
// });

app.get("/buyahome",function(req,res){
  FormBAH.find({},function(err,foundFormsBAH){

      res.render("buyahome", { newformItems: foundFormsBAH});
  });
});
app.get("/property-1",function(req,res){
  FormBAH.find({},function(err,foundFormsBAH){

      res.render("property-1", { newformItems: foundFormsBAH});
  });
});

app.get("/property-2",function(req,res){
  FormBAH.find({},function(err,foundFormsBAH){

      res.render("property-2", { newformItems: foundFormsBAH});
  });
});

// app.get("/",function(req,res){
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/sellyourplace",function(req,res){
res.render("sellyourplace");
});

app.get("/sell_a_home",function(req,res){
res.render("sell_a_home");
});

app.get("/rentyourhome",function(req,res){
res.render("rentyourhome")
});

app.get("/buyaplace",function(req,res){
  // res.redirect("/list")
res.render( "buyaplace")
});

app.get("/login",function(req,res){
res.render("login")
});

app.get("/buyahome",function(req,res){
res.render("buyahome")
});

app.get("/homeforrent",function(req,res){
res.render("homeforrent")
});

app.get("/property-1",function(req,res){
res.render("property-1")
});

app.get("/property-2",function(req,res){
res.render("property-2")
});

//   const Syp = new mongoose.model("Syp",formBAHSchema);
//
//
//
//
// app.post("/sellyourplace",function(req,res){
//   const formsyp = new Syp({
//     Fname:req.body.Fname,
//     Lname: req.body.Lname,
//
//     city:req.body.city,
//     state:req.body.state,
//     zip:req.body.zip,
//     address:req.body.address,
//     phnumber:req.body.phnumber,
//     price:req.body.price,
//     area:req.body.area,
//     mail: {
//           type: String,
//           trim: true,
//           lowercase: true,
//           unique: true,
//           required: 'Email address is required',
//
//           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//       },
//     image:req.body.image1,
//     image:req.body.image2,
//     image:req.body.image3
//
//   });
//   Syp.insertMany(formsyp,function(err){
//     if (err) {
//       console.log(err);
//     }else {
//       console.log("success");
//     }
//   });
// let Firstname =req.body.Fname;
// let Lastname = req.body.Lname;
// let city = req.body.city;
// let state = req.body.state;
// let zip = req.body.zip;
// let address = req.body.address;
// let price = req.body.price;
// let area = req.body.area;
//
// let image = req.body.image;
















let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}







app.listen(port,function(){
  console.log("server started ");
});
