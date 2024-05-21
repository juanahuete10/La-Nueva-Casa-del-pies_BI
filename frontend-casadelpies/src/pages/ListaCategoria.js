import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Container, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaRegPenToSquare,FaTrashCanArrowUp } from "react-icons/fa6";



function ListaDescuento({rol}) {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategorias, setSelectedCategorias] = useState({});
  const [formData, setFormData] = useState({
    nombre_C: '',
    descripcion: '',
    
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredCategorias = categorias.filter((categorias) => { 
    
    if (categorias && categorias.nombre_C && categorias.descripcion ) {
      // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
      const nombre_C = categorias.nombre_C.toString().toLowerCase();
      const descripcion = categorias.descripcion.toString().toLowerCase();
      
  
      // Verifica si la cadena de búsqueda se encuentra en algún campo
      return (
        nombre_C.includes(searchQuery) ||
        descripcion.includes(searchQuery) 
        
      );
    }
    return false; // Si algún valor está indefinido, no incluirlo en los resultados
  });
  

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (categorias) => {
    setSelectedCategorias(categorias);

   

    setFormData({
      nombre_C: categorias.nombre_C,
      descripcion: categorias.descripcion,
      
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

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/readcategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las Categorias:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecategorias/${selectedCategorias.id_Categoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de categorias
          loadCategorias(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (id_Categoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoria?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deletecategorias/${id_Categoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de categorias
            loadCategorias();
          }
        })
        .catch((error) => console.error('Error al eliminar la categoria:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readcategorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener las categorias:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Container>

      <Card className="espaciado">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Categorias</Card.Title>

          
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
                <th>Nombre Categoria</th>
                <th>Descripcion</th>
                <td className="d-flex justify-content-center">
                <th>Acciones</th></td>
                
              </tr>
            </thead>
            <tbody>   
              {filteredCategorias.map((categorias) => (
                <tr key={categorias.id_Categoria}>
                  <td>{categorias.id_Categoria}</td>
                  <td>{categorias.nombre_C}</td>
                  <td>{categorias.descripcion}</td>
                  <td className="d-flex justify-content-center">    
                  <Button variant="primary" onClick={() => openModal(categorias)} style={{ marginRight: '15px' }}> <FaRegPenToSquare/></Button>
                      <Button variant="danger" onClick={() => handleDelete(categorias.id_Categoria)}><FaTrashCanArrowUp/></Button>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Marcas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Categorias</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre_C" label="Nombre Marca">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre "
                        name="nombre_C"
                        value={formData.nombre_C}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="descripcion" label="Descripcion">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripcion"
                        name="descripcion"
                        value={formData.descripcion}
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

export default ListaDescuento;