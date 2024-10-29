import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, ButtonGroup, InputGroup, FormControl,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaMicrophone, FaSearch } from "react-icons/fa";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import "./dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda

  // Configuración de SpeechRecognition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/producto");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Mostrar todos los productos al inicio
    } catch (error) {
      console.log("Error while fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = (productId) => {
    navigate(`/product/${productId}`);
  };

  const normalizeText = (text) => {
    return text
      .normalize("NFD") // Descompone caracteres con diacríticos (como tildes)
      .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
      .replace(/[.,/#!$%^&*;:{}=_`~()¿¡?]/g, "") // Elimina puntuaciones
      .trim() // Elimina espacios adicionales
      .toLowerCase(); // Convierte a minúsculas
  };

  // Filtrar los productos según el término de búsqueda
  const filterProducts = (query) => {
    const normalizedQuery = normalizeText(query); // Normaliza la búsqueda
    const filtered = products.filter((product) =>
      normalizeText(product.prod_nombre).includes(normalizedQuery)
    );
    setFilteredProducts(filtered);
  };

  // Manejar búsqueda manual
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value);
  };

  // Iniciar escucha de voz
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: "es-ES" });
  };

  // Actualizar la búsqueda con la transcripción de voz
  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
      filterProducts(transcript);
    }
  }, [transcript]);

  const handleDescontinuar = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/producto/${productId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.log("Error while descontinuing product:", error.message);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/producto/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchProducts();
        } else {
          console.log("Error while deleting product:", await response.json());
        }
      } catch (error) {
        console.log("Error while deleting product:", error.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Inventario de productos</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button onClick={startListening} variant="primary">
              <FaMicrophone /> {listening ? "Escuchando...": ""}
            </Button>
          </InputGroup>
          <div>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>Lote</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>F.vencimiento</th>
                  <th>Ingredientes</th>
                  <th>Paquete</th>
                  <th>Disponibilidad</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td data-label="Lote">{product.prod_lote}</td>
                    <td data-label="Nombre">{product.prod_nombre}</td>
                    <td data-label="Categoría">{product.prod_categoria}</td>
                    <td data-label="Descripción">{product.prod_descripcion}</td>
                    <td data-label="F. vencimiento">
                      {new Date(
                        new Date(product.prod_fechavencimiento).setUTCDate(
                          new Date(product.prod_fechavencimiento).getUTCDate() +
                            1
                        )
                      ).toLocaleDateString("es-ES")}
                    </td>
                    <td data-label="Ingredientes">
                      {product.prod_ingredientes.join(", ")}
                    </td>
                    <td data-label="Paquete">
                      {product.prod_paquete.join(", ")}
                    </td>
                    <td data-label="Disponibilidad">
                      {product.prod_disponibilidad}
                    </td>
                    <td data-label="Cantidad">{product.inv_cantidad}</td>
                    <td data-label="Acción">
                      <ButtonGroup>
                        <Button
                          onClick={() => handleUpdate(product._id)}
                          className="me-2 boton-personalizado btn-gradiente"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(product._id)}
                          className="me-2"
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          className="boton-personalizado btn-danger"
                          onClick={() => handleDescontinuar(product._id)}
                        >
                          Descontinuado
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
