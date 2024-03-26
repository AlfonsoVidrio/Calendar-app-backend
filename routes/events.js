/*
    Event Routes
    /api/events
*/
import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from '../middlewares/field-validator.js';
import { isDate } from '../helpers/isDate.js';
import { validateJWT } from '../middlewares/jwt-validator.js';
import { addEvent, getEvent, updateEvent, deleteEvent } from "../controllers/events.js";

const router = Router();
router.use( validateJWT );

// // Obtener eventos
router.get('/', getEvent);

// // crear un nuevo evento
router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        fieldValidator
    ],
    addEvent);

// // actualizar evento
router.put('/:id', updateEvent);

// // eliminar evento
router.delete('/:id', deleteEvent);

export default router;