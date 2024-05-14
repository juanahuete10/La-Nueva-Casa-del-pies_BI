import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Cliente({userRol}) {

  // Crear un estado para cada campo del formulario
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [historialdecompras, setHistorialDeCompras] = useState('')
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const rol = 'clientes';
  

  const validarCedula = (cedula) => {
    // La cédula debe tener 16 dígitos
    if (cedula.length !== 16) {
      return false;
    }
  
    // La cédula debe ser un número
    if (!/^\d+$/.test(cedula)) {
      return false;
    }
  
    // La cédula debe ser única
    // (Esta validación se puede realizar enviando una solicitud HTTP al backend para verificar si la cédula ya existe)
    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      cedula,
      nombre,
      apellido,
      historialdecompras,
      nombre_Usuario,  // Agregar el campo nombre_Usuario
      contrasena,      // Agregar el campo contrasena
      rol
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createClientes', {
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
        setCedula('');
        setNombre('');
        setApellido('');
        setHistorialDeCompras('');
        setNombreUsuario(''); 
        setContrasena(''); 
        

      } else {
        alert('Asegurese de Rellenar todos los campos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header rol={ rol} />
      
      <Container>
        <Card className="espaciado">
          <Card.Body>
            <Card.Title>Registrar Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

              <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="cedula" label="Cédula">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

              <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.replace(/\d/g,''))}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value.replace(/\d/g,''))}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="historialdecompras" label="Historial de compras">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el historial de compras" 
                      value={historialdecompras}
                      onChange={(e) => setHistorialDeCompras(e.target.value.replace(/\d/g,''))}
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
export default Cliente;