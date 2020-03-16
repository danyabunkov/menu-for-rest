const fetch = require("node-fetch");
const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const { protectionMiddleware } = require("../middlewears/protection");

router.get("/", protectionMiddleware, async (req, res) => {
  

  const results = await Promise.all(
    ['restaurant', 'dailymenu'].map(x => fetch(
      `https://developers.zomato.com/api/v2.1/${x}?res_id=16507624`,
      {
        headers: {
          Accept: "application/json",
          "user-key": "d5855bed5000f622e5b32d6f327b5d91"
        }
      }
    ))
  );
  const [json, json2] = await Promise.all(results.map(el=>el.json()));


  // const {
  //   name,
  //   timings,
  //   price_range,
  //   highlights,
  //   all_reviews_count,
  //   phone_numbers,
  // }= json;
  // const location= json.location.address
  // const user_rating = json.user_rating.aggregate_rating;

  const { daily_menus } = json2;
  const user = await User.findOne({ _id: req.session.user });
  let items = 0;
  let cost = 0;
  if (user.items.length != 0) {
    user.items.forEach(el => {
      items += +el.value;
      const string = el.cost.slice(0, el.cost - 2);
      cost += +el.value * +string;
    });
  }
  //
  res.render("restaurant", { daily_menus, json, items, cost });
});

router.post("/order", async (req, res) => {
  const { quantity, nameoffood, price } = req.body;
  const cost = price.slice(0, price.length - 2);
  let order = {
    name: nameoffood,
    value: quantity,
    cost,
    maincost: +quantity * +cost,
    date: new Date(Date.now()).toString()
  };
  await User.updateOne({ _id: req.session.user }, { $push: { items: order } });
  const user = await User.findOne({ _id: req.session.user });
  const newOrder = new Order({
    username: user.username,
    table: user.table,
    item: { name: nameoffood, value: quantity },
    date: order.date
  });
  await newOrder.save();
  res.json([user, newOrder]);
});

router.get("/basket", protectionMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.session.user });
  res.json(user);
});

module.exports = router;
