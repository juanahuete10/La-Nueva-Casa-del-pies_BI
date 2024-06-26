import React from 'react';  
import Header from '../components/Header'; 
import { Row, Col, Card, Container } from 'react-bootstrap';  
import '../App.css';  

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
                  src="https://app.powerbi.com/view?r=eyJrIjoiOWU2ZTMzYjgtNjI2MS00MDgzLTk1MzUtZDE2MTNmMDYxYjQ3IiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9" 
                  allowFullScreen="true">
                </iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Estadisticas; 
