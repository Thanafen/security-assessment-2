const jwt = require("jsonwebtoken");
const user= require("../models/user");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    //Read token off cookies
    const token = req.cookies.Authorization;

    //Decode token
    const decoded = jwt.verify(token, process.env.SECRET);

    //Check that the token isn't expired
    if(Date.now() > decoded.exp) return res.sendStatus(401);

    //Find user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    //attach user to req
    req.user = user;

    //continue
    next();
  } catch (err) {
    return res.sendStatus(401); 
  }
}
module.exports = requireAuth;
