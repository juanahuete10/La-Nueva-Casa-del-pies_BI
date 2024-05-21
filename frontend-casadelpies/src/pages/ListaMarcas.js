import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Container, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaMarcas({rol}) {
  const [marcas, setMarcas] = useState([]); // Change variable name to 'marcas'
  const [showModal, setShowModal] = useState(false);
  const [selectedMarcas, setSelectedMarca] = useState({}); // Change variable name to 'selectedMarca'
  const [formData, setFormData] = useState({
    nombre_Marca: '',
  });

  const loadMarcas = () => {
    fetch('http://localhost:5000/crud/readmarca')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al obtener las marcas:', error)); // Update error message
  };

  const openModal = (marcas) => {
    setSelectedMarca(marcas);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updatemarcas/${selectedMarcas.id_Marca}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadMarcas();
        }
        
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_Marca) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta marca?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteMarcas/${id_Marca}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadMarcas();
          }
        })
        .catch((error) => console.error('Error al eliminar la marca:', error));
    }
  };

  useEffect(() => {
    loadMarcas(); // Simplified to reuse the same function
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Container>
      <Card className="espaciado">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Marcas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de la Marca</th> {/* Corrected label */}
                <td className="d-flex justify-content-center">
                <th>Acciones</th></td>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marcas) => (
                <tr key={marcas.id_Marca}>
                  <td>{marcas.id_Marca}</td>
                  <td>{marcas.nombre_Marca}</td>
                  <td className="d-flex justify-content-center">
                  <Button variant="primary" onClick={() => openModal(marcas)} style={{ marginRight: '15px' }}> <FaPencil/></Button>
                  <Button variant="danger" onClick={() => handleDelete(marcas.id_Marca)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Marca</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre_Marca" label="Nombre de la Marca">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la marca"
                        name="nombre_Marca"
                        value={formData.nombre_Marca}
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

export default ListaMarcas;
