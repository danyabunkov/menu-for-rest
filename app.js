const express = require("express");
const exphbs = require('express-handlebars');
const session = require("express-session");
const indexRouter = require("./routes/index");
const restaurantRouter = require("./routes/restaurant");
const interOrdersRouter = require("./routes/interOrders");
require('./ws');

const app = express();
const hbs = exphbs.create({

});

app.use(
  session({
    secret: "anvisernvnpivnpoerongpiqurnvvpiuq",
    saveUninitialized: false,
    resave:true,
    
  })
);
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// app.use((req, res, next) => {
//   const { user } = req.session;
//   if (user) {
//  return  res.redirect('/restaurant')
//   } else {
//     return res.redirect('/')
//   }
// });

app.use("/restaurant", restaurantRouter);
app.use("/interOrders", interOrdersRouter);

app.listen(3000);
