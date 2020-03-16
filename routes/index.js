const router = require("express").Router();
const User = require('../models/user');


function protection(req, res, next) {
  if (req.session.user) {
    return res.redirect('/restaurant');
  }
  return next();
}

router.get('/',protection, (req, res) => {
  res.render("start");
});



router.post('/session',async (req,res)=>{
 const {username,table} = req.body;
 const user = new User({username,table})
 await user.save();
 req.session.user=user._id;
 res.redirect('/restaurant')
})

module.exports = router;
