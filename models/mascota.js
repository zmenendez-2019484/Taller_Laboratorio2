const { Schema, model} = require('mongoose');

const MascotaSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    },
    edad:{
        type: Number,
        required: [true, 'La edad es obligatoria']
    }
});

module.exports = model('Mascota', MascotaSchema);