import { Router } from 'express';

const route = '/example';
const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the example plugin!!');
});

module.exports = {
    route,
    router,
}
