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

    async crearProducto(data) {
        try {
            const { product_inv_cantidad, ...productoData } = data;

            const nuevoProducto = await Producto(productoData).save(); 
            await Inventario({
                idProducto: nuevoProducto._id,
                inv_cantidad:product_inv_cantidad,
                inv_fechactualizacion: new Date(),
            }).save(); 

            return nuevoProducto;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async obtenerProductoId(productId) {
        try {
      
            const producto = await Producto.findById(productId);
            if (!producto) {
                throw new Error(`Producto con ID ${productId} no encontrado.`);
            }
    
            const inventario = await Inventario.findOne({ idProducto: productId });
            return {
                ...producto.toObject(),
                product_inv_cantidad: inventario ? inventario.inv_cantidad : 0
            };
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }


    async actualizarProducto(productId, updatedData) {
        try {
            const { product_inv_cantidad, ...productoData } = updatedData;
    
         
            const productoActualizado = await Producto.findByIdAndUpdate(
                productId,
                productoData, 
                { new: true, runValidators: true }
            );
    
            if (!productoActualizado) {
                throw new Error(`Producto con ID ${productId} no encontrado.`);
            }
    
            const inventarioActualizado = await Inventario.findOneAndUpdate(
                { idProducto: productId }, 
                { 
                    inv_cantidad: product_inv_cantidad,
                    inv_fechactualizacion: new Date()
                },
                { new: true, upsert: true } 
            );
    
            return { producto: productoActualizado, inventario: inventarioActualizado };
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

 
    async getProductByLote(lote) {
        try {
    
            const producto = await Producto.findOne({ prod_lote: lote });
    
    
            if (!producto) {
                return null;
            }
    
    
            const inventario = await Inventario.findOne({ idProducto: producto._id });
    
            return {
                ...producto.toObject(), 
                inv_cantidad: inventario ? inventario.inv_cantidad : 0, 
            };
        } catch (error) {
            throw new Error('Error al obtener el producto por lote: ' + error.message);
        }
    }
}

module.exports = new ProductoService();
