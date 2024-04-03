import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Usuario({rol}) {

  // Crear un estado para cada campo del formulario
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContraseña] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre_Usuario,
      contrasena,
      
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createUsuario', {
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
        setNombreUsuario('');
        setContraseña('');
      } else {
        alert('Error al registrar el usuario');
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
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Usuario</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del usuario"
                      value={nombre_Usuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="contrasena" label="Contraseña">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su contraseña"
                      value={contrasena}
                      onChange={(e) => setContraseña(e.target.value)}
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
export default Usuario;