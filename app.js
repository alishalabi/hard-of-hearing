// Initalize
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const mongoose = require('mongoose');

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/hard-of-hearing')

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

app.get("/users", function (req, res) {
  res.render("users-index", { users: users});
})



app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
