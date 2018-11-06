const User = require("../models/user")


module.exports = function (app) {

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
        res.redirect(`/users/${user._id}`);
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP Request: Show
  app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        res.render("users-show", { user: user })
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  // HTTP Request: Edit
  app.get("/users/:id/edit", (req, res) => {
    User.findById(req.params.id, function(err, user) {
      res.render("users-edit", { user: user })
    })
  })

  // HTTP Request: Update
  app.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        res.redirect(`/users/${user._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // HTTP Request: Delete
  app.delete("/users/:id", (req, res) => {
    console.log("DELETE user")
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        res.redirect("/users")
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

}
