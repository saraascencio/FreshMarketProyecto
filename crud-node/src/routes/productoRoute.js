const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


router.get('/', productoController.getAllProducts);
router.delete("/:id", productoController.eliminarProducto);
module.exports = router;
