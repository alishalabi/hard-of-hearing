const Phrase = require("../models/phrase")

module.exports = (app) => {

  // HTTP Protocol: Index All Categories
  app.get("/categories", (req, res) => {
    res.render("category-index")
  })

  // HTTP Protocol: Show One Category
  app.get("/categories/:category", (req, res) => {
    Phrase.find({ category: req.params.category})
      .then(phrases => {
        res.render("phrases-index", { phrases})
      })
      .catch(err => {
        console.log(err);
      })
  })
}
