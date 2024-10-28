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

    async crearProducto(req, res) {
        try {
            const producto = await productoService.crearProducto(req.body);
            res.status(201).json(producto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const productoId = req.params.id;
            const producto = await productoService.obtenerProductoId(productoId);
            res.status(200).json(producto); 
        } catch (error) {
            res.status(404).json({ error: error.message }); 
        }
    }

    async actualizarProducto(req, res) {
        const productId = req.params.id;  
        let updatedData = req.body;     
    
        try {
            if (updatedData.prod_fechavencimiento) {
                updatedData.prod_fechavencimiento = new Date(updatedData.prod_fechavencimiento);
            }
    
            const productoActualizado = await productoService.actualizarProducto(productId, updatedData);
    
            if (!productoActualizado) {
                return res.status(404).json({ error: "Producto no encontrado o no actualizado." });
            }
    
            res.json(productoActualizado); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }


}

module.exports = new ProductoController();
