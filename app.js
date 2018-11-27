// Initalize
const express = require("express")
const methodOverride = require("method-override")
const app = express()
const exphbs = require("express-handlebars")
const mongoose = require('mongoose');
const bodyParser = require('body-parser') // Required for POST methods
const eventbrite = require("eventbrite")
// const config = require("./config");
// const eventKey = config.OAuth_key
// const sdk_event = eventbrite({ token : eventKey})

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/hard-of-hearing')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static('public'))

// Controllers
require("./controllers/users")(app)
require("./controllers/phrases")(app)
require("./controllers/categories")(app)

// Landing page
app.get("/", (req, res) => {
  res.render("home")
})

// // Testing Eventbrite API
// app.get("/test", (req, res) => {
//
// })
// sdk_event.request()

// Listening port
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
