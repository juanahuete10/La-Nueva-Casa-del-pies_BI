import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';



function ListaUsuario({rol}) {
  const [usuario, setUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState({});
  const [formData, setFormData] = useState({
    nombre_Usuario: '',
    contrasena: '',
    rol: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredUsuario = usuario.filter((usuario) => { 
    
    if (usuario && usuario.nombre_Usuario && usuario.contrasena) {
      // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
      const nombre_Usuario = usuario.nombre_Usuario.toString().toLowerCase();
      const contrasena = usuario.contrasena.toString().toLowerCase();
      const rol = usuario.rol.toString().toLowerCase();
     
      // Verifica si la cadena de búsqueda se encuentra en algún campo
      return (
        nombre_Usuario.includes(searchQuery) ||
        contrasena.includes(searchQuery) ||
        contrasena.includes(searchQuery) 
        
      );
    }
    return false; // Si algún valor está indefinido, no incluirlo en los resultados
  });
  

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (usuario) => {
    setSelectedUsuario(usuario);

    

    setFormData({
        nombre_Usuario:usuario.nombre_Usuario,
        contrasena:usuario.contrasena,
        rol:usuario.rol,
    });
    setShowModal(true);
  };


  const loadUsuario = () => {
    fetch('http://localhost:5000/crud/readusuario')
      .then((response) => response.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error('Error al obtener los usuarios:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateUsuario/${selectedUsuario.id_Usuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de usuario
          setShowModal(false);
          loadUsuario(); // Cargar la lista deusuario actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un usuario
  const handleDelete = (id_Usuario) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este usuario?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteUsuario/${id_Usuario}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de usuario
            loadUsuario();
          }
        })
        .catch((error) => console.error('Error al eliminar el usuario:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readusuario')
      .then((response) => response.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error('Error al obtener los usuarios:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="espaciado">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Usuarios</Card.Title>

          
          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
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
                <th>Nombre Usuario</th>
                <th>Contraseña</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>   
              {filteredUsuario.map((usuario) => (
                <tr key={usuario.id_Usuario}>
                  <td>{usuario.id_Usuario}</td>
                  <td>{usuario.nombre_Usuario}</td>
                  <td>{usuario.contrasena}</td>

                  <td>
                    <Button variant="primary" onClick={() => openModal(usuario)}><FaPencil/></Button>
                    <Button variant="danger" onClick={() => handleDelete(usuario.id_Usuario)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre_Usuario" label="nombre usuario">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su usuario"
                        name="nombre_Usuario"
                        value={formData.nombre_Usuario}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="contrasena" label="Contrasena">
                      <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="contrasena"
                        value={formData.contrasena}
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

export default ListaUsuario;