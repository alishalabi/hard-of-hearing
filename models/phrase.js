const mongoose = require("mongoose")

// Phrase model
const Phrase = mongoose.model("Phrase", {
  title: String,
  content: String,
  category: String
})

module.exports = Phrase;
