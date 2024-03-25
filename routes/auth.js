/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { addUser,loginUser,renewToken } from '../controllers/auth.js';
import { fieldValidator } from '../middlewares/field-validator.js';

const router = Router();

router.post('/register',
[ 
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    fieldValidator
],
addUser);


router.post('/',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    fieldValidator
],
loginUser)
router.get('/renew',renewToken)

export default router;