import express from 'express';
import { createUrl, getAllUrl, getUrl, deleteUrl } from '../controllers/shortUrl';

const router = express.Router();

router.post('/shorturl', createUrl);
router.get('/shorturl', getAllUrl);
router.get('/shorturl/:id', getUrl);
router.delete('/shorturl/:id', deleteUrl);

export default router;