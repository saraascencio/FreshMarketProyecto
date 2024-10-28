const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


router.get('/', productoController.getAllProducts);
router.post('/', productoController.crearProducto);
router.patch("/:id", productoController.actualizarProducto);
router.delete("/:id", productoController.eliminarProducto);
router.get('/:id', productoController.getProductById);
router.get('/lote/:lote', productoController.getProductByLote); 
module.exports = router;
