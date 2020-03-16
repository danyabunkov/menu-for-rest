const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/UsersOrder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const orderSchema = new Schema({
  username: {
    type: String,
    minlength: 3
  },
  table: {
    type: String
  },
  item: {
    name:String,
    value:String,
  },
  date:String,
});

const Order = model("Order", orderSchema);
module.exports = model("Order", orderSchema);
