const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


router.get('/', productoController.getAllProducts);
router.delete("/:id", productoController.eliminarProducto);
router.post('/', productoController.crearProducto);
router.get('/:id', productoController.getProductById);
router.patch("/:id", productoController.actualizarProducto);
module.exports = router;
