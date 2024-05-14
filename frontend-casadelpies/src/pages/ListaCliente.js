import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaCliente({ rol }) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    id_Cliente: '',
    cedula: '',
    nombre: '',
    apellido: '',
    historialdecompras: '',
    id_Usuario: '',
  });


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredclientes = clientes.filter((clientes) => { 
    
    if (clientes && clientes.cedula && clientes.nombre && clientes.apellido && clientes.historialdecompras) {
      // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
      const cedula = clientes.cedula.toString().toLowerCase();
      const nombre = clientes.nombre.toString().toLowerCase();
      const apellido = clientes.apellido.toString().toLowerCase();
      const historialdecompras = clientes.historialdecompras.toString().toLowerCase();
    
  
      // Verifica si la cadena de búsqueda se encuentra en algún campo
      return (
        cedula.includes(searchQuery) ||
        nombre.includes(searchQuery) ||
        apellido.includes(searchQuery)||
        historialdecompras.includes(searchQuery) 
      );
    }
    return false; // Si algún valor está indefinido, no incluirlo en los resultados
  });
  



  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    setFormData({
      id_Cliente: cliente.id_Cliente,
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      historialdecompras: cliente.historialdecompras,
      id_Usuario: cliente.id_Usuario,
    });

    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateClientes/${selectedCliente.id_Cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadClientes();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_Cliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteClienteUsuario/${id_Cliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadClientes();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  const loadClientes = () => {
    fetch('http://localhost:5000/crud/readusuarioClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes y usuarios:', error));
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container>
      <Card className="espaciado">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Cliente</Card.Title>

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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Historial de Compras</th>
                <th>ID Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredclientes.map((cliente) => (
                <tr key={cliente.id_Cliente}>
                  <td>{cliente.id_Cliente}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.historialdecompras}</td>
                  <td>{cliente.id_Usuario}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id_Cliente)}>
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
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Clientes</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cedula" label="Cedula Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su cedula "
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre" label="Nombre Cliente">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="apellido" label="Apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="historialdecompras" label="Historial de compras">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su historial"
                        name="historialdecompras"
                        value={formData.historialdecompras}
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
      </Container>
    </div>
  );
}

export default ListaCliente;
