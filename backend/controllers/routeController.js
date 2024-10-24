const jwt = require("jsonwebtoken");

const loadDashboard = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    res.json({ message: "Welcome to the dashboard", userId: decoded.id });
  });
};

module.exports = { loadDashboard };
