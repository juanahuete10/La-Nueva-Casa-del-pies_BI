import React from 'react';  
import Header from '../components/Header'; 
import { Row, Col, Card, Container } from 'react-bootstrap';  
import '../App.css';  
import Footer from '../components/Footer';

function Estadisticas({ rol }) { 

  return(
    <div>
      <Header rol={ rol } />  

      <Container className="margen-contenedor">
        <Row className="espaciado">
          <Col sm="12" md="12" lg="12" className="d-flex justify-content-center align-items-center">
            <Card style={{ width: 'auto' }}>
              <Card.Body className="text-center">
                <Card.Title>Estado del almacen</Card.Title>
                <iframe 
                  title="REPORTE KARDEX" 
                  width="1024" 
                  height="804" 
                  src="https://app.powerbi.com/view?r=eyJrIjoiYzJhY2RhOTEtMGIzNy00ZjE2LWFlZGYtZTVmOThjNjY0Yzk2IiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9" 
                  allowFullScreen="true">
                </iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer/>
    </div>
  );
}

export default Estadisticas; 
