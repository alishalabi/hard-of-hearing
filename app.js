// Initalize
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const mongoose = require('mongoose');
const bodyParser = require('body-parser') // Required for POST methods

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/hard-of-hearing')
app.use(bodyParser.urlencoded({ extended: true }))

// // Mock array for testing
// let users = [
//   { name: "Alex", bio: "Hard of hearing ally"},
//   { name: "Bert", bio: "Loves Korean food"}
// ]

// Models
const User = mongoose.model("User", {
  name: String,
  bio: String
})


// HTTP Request: Index
app.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.render("users-index", { users: users});
    })
    .catch(err => {
      console.log(err);
    })
})

// HTTP Request: New
app.get("/users/new", (req, res) => {
  res.render("users-new", {});
})

// HTTP Request: Create
app.post("/users", (req, res) => {
  // console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err.message)
    })
})


app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
