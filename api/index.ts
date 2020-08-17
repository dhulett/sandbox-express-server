import express from 'express';

import func from './function';
import storage from './storage';

const router = express.Router();

router.use('/func', func);
router.use('/storage', storage);

export = router;
