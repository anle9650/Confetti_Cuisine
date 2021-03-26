"use strict";

const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  errorController = require("./controllers/errorController");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  {useNewUrlParser: true}
);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/", homeController.showHome);
app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
