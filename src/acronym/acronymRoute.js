import express from 'express';
import {
  acronyms,
  createAcronym,
  updateAcronym,
  deleteAcronym,
} from './acronymController';

import {
  validateAcronym,
  acronymExists,
  tokenProvided,
  verifyToken,
} from './acronymMiddleware';

const acronymRouter = express.Router();

acronymRouter.get('/acronym',  acronyms);

acronymRouter.post(
  '/acronym',
  validateAcronym,
  validateAcronym,
  createAcronym
);

acronymRouter.put(
  '/acronym/:acronym',
  tokenProvided,
  verifyToken,
  acronymExists,
  validateAcronym,
  updateAcronym
);

acronymRouter.delete(
  '/acronym/:acronym',
  tokenProvided,
  verifyToken,
  acronymExists,
  deleteAcronym
);

export default acronymRouter;
