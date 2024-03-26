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

export const updateEvent = (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'actualizar eventos'
    })
}

export const deleteEvent = (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'eliminar eventos'
    })
}



