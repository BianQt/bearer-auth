'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {
console.log('++++++++++', req.headers.authorization);
  if (!req.headers.authorization) { return _authError(); }
 
  let basic = req.headers.authorization.split(" ");
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString);
  let [username, pass] = decodedString.split(":");
  console.log('signIn', username, pass);

  try {
    req.user = await users.authenticateBasic(username, pass)
    console.log('uuuuuuuuuuuuu',req.user);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

