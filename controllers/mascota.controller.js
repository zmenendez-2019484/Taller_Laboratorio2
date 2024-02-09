const { response, json } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    await Mascota.findByIdAndUpdate(id,resto);
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Mascota Actualizada exitosamente',
        mascota
    })
}

const mascotasDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByIdAndUpdate(id, { estado: false });

        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        res.status(200).json({
            msg: 'Mascota eliminada exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}


const mascotasPost = async (req, res) => {
    const { nombre, sexo, edad } = req.body;
    const mascota = new Mascota({ nombre, sexo, edad });

    await mascota.save();
    res.status(200).json({
        msg: 'Mascota creada exitosamente',
        mascota
    });
}

module.exports = {
    mascotasGet,
    getMascotaByid,
    mascotasPut,
    mascotasDelete,
    mascotasPost
}