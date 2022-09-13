import { Pool } from 'pg';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
env.config();

class Token {
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.secretkey);
    return token;
  }

  static verifyToken(token) {
    const payload = jwt.verify(token, process.env.secretkey);
    return payload;
  }
}

export {  Token };
