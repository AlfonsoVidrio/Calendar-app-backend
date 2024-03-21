/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
import { Router } from 'express';
import { addUser,loginUser,renewToken } from '../controllers/auth.js';

const router = Router();

router.post('/register', addUser);
router.post('/',loginUser)
router.get('/renew',renewToken)

export default router;