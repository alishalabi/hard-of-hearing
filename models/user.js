const mongoose = require("mongoose")

// // Mock array for testing
// let users = [
//   { name: "Alex", bio: "Hard of hearing ally"},
//   { name: "Bert", bio: "Loves Korean food"}
// ]



// User model
const User = mongoose.model("User", {
  name: String,
  bio: String
})

module.exports = User;
