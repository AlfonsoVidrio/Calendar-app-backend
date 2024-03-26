import { trusted } from "mongoose";
import Event from "../models/Event.js";

export const getEvent = async(req, res) => {

    const events = await Event.find().populate('user','name');

    return res.status(200).json({
        ok: true,
        events
    })
}

export const addEvent = async (req, res) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        return res.status(200).json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar el evento'
        })
    }
}

export const updateEvent =  async (req, res) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try{

        const event = await Event.findById( eventId );

        if ( !event ){
            res.status(404).json({
                ok: false,
                msg: "No existe el evento."
            })
        }
        
        if ( event.user.toString() !== uid ) return res.status(401).json({
            ok: false,
            msg: 'No esta autorizado para editar este evento.'
        })

        const newEvent = {
            ...req.body,
            user: uid
        }
        
        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true} )

        return res.status(200).json({
            ok: true,
            event: updatedEvent
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "No se pudo actualizar el evento."
        })
    }


}

export const deleteEvent = (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'eliminar eventos'
    })
}



