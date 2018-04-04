import Express from 'express';

const router = Express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/status', (req, res) =>
    res.send('OK')
);


export default router;