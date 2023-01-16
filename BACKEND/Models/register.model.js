const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: String,
  email: { type: String, require: true },
  gender: String,
  password: { type: String, require: true },
});

const RegisterModel = mongoose.model("user", registerSchema);

module.exports = {
  RegisterModel,
};
