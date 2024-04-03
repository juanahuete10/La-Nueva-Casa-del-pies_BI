import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Descuento({rol}) {

  // Crear un estado para cada campo del formulario
  const [codigoDescuentos, setCodigoDescuentos] = useState('');
  const [condiciones, setCondiciones ] = useState('');
  const [fecha_Inicio, setFecha_Inicio] = useState('');
  const [fecha_Fin, setFecha_Fin] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      codigoDescuentos,
      condiciones,
      fecha_Inicio,
      fecha_Fin,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createPromocionesyDescuentos', {
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
        setCodigoDescuentos('');
        setCondiciones('');
        setFecha_Inicio('');
        setFecha_Fin('');
      } else {
        alert('Asegurese de Rellenar todos los campos necesarios');
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
            <Card.Title>Registro de Descuento</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="codigoDescuentos" label="Código Descuento">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el código del descuento"
                      value={codigoDescuentos}
                      onChange={(e) => setCodigoDescuentos(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="condiciones" label="Condiciones">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese las condiciones"
                      value={condiciones}
                      onChange={(e) => setCondiciones(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="fecha_Inicio" label="Fecha de Inicio">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha de inicio"
                      value={fecha_Inicio}
                      onChange={(e) => setFecha_Inicio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="fecha_Fin" label="Fecha de Finalización">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha de finalización"
                      value={fecha_Fin}
                      onChange={(e) => setFecha_Fin(e.target.value)} 
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

export default Descuento;