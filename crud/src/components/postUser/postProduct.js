import React, { useState, useEffect } from "react"; 
import { Button, Form, FormLabel } from "react-bootstrap";
import Quagga from "quagga"; 
import "./postUser.css";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
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

  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paqueteArray = formData.prod_paquete
      .split(",")
      .map((item) => parseFloat(item.trim()))
      .filter((item) => !isNaN(item));

    const formattedData = {
      ...formData,
      prod_lote: parseInt(formData.prod_lote, 10),
    };

    if (paqueteArray.length > 0) {
      formattedData.prod_paquete = paqueteArray;
    }

    try {
      const response = await fetch("http://localhost:5000/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        throw new Error("Error al enviar el producto.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error al enviar el producto:", error.message);
    }
  };

  const startScanning = () => {
    setScanning(true);
  };

  const stopScanning = () => {
    Quagga.stop();
    setScanning(false);
  };

  useEffect(() => {
    if (scanning) {
      const targetElement = document.querySelector("#interactive");
      if (!targetElement) {
        console.error("El elemento de destino no está disponible.");
        return;
      }

      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: targetElement,
          },
          decoder: {
            readers: ["code_128_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error("Error en la inicialización de Quagga:", err);
            return;
          }
          Quagga.start();

          Quagga.onDetected(async (data) => {
            const loteEscaneado = data.codeResult.code;
            setFormData((prevData) => ({
              ...prevData,
              prod_lote: loteEscaneado,
            }));

            await fetchProductByLote(loteEscaneado);
            stopScanning();
          });
        }
      );

      return () => {
        stopScanning();
      };
    }
  }, [scanning]);

  const fetchProductByLote = async (lote) => {
    const loteNumber = Number(lote);
    if (isNaN(loteNumber)) {
      console.error("El lote debe ser un número.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/producto/lote/${loteNumber}`);
      if (!response.ok) {
        throw new Error("Error al obtener el producto. Verifique si el lote existe.");
      }
      const productData = await response.json();
      if (productData) {
        setFormData((prevData) => ({
          ...prevData,
          prod_nombre: productData.prod_nombre || "",
          prod_categoria: productData.prod_categoria || "",
          prod_descripcion: productData.prod_descripcion || "",
          prod_fechavencimiento: productData.prod_fechavencimiento
            ? productData.prod_fechavencimiento.split("T")[0]
            : "",
          prod_ingredientes: productData.prod_ingredientes
            ? productData.prod_ingredientes.join(", ")
            : "",
          prod_paquete: productData.prod_paquete
            ? productData.prod_paquete.join(", ")
            : "",
          prod_disponibilidad: productData.prod_disponibilidad || "",
          product_inv_cantidad: productData.product_inv_cantidad || 0, 
        }));
      } else {
        console.warn("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error.message);
    }
  };

  return (
    <div className="center-form position-relative">
      <h1 className="mt-4">Añadir un Producto</h1>
      {scanning && (
        <div className="scanning-box">
          <div id="interactive" style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}
      <Button onClick={startScanning} className="mb-3 button-gradient">
        Escaneo por Código de Barras
      </Button>
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
            as="textarea"
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

        <Button type="submit" className="w-100 button-gradient">
          Crear Producto
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
