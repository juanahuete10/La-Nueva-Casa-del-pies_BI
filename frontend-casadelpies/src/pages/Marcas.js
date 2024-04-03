import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Marcas({rol}) {

  // Crear un estado para cada campo del formulario
  const [nombre_Marca, setNombreMarca] = useState('');
  const [error, setError] = useState(''); // Agregar estado para manejar errores
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();


    
    // Validar que el campo de nombre_Marca no contenga números
    if (/^\d+$/.test(nombre_Marca)) {
      setError('El nombre de la marca no debe contener números');
      return;
    }


    // Crear un objeto con los datos del formulario
    const formData = {
        nombre_Marca
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createMarcas', {
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
        setNombreMarca('');
        
      } else {
        alert('Error,Asegurese de Rellenar todos los campos');
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
            <Card.Title>Registrar Marcas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_Marca" label="Nombre Marca">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese marcas"
                      value={nombre_Marca}
                      onChange={(e) => setNombreMarca(e.target.value.replace(/\d/g,''))}
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
export default Marcas;