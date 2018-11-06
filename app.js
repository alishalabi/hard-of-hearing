// Initalize
const express = require("express")
const methodOverride = require("method-override")
const app = express()
const exphbs = require("express-handlebars")
const mongoose = require('mongoose');
const bodyParser = require('body-parser') // Required for POST methods

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/hard-of-hearing')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// Controllers
const users = require("./controllers/users")(app)

// Landing page
app.get("/", (req, res) => {
  res.render("home")
})


// Listening port
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
