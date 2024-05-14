import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaCartPlus } from "react-icons/fa6";
import '../App.css';

function Galeria({rol}) {
  const [productos, setProductos] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredProductos = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const id_Producto = producto.id_Producto; 
    const id_categoria = producto.id_categoria;
    const nombre = producto.nombre.toLowerCase();
    const descripcion = producto.descripcion.toLowerCase();
    const precio = producto.precio;
    const id_Marca = producto.id_Marca;
    const id_Promociones = producto.id_Promociones;
    const search = searchQuery.toLowerCase();
    
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      id_Producto == (search) ||
      id_categoria == (search) ||
      nombre.includes(search) ||
      descripcion.includes(search) ||
      precio == (search) ||
      id_Marca == (search) ||
      id_Promociones == (search)
    );
  });

  // Realiza una solicitud GET al servidor para obtener los productos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readProductos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return(
    <div>
      <Header rol={ rol} />
      
      <Container className="margen-contenedor">

      <Row className="espaciado">
        <Col sm="6" md="6" lg="4">
          <FloatingLabel controlId="search" label="Buscar">
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="espaciado">
        {productos.map((producto) => (
          <Col sm="12" md="4" lg="3">
            <Card>
              <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  {producto.descripcion}
                </Card.Text>
                <div>
                  <Badge bg="success">PrecioC$: {producto.precio}</Badge>
                </div>
              </Card.Body>
              <Card.Body>
                <button href="#"><FaCartPlus /></button>
              </Card.Body>
            </Card>
          </Col>            
        ))}
      </Row>
    </Container>

    </div>
  );
}

export default Galeria;