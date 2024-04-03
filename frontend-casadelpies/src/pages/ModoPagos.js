import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function ModoPagos({rol}) {

  // Crear un estado para cada campo del formulario
  const [Nombre_ModoPago, setNombreModoPago] = useState('');


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombre_ModoPago,
    
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createmodoPagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombreModoPago('');
        
      } else {
        alert('Error al registrar pagos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header rol={ rol}/>
      
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
                      placeholder="Ingrese el meodo de pago"
                      value={Nombre_ModoPago }
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