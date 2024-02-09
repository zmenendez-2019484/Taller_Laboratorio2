const { response, json } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

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
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { _id,nombre, sexo, edad , ...resto} = req.body;
    await Mascota.findByIdAndUpdate(id, resto);
    const mascota = await Usuario.findOne(id);

    res.status(200).json({
        msg: 'Mascota Actualizado exitosamente',
        mascota
    })
}

const mascotasDelete = async (req, res) => {
    const {id} = req.params;
    const mascota = await Mascota.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Mascota eliminado exitosamente'
    });
}

const mascotasPost = async (req, res) =>{
    const { nombre, sexo, edad } = req.body;
    const mascota = new Mascota({nombre, sexo, edad});

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