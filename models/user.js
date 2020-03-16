const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/UsersOrder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3
  },
  table: {
    type: String
  },
  items: Array,
      // name: String,
      // value: {
      //   type: String,
      //   minlength: 1
      // },
      // cost:Number,
  

});

const User = model("User", userSchema);
module.exports = model("User", userSchema);
