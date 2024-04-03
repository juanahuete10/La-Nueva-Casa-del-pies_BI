import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Categorias({rol}) {

  // Crear un estado para cada campo del formulario
  const [nombre_C, setNombreCategoria] = useState('');
  const [descripcion, setDescripcion ] = useState('');
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
     nombre_C,
      descripcion,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createcategorias', {
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
        setNombreCategoria('');
        setDescripcion('');
       
      } else {
        alert('Error al registrar categoria');
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
            <Card.Title>Registro de Categorias</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_C" label="Nombre Categoria">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de la categoria"
                      value={nombre_C}
                      onChange={(e) => setNombreCategoria(e.target.value.replace(/\d/g,''))}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese Descripcion de la categoria"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value.replace(/\d/g,''))}
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

export default Categorias;