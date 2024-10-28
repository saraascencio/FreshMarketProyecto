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

  
};

export default Dashboard;
