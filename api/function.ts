import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ route: 'function' });
});

export = routes;
