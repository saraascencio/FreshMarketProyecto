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

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/producto");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); 
    } catch (error) {
      console.log("Error while fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Inventario de productos</h1>
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
                          variant="outline-danger"
                          onClick={() => handleDelete(product._id)}
                          className="me-2"
                        >
                          <FaTrash />
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
