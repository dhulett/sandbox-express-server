import { Router } from 'express';

const routes = Router();

const storage: { data: any; } = {
    data: null,
};

routes.get('/', (req, res) => {
    res.json(storage.data);
});

routes.post('/', (req, res) => {
    storage.data = req.body;
    res.json(storage.data);
});

routes.delete('/', (req, res) => {
    storage.data = null;
    res.json(storage.data);
});

export = routes;
