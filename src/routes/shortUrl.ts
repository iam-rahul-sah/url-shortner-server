import express from 'express';

const router = express.Router();

router.post('/shorturl', createUrl);
router.get('/shorturl', getAllUrl);
router.get('/shorturl/:id', getUrl);
router.delete('/shorturl/:id', deleteUrl);

export default router;