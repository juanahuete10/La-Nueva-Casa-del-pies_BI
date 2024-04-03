import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaVendedor({ rol }) {
  const [vendedores, setVendedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState({});
  const [formData, setFormData] = useState({
    id_Vendedor: '',
    direccion: '',
    telefono: '',
    nombre: '',
    apellido: '',
    id_Usuario: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVendedores = vendedores.filter((vendedor) => {
    if (vendedor && vendedor.direccion && vendedor.telefono && vendedor.nombre && vendedor.apellido) {
      const direccion = vendedor.direccion.toString().toLowerCase();
      const telefono = vendedor.telefono.toString().toLowerCase();
      const nombre = vendedor.nombre.toString().toLowerCase();
      const apellido = vendedor.apellido.toString().toLowerCase();

      return (
        direccion.includes(searchQuery) ||
        telefono.includes(searchQuery) ||
        nombre.includes(searchQuery) ||
        apellido.includes(searchQuery)
      );
    }
    return false;
  });

  const openModal = (vendedor) => {
    setSelectedVendedor(vendedor);

    setFormData({
      direccion: vendedor.direccion,
      telefono: vendedor.telefono,
      nombre: vendedor.nombre,
      apellido: vendedor.apellido,
      id_Usuario: vendedor.id_Usuario,
    });

    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateVendedor/${selectedVendedor.id_Vendedor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadVendedores();
        } else {
          throw new Error('Error al actualizar el registro');
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id_Vendedor) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este vendedor?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteVendedor/${id_Vendedor}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadVendedores();
          } else {
            throw new Error('Error al eliminar el vendedor');
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const loadVendedores = () => {
    fetch('http://localhost:5000/crud/readUsuarioyVendedor')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los vendedores y usuarios');
        }
        return response.json();
      })
      .then((data) => setVendedores(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadVendedores();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Vendedor</Card.Title>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>ID Usuario</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendedores.map((vendedor) => (
                <tr key={vendedor.id_Vendedor}>
                  <td>{vendedor.id_Vendedor}</td>
                  <td>{vendedor.direccion}</td>
                  <td>{vendedor.telefono}</td>
                  <td>{vendedor.nombre}</td>
                  <td>{vendedor.apellido}</td>
                  <td>{vendedor.id_Usuario}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(vendedor)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(vendedor.id_Vendedor)}>
                      <FaTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Registro de Vendedor</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Telefono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el numero de telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="nombre" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="apellido" label="Apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="id_Usuario" label="ID Usuario">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el ID del Usuario"
                        name="id_Usuario"
                        value={formData.id_Usuario}
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

export default ListaVendedor;
