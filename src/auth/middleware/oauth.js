'use strict';
// After Login Form 

// should be in dotenv.
const superagent = require('superagent');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

let CLIENT_ID = process.env.CLIENT_ID || '968394370633263';
let CLIENT_SECRET = process.env.CLIENT_SECRET || 'f45b61bf5d51f2f43fdc62d54aa97b7e';


let SECRET = process.env.SECRET || 'mysecret';

let tokenUrl = 'https://graph.facebook.com/v10.0/oauth/access_token?';
let userUrl = 'https://graph.facebook.com/me';

module.exports = async (req, res, next) => {
  // 2. Users are redirected back to your site by facebook
  console.log('query object: ', req.query);
  const code = req.query.code;
  console.log('AFTER FORM 1.CODE ======== ', code);
  const token = await exchangeCodeWithToken(code);
  console.log('AFTER FORM 2.TOKEN ======== ', token);
  // 3. Use the access token to access the user API
  let remoteUser = await exchangeTokenWithUserInfo(token);
  console.log('AFTER FORM 3.USER ======== ', remoteUser);
  let [localUser, localToken] = await getLocalUser(remoteUser);
  req.user = localUser;
  req.token = localToken;
  next();
};

async function exchangeCodeWithToken(code) {
  // tokenUrl + params
  // response : token from github
  try {
    const tokenResponse = await superagent.post(tokenUrl).send({
      client_id:CLIENT_ID,
      redirect_uri:'http://localhost:3000/oauth',
      client_secret:CLIENT_SECRET,
      code:code,
    });
    console.log('tokenResponse.body', tokenResponse.body);
    return tokenResponse.body.access_token;
  } catch(err) {
    console.log(err);
  }
}

async function exchangeTokenWithUserInfo(token) {
  try {
    const userInfo = await superagent.get(userUrl).set({
      'Authorization': `token ${token}`,
      'User-Agent': 'Rawan/1.0',
    });
    return userInfo.body;
  } catch(err) {
    console.log(err);
  }
}

async function getLocalUser(userObj) {
  try {
    let userRecord = {
      username: userObj.login,
      password: 'oauth', 
    };
    let newUser = new userModel(userRecord);
    let user = await newUser.save();
    let token = jwt.sign({username: user.username}, SECRET);
    return [user, token];
  }catch(err) {
    console.log(err);
  }
}