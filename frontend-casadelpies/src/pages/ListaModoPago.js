import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Container, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

function ListaModoPagos({ rol }) {
  const [modoPagos, setModoPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedModoPago, setSelectedModoPago] = useState({});
  const [formData, setFormData] = useState({
    Nombre_ModoPago: '',
  });

  const loadModoPagos = () => {
    fetch('http://localhost:5000/crud/readmodopagos')
      .then((response) => response.json())
      .then((data) => setModoPagos(data))
      .catch((error) => console.error('Error al obtener los modos de pago:', error));
  };

  const openModal = (modoPago) => {
    setSelectedModoPago(modoPago);
    setFormData({
      Nombre_ModoPago: modoPago.Nombre_ModoPago,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/updatemodopagos/${selectedModoPago.id_ModoPago}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadModoPagos();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_ModoPago) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este modo de pago?');
    if (confirmation) {
      fetch(`http://localhost:5000/deletemodopagos/${id_ModoPago}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadModoPagos();
          }
        })
        .catch((error) => console.error('Error al eliminar el modo de pago:', error));
    }
  };

  useEffect(() => {
    loadModoPagos();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="espaciado">
          <Card.Body>
            <Card.Title className="mb-3">Lista de Modos de Pago</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Modo de Pago</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {modoPagos.length > 0 ? (
                  modoPagos.map((modoPago) => (
                    <tr key={modoPago.id_ModoPago}>
                      <td>{modoPago.id_ModoPago}</td>
                      <td>{modoPago.Nombre_ModoPago}</td>
                      <td className="text-center">
                        <Button
                          variant="primary"
                          onClick={() => openModal(modoPago)}
                          style={{ marginRight: '10px' }}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(modoPago.id_ModoPago)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Modo de Pago</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="espaciado">
              <Card.Body>
                <Card.Title>Modo de Pago</Card.Title>
                <Form className="mt-3">
                  <Row className="g-3">
                    <Col sm="6" md="6" lg="6">
                      <FloatingLabel controlId="Nombre_ModoPago" label="Modo de Pago">
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
      </Container>
    </div>
  );
}

export default ListaModoPagos;
