import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaModoPago({rol}) {
  const [modopagos, setModoPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedModoPagos, setSelectedModoPagos] = useState({});
  const [formData, setFormData] = useState({
    Nombre_ModoPago: '',
  
    
  });

  // Función para abrir el modal y pasar los datos del pago seleccionada
  const openModal = (modopagos) => {
    setSelectedModoPagos(modopagos);

        
    setFormData({
        Nombre_ModoPago:modopagos.Nombre_ModoPago,
      
    });
    setShowModal(true);
  };


  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadModoPagos = () => {
    fetch('http://localhost:5000/crud/readModopagos')
      .then((response) => response.json())
      .then((data) => setModoPagos(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateModoPagos/${selectedModoPagos.id_ModoPago}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de pagos
          setShowModal(false);
          loadModoPagos(); // Cargar la lista de pagos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un modo pago
  const handleDelete = (id_ModoPago) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este pago?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteModoPagoss/${id_ModoPago}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de modopagos
            loadModoPagos();
          }
        })
        .catch((error) => console.error('Error al eliminar el pago:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los pagos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readModopagos')
      .then((response) => response.json())
      .then((data) => setModoPagos(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Lista de Modo Pagos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modo De pagos</th>
            
              </tr>
            </thead>
            <tbody>
              {modopagos.map((modopagos) => (
                <tr key={modopagos.id_ModoPago}>
                  <td>{modopagos.id_ModoPago}</td>
                  <td>{modopagos.Nombre_ModoPago}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(modopagos)}><FaPencil/></Button>
                    <Button variant="danger" onClick={() => handleDelete(modopagos.id_ModoPago)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Modo Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Modo Pago</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="Nombre_ModoPago" label="Modo Pago">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el modo de pago"
                        name="Nombre_ModoPago"
                        value={formData.Nombre_ModoPago}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                

                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default ListaModoPago;