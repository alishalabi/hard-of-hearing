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

  //HTTP Request: Update

  //HTTP Request: Delete

}
