const userSchema = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const found = await userSchema.findOne({ email });
    if (found) {
      return res.json({
        msg: "This user is already existant , please login !",
      });
    }
    const newUser = await new userSchema(req.body);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    newUser.password = hash;
    newUser.save();
    res
      .status(200)
      .json({ msg: "you are registered ! Welcome between us !", newUser });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const found = await userSchema.findOne({ email });
    if (!found) {
      return res.json({ msg: "Email not found ! Please verify or register !" });
    }
    const match = bcrypt.compare(password, found.password);
    if (!match) {
      return res.json({ msg: "Incorrect Password !" });
    }
    const payload = { id: found._id };
    var token = jwt.sign(payload, process.env.privateKey);
    res.json({ msg: "Welcome back !", found, token });
  } catch (err) {
    console.log(err);
  }
};
