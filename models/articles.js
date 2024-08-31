const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const articleSchema = new Schema({
  name: String,
  description: String,
  number: Number,
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
