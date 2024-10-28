const productoService = require("../services/productoService");

class ProductoController {
    async getAllProducts(req, res) {
        try {
            const productos = await productoService.getAllProducts();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async eliminarProducto(req, res) {
        try {
            const productId = req.params.id; 
            const resultado = await productoService.eliminarProducto(productId); 
            res.status(200).json(resultado); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }


}

module.exports = new ProductoController();
