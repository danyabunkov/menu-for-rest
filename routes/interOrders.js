const router = require("express").Router();
const Order = require('../models/order');



router.get('/', (req, res) => {
  res.render("interOrders",{layout:false});
});



module.exports = router;
