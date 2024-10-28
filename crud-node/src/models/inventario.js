const { mongoose } = require('../configuration/dbConfig');

const inventarioSchema = new mongoose.Schema({
    idProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
    },
    inv_cantidad: {
        type: Number,
    },
    inv_fechactualizacion: {
        type: Date,
    }
});

const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;
