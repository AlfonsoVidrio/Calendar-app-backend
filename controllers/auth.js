import User from '../models/User.js';

export const addUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: 'Un usuario existe con ese correo'
        });

        console.log(user)
        // const user = new User( req.body );

        // await user.save();

        res.status(201).json({
            ok: true,
            msg: 'register'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el usuario'
        })
    }
}

export const loginUser = (req, res) => {

    const { email, password } = req.body;

    // manejo de errores


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