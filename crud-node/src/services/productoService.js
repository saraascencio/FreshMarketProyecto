const Producto = require('../models/producto'); 
const Inventario = require('../models/inventario'); 

class ProductoService {
    async getAllProducts() {
        try {
            
            const productos = await Producto.find();
            if (productos.length === 0) {
                return [];
            }
            const productosConInventario = await Promise.all(productos.map(async (producto) => {
                const inventario = await Inventario.findOne({ idProducto: producto._id });
                return {
                    ...producto.toObject(),
                    inv_cantidad: inventario ? inventario.inv_cantidad : 0,
                };
            }));
            return productosConInventario;
        } catch (error) {
        
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    async eliminarProducto(productId) {
        try {
      
            const inventarioEliminado = await Inventario.findOneAndDelete({ idProducto: productId });
            const productoEliminado = await Producto.findByIdAndDelete(productId);

        
            if (!productoEliminado) {
                throw new Error(`Producto con ID ${productId} no encontrado.`);
            }

           
            return {
                mensaje: `Producto con ID ${productId} eliminado exitosamente.`,
                inventarioEliminado: inventarioEliminado ? inventarioEliminado : null,
            };
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

 
}

module.exports = new ProductoService();
