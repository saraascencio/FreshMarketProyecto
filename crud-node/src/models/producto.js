const { mongoose } = require('../configuration/dbConfig');

const productoSchema = new mongoose.Schema({
    prod_lote: {
        type: Number,
    },
    prod_nombre: {
        type: String,
    },
    prod_categoria: {
        type: String,
    },
    prod_descripcion: {
        type: String,
    },
    prod_fechavencimiento: {
        type: Date,
    },
    prod_ingredientes: {
        type: [String],
    },
    prod_paquete: {
        type: [Number],
    },
    prod_disponibilidad: {
        type: String
    }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
