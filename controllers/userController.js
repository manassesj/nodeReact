const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

process.env.SECRET_KEY = "secret";

module.exports = {
  async store(req, res) {
    const today = new Date();
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today
    };

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          userData.password = hash;
          console.log(userData.password);

          try {
            const store = await User.create(userData);
            return res.send(userData);
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        return res.send("usuario ja existe");
      }
    } catch (err) {
      console.log(err);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          console.log("OLA");
          return res.send(token);
        }
      } else {
        return res.status(400).jason({ erro: "User does nor exist" });
      }
    } catch (err) {
      //return res.send(err);
    }
  }
};
