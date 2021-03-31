require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
require("../models/Images");
const Images = mongoose.model("Images");

mongoose.connect(process.env.dblink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

app.get("/getImage", async (req, res) => {
  Images.findOne({ name: req.query.query }, async (err, image) => {
    if (image === null) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${req.query.query}`
      );
      newImage = new Images({
        name: req.query.query,
        results: JSON.stringify(response.data),
      });
      newImage.save();
      res.send(response.data);
    } else {
      res.send(JSON.parse(image.results));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
