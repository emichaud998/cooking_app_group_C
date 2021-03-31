const mongoose = require("mongoose");

const { Schema } = mongoose;

const ImagesSchema = new Schema({
  name: String,
  results: String,
});

ImagesSchema.methods.getResult = async function () {
  return this.results;
};

mongoose.model("Images", ImagesSchema, "images");
