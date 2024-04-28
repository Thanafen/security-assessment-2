const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    //Get the email and pw of the req body
    const { email, password } = req.body;
    //Create a user with the data
    const hashedPassword = bcrypt.hashSync(password, 8);

    await User.create({ email, password: hashedPassword });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the requested email
    const user = await User.findOne({ email });

    if (!user) return res.sendStatus(400);
    // Compare sent-in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.sendStatus(401); // Unauthorized - incorrect password
    }

    // Create a JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    })

    // Send JWT token
    res.sendStatus(200);
}


function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch {
    console.log(err);
    res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
