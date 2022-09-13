/* eslint-disable consistent-return */
import { createAcronymSchema, editAcronymSchema } from './acronmyValidators';
import { Token } from '../core/utils';
import {isExistItem} from '../core/acronyms.model';

const validateAcronym = async (req, res, next) => {
  try {
    // eslint-disable-next-line default-case
    switch (req.method) {
      case 'POST':
        await createAcronymSchema.validateAsync({ ...req.body });
        break;
      case 'PUT':
        await editAcronymSchema.validateAsync({ ...req.body });
        break;
    }
    next();
  } catch (error) {
    return res.status(400).json(error.message.replace(/"/g, ''));
  }
};

const acronymExists = async (req, res, next) => {
  try {

    const item = await isExistItem([req.params.acronym]);
    
    if (item === undefined) {
      return res.status(404).json({
        status: 404,
        message: 'Acronym does not exist',
      });
    }
    // eslint-disable-next-line prefer-destructuring
    req.acronym = item;
    next();
  } catch (error) {
    return res.status(500);
  }
};

const tokenProvided = (req, res, next) => {
  console.log("this is ", req.headers.authorization)
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: 403,
      message: 'Token not provided',
    });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = Token.verifyToken(bearerHeader, process.env.secretkey);
    if (decodedToken) next();
    // eslint-disable-next-line prefer-destructuring
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export { validateAcronym, acronymExists, tokenProvided, verifyToken };
