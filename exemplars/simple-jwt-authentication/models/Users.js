const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  firstname: String,
  lastname: String,
  companyId: Number,
  password: String,
  positionTitle: String,
  companyName: String,
  isManager: Boolean,
  employeeId: Number,
  email: String,
  startDate: Date,
});

UsersSchema.methods.isValidPassword = async function (password) {
  const user = this;

  return password === user.password;
};

UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
};

UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

mongoose.model("Users", UsersSchema, "Users");
