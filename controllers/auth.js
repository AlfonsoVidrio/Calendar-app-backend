import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateJwt } from '../helpers/jwt.js';

export const addUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if ( user ) return res.status(400).json({
            ok: false,
            msg: 'Un usuario existe con ese correo'
        });

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generate JWT
        const token = await generateJwt( user.id, user.name);
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el usuario'
        })
    }
}

export const loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if ( !user ) return res.status(400).json({
            ok: false,
            msg: 'Correo electrónico incorrecto'
        });

        // confirmar password
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) return res .status(400).json({
            ok: false,
            msg: "Contraseña incorrecta"
        })

        // Generate JWT
        const token =  await generateJwt( user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al iniciar sesión'
        })
    }
}

export const renewToken =  async(req, res) => {
    const {uid, name} = req;  
    
    const token =  await generateJwt( uid, name);

    res.json({
        ok: true,
        token
    })
}