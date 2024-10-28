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

 
};

export default UpdateUser;
