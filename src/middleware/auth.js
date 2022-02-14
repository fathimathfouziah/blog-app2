//import jwt from 'jsonwebtoken';
// import config from '../config';
const jwt=require('jsonwebtoken')
const  JWT_SECRET = "this is a secret key";

const auth= (req, res, next) => {
 // const firsttoken = req.header('Authorization');
 console.log(req.headers)
  var token = req.headers.authorization.split(' ')[1];
 
  // Check for token
  if (!token) 
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    console.log('decoding')
   
    next();
  } catch (e) {
   // console.log(decoded)
    
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
module.exports=auth


