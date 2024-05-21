import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function ModoPagos({ rol }) {
  const [Nombre_ModoPago, setNombreModoPago] = useState('');
  const [modopagos, setModoPagos] = useState([]);

  // Función para cargar modos de pago
  const loadModoPagos = () => {
    fetch('http://localhost:5000/crud/readModopagos')
      .then((response) => response.json())
      .then((data) => setModoPagos(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { Nombre_ModoPago };

    try {
      const response = await fetch('http://localhost:5000/crud/createmodoPagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        setNombreModoPago('');
        loadModoPagos(); // Llama a la función para cargar modos de pago después del registro exitoso
      } else {
        alert('Error al registrar pagos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container>
        <Card className="espaciado">
          <Card.Body>
            <Card.Title>Registrar Modo De Pagos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Nombre_ModoPago" label="Modo De Pago">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el modo de pago"
                      value={Nombre_ModoPago}
                      onChange={(e) => setNombreModoPago(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ModoPagos;
