const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Mascota = require('../models/mascota');
const bcrypt = require('bcryptjs');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({ id });
    if (existeMascota) {
        throw new Error(`La mascota con el ${id} no existe`);
    }
}

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El role ${role} no existe en base de datos.`)
    }
}
/*
const existeUsuarioByCorreo = async (correo = '', password = '') => {
    const existeUsuario = await Usuario.findOne({ correo });

    if (!existeUsuario) {
        throw new Error(`El correo ${correo} no esta registrado`);
    }

    const isPasswordValid = await bcrypt.compare(password, existeUsuario.password);

    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    return existeUsuario;
};
*/
module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeMascotaById
}