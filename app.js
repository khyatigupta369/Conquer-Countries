const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const { ObjectId } = require("bson");

const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "this is innerve",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const db = "mongodb://localhost:27017/userDB";
const db = "mongodb+srv://Khyati:%231Khyati@cluster0.rsaxe.mongodb.net/userDB";
// const db = require('./config/key').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    //   required: true,
  },
  armySize: {
    type: Number,
    default: 500,
  },
  countries: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },

  bon1: {
    type: String,
    default: "visible",
  },
  bon2: {
    type: String,
    default: "visible",
  },
  bon3: {
    type: String,
    default: "visible",
  },

  Psilven: {
    type: String,
    default: "visible",
  },
  Petherion: {
    type: String,
    default: "visible",
  },
  Parthora: {
    type: String,
    default: "visible",
  },
  Pdanera: {
    type: String,
    default: "visible",
  },
  Pmiorbmark: {
    type: String,
    default: "visible",
  },
  Pidzora: {
    type: String,
    default: "visible",
  },
  Pwrafuthen: {
    type: String,
    default: "visible",
  },
  Pgorene: {
    type: String,
    default: "visible",
  },
  Pyitanada: {
    type: String,
    default: "visible",
  },
  Pqaevia: {
    type: String,
    default: "visible",
  },
});

// plugin
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
// capital U in User model

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Homepage
app.get("/", (req, res) => res.render("homepage"));
app.get("/about", (req, res) => res.render("aboutpage"));
app.get("/hinstruction", (req, res) => res.render("instructionpage"));

app.get("/login", (req, res) => {
  res.render("loginpage");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/ginstruction/:userId", (req, res) => {
  const userId = req.params.userId;
  res.render("gameinstructionpage",{userId: userId})}
);

app.get("/game/:userId", (req, res) => {
  // console.log("from game route " + req.user);
  if (req.isAuthenticated()) {
    const userId = req.params.userId;
    // console.log(userId + " userID");
    User.findOne(
      {
        _id: userId,
      },
      (err, foundUser) => {
        if (err) console.log(err);
        else {
          res.render("game", {
            bon1: foundUser.bon1,
            bon2: foundUser.bon2,
            bon3: foundUser.bon3,
            user: foundUser,
            userId: foundUser._id,
            username: foundUser.username,
            countries: foundUser.countries,
            armySize: foundUser.armySize,
            silven: foundUser.Psilven,
            etherion: foundUser.Petherion,
            arthora: foundUser.Parthora,
            danera: foundUser.Pdanera,
            miorbmark: foundUser.Pmiorbmark,
            idzora: foundUser.Pidzora,
            wrafuthen: foundUser.Pwrafuthen,
            gorene: foundUser.Pgorene,
            yitanada: foundUser.Pyitanada,
            qaevia: foundUser.Pqaevia,
          });
        }
      }
    );
  } else {
    res.render("loginpage");
  }
});

app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, User) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          const userId = User._id;
          res.redirect("/game/" + userId);
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) console.log(err);
    else {
      passport.authenticate("local")(req, res, () => {
        User.findOne({username: req.body.username}, (err,foundUser)=>{
          res.redirect("/game/" + foundUser._id);
        })
      });
    }
  });
});

app.post("/game/:userId",(req,res)=>{
  var buttonName = req.body.btn;
  const userId = req.body.userId;

  if(buttonName==="bon1"){
    
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{

        let bonus1 = req.body.bonus1;
        let armySize = found.armySize;
        let bon1 = found.bon1;
        if (bonus1 == 4) {
          armySize = armySize + 100;
        }
        bon1 = "bon1";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, bon1: bon1},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from bonus1");
        res.redirect("/game/" + userId);

      }
    });
  }

  else if(buttonName==="bon2"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let bonus2 = req.body.bonus2;
        let armySize = found.armySize;
        let bon2 = found.bon2;
        if (bonus2 == 4) {
          armySize = armySize + 100;
          // console.log("chalgya");
        }
        // console.log("yeh wala " + armySize);
        bon2 = "bon2";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, bon2: bon2},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from bonus2");
        res.redirect("/game/" + userId);

        
      }
    });
  }
  else if(buttonName==="bon3"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let bonus3 = req.body.bonus3;
        let armySize = found.armySize;
        let bon3 = found.bon3;
        if (bonus3 == 4) {
          armySize = armySize + 100;
          // console.log("chalgya");
        }
        // console.log("yeh wala " + armySize);
        bon3 = "bon3";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, bon3: bon3},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from bonus3");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="etherion"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let etherion = req.body.etherion;
        let armySize = found.armySize;
        let countries = found.countries;
        let Petherion = found.Petherion;
        if (etherion == 4) {
          armySize = armySize + 400;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Petherion = "Petherion";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries, Petherion:Petherion},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from etherion");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="silven"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        
        let silven = req.body.silven;
        let armySize = found.armySize;
        let countries = found.countries;
        let Psilven = found.Psilven;
        if (silven == 4) {
          armySize = armySize + 350;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Psilven = "Psilven";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize,countries: countries, Psilven:Psilven},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from silven");
        res.redirect("/game/" + userId);


      }
    });
  }
  else if(buttonName==="gorene"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        
        let gorene = req.body.gorene;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pgorene = found.Pgorene;
        if (gorene == 4) {
          armySize = armySize + 200;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pgorene = "Pgorene";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries, Pgorene:Pgorene},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from gorene");
        res.redirect("/game/" + userId);


      }
    });
  }
  else if(buttonName==="yitanada"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        
        let yitanada = req.body.yitanada;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pyitanada = found.Pyitanada;
        if (yitanada == 4) {
          armySize = armySize + 500;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pyitanada = "Pyitanada";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries, Pyitanada:Pyitanada},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from yitanada");
        res.redirect("/game/" + userId);


      }
    });
  }
  else if(buttonName==="danera"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let danera = req.body.danera;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pdanera = found.Pdanera;
        if (danera == 4) {
          armySize = armySize + 150;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pdanera = "Pdanera";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries, Pdanera:Pdanera},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from danera");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="arthora"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let arthora = req.body.arthora;
        let armySize = found.armySize;
        let countries = found.countries;
        let Parthora = found.Parthora;
        if (arthora == 4) {
          armySize = armySize + 250;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Parthora = "Parthora";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries,Parthora:Parthora},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from arthora");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="miorbmark"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
       
        let miorbmark = req.body.miorbmark;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pmiorbmark = found.Pmiorbmark;
        if (miorbmark == 4) {
          armySize = armySize + 450;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pmiorbmark = "Pmiorbmark";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries: countries, Pmiorbmark:Pmiorbmark},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from miorbmark");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="idzora"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let idzora = req.body.idzora;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pidzora = found.Pidzora;
        if (idzora == 4) {
          armySize = armySize + 250;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pidzora = "Pidzora";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries: countries, Pidzora:Pidzora},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from idzora");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="qaevia"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let qaevia = req.body.qaevia;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pqaevia = found.Pqaevia;
        if (qaevia == 4) {
          armySize = armySize + 350;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pqaevia = "Pqaevia";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries: countries, Pqaevia:Pqaevia},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from qaevia");
        res.redirect("/game/" + userId);

      }
    });
  }
  else if(buttonName==="wrafuthen"){
    User.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        
        let wrafuthen = req.body.wrafuthen;
        let armySize = found.armySize;
        let countries = found.countries;
        let Pwrafuthen = found.Pwrafuthen;
        if (wrafuthen == 4) {
          armySize = armySize + 300;
          countries = countries + 1;
          // console.log("chalgya");
        }
        else {
          armySize = armySize - 100
        }
        // console.log("yeh wala " + armySize);
        Pwrafuthen = "Pwrafuthen";
        User.findOneAndUpdate(
          { _id: userId },
          { armySize: armySize, countries:countries, Pwrafuthen:Pwrafuthen},
          { new: true },(err,found)=>{
            if(err) console.log(err)
            // else{
            //   console.log(found.bon1, found.armySize);
            // }
          }
        );
        // console.log(userId + " from wrafuthen");
        res.redirect("/game/" + userId);

      }
    });
  }
});
// Logout

app.get("/endpage", (req, res) => {
  req.logout();
  res.render("endpage");
});

let PORT = process.env.PORT;
if (PORT == null || PORT == "") PORT = 3000;

app.listen(PORT, () => {
  console.log(`set up at ${PORT}`);
});
