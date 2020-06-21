const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./auth-models");

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);

  password = hash;

  try {
    const user = await db.add({ username, password });
    const token = getJwtToken(user);

    res.status(201).json({ ...user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register the user" });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await db.getBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  }
});

function getJwtToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "a3289rh3298fdn2983hj2nf90-9-n@!)@0";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
