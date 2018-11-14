const Phrase = require("../models/phrase")

module.exports = function (app) {

  //HTTP Request: Index
  app.get("/phrases", (req, res) => {
    Phrase.find()
      .then(phrases => {
        res.render("phrases-index", { phrases: phrases });
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  //HTTP Request: New
  app.get("/phrases/new", (req, res) => {
    res.render("phrases-new", {});
  })

  //HTTP Request: Create
  app.post("/phrases", (req, res) => {
    Phrase.create(req.body)
      .then(phrase => {
        res.redirect(`/phrases/${phrase._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  //HTTP Request: Show
  app.get("/phrases/:id", (req, res) => {
    Phrase.findById(req.params.id)
      .then((phrase) => {
        res.render("phrases-show", { phrase: phrase })
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  //HTTP Request: Edit
  app.get("/phrases/:id/edit", (req, res) => {
    // Phrase.findById(req.params.id)
    //   .then((phrase) => {
    //     res.render("phrases-edit", { phrase: phrase })
    //   })
    Phrase.findById(req.params.id, function(err, phrase) {
      res.render("phrases-edit", { phrase: phrase })
    })
  })

  //HTTP Request: Update
  app.put("/phrases/:id", (req, res) => {
    Phrase.findByIdAndUpdate(req.params.id, req.body)
      .then(phrase => {
        res.redirect(`/phrases/${phrase._id}`)
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  //HTTP Request: Delete
  app.delete("/phrases/:id", (req, res) => {
    console.log("DELETE phrase")
    Phrase.findByIdAndRemove(req.params.id)
      .then(phrase => {
        res.redirect("/phrases")
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

}
