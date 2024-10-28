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

 
};

export default CrearProducto;
