import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Vendedor({userRol}) {

  // Crear un estado para cada campo del formulario
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const rol = 'vendedor';
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      direccion,
      telefono,
      nombre,
      apellido,
      nombre_Usuario,  // Agregar el campo nombre_Usuario
      contrasena,      // Agregar el campo contrasena
      rol
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createVendedor', {
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
        setDireccion('');
        setTelefono('');
        setNombre('');
        setApellido('');
        setNombreUsuario('');
        setContrasena('');
      } else {
        alert('Asegurese que ningun campo este vacio');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header rol={userRol} />
      
      <Container>
        <Card className="espaciado">
          <Card.Body>
            <Card.Title>Registrar Vendedor</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="direccion" label="Direccion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su direccion"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value.replace(/\d/g,''))}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="telefono" label="Telefono">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese su numero de telefono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingre su nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.replace(/\d/g,''))} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese su apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value.replace(/\d/g,''))} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Usuario" label="Nombre Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre usuario"
                      value={nombre_Usuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="contrasena" label="Contraseña">
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
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
export default Vendedor;