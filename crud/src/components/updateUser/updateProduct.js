import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormLabel } from "react-bootstrap";
import "../postUser/postUser.css";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prod_lote: "",
    prod_nombre: "",
    prod_categoria: "", 
    prod_descripcion: "", 
    prod_fechavencimiento: "", 
    prod_ingredientes: "", 
    prod_paquete: "", 
    prod_disponibilidad: "", 
    product_inv_cantidad: "", 
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/producto/${id}`);
        const data = await response.json();
        
        if (data.prod_fechavencimiento) {
          const fecha = new Date(data.prod_fechavencimiento);
          const fechaFormateada = fecha.toISOString().split('T')[0]; 
          data.prod_fechavencimiento = fechaFormateada;
        }

        setFormData({
          prod_lote: data.prod_lote || "",
          prod_nombre: data.prod_nombre || "",
          prod_categoria: data.prod_categoria || "",
          prod_descripcion: data.prod_descripcion || "",
          prod_fechavencimiento: data.prod_fechavencimiento || "",
          prod_ingredientes: data.prod_ingredientes ? data.prod_ingredientes.join(", ") : "",
          prod_paquete: data.prod_paquete ? data.prod_paquete.join(", ") : "",
          prod_disponibilidad: data.prod_disponibilidad || "",
          product_inv_cantidad: data.product_inv_cantidad || "",
        });
      } catch (error) {
        console.log("error al cargar el producto:", error.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    const updatedFormData = {
        ...formData,
        prod_ingredientes: formData.prod_ingredientes.split(",").map(item => item.trim()),
        prod_paquete: formData.prod_paquete.split(",").map(item => item.trim()),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/producto/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="center-form">
        <h1 className="mt-4">Actualizar Producto</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLote">
            <FormLabel>Lote</FormLabel>
            <Form.Control
              type="number"
              name="prod_lote"
              placeholder="Ingrese el lote"
              value={formData.prod_lote}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formNombre">
            <FormLabel>Nombre</FormLabel>
            <Form.Control
              type="text"
              name="prod_nombre"
              placeholder="Ingrese el nombre"
              value={formData.prod_nombre}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategoria">
            <FormLabel>Categoría</FormLabel>
            <Form.Control
              type="text"
              name="prod_categoria"
              placeholder="Ingrese la categoría"
              value={formData.prod_categoria}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <FormLabel>Descripción</FormLabel>
            <Form.Control
              type="text"
              name="prod_descripcion"
              placeholder="Ingrese la descripción"
              value={formData.prod_descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formFechaVencimiento">
            <FormLabel>Fecha de Vencimiento</FormLabel>
            <Form.Control
              type="date"
              name="prod_fechavencimiento"
              value={formData.prod_fechavencimiento}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formIngredientes">
            <FormLabel>Ingredientes</FormLabel>
            <Form.Control
              type="text"
              name="prod_ingredientes"
              placeholder="Ingrese los ingredientes separados por coma"
              value={formData.prod_ingredientes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPaquete">
            <FormLabel>Paquete</FormLabel>
            <Form.Control
              type="text"
              name="prod_paquete"
              placeholder="Ingrese los tamaños del paquete separados por coma"
              value={formData.prod_paquete}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDisponibilidad">
            <FormLabel>Disponibilidad</FormLabel>
            <Form.Control
              type="text"
              name="prod_disponibilidad"
              placeholder="Ingrese la disponibilidad"
              value={formData.prod_disponibilidad}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCantidad">
            <FormLabel>Cantidad</FormLabel>
            <Form.Control
              type="number"
              name="product_inv_cantidad"
              placeholder="Ingrese la cantidad"
              value={formData.product_inv_cantidad}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 button-gradient">
            Actualizar Producto
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
