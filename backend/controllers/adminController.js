const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminRegistration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin
      .save()
      .then(() => {
        res.status(201).json({ message: "Admin registered successfully" });
      })
      .catch((err) => {
        console.log(`Registration failed ${err}`);
        res.status(500).json({ message: "Error in saving admin details" });
      });
  } catch (err) {
    console.log(`Internal error ${err}`);
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin && bcrypt.compareSync(password, admin.password)) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { adminRegistration, adminLogin };
