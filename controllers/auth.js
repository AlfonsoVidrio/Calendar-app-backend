import { validationResult } from "express-validator";

export const addUser = (req, res) => {

    const { name, email, password } = req.body;

    // manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    })
}

export const loginUser = (req, res) => {

    const { email, password } = req.body;

    // manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }


    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

export const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}