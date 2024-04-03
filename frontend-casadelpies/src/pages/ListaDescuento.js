import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';



function ListaDescuento({rol}) {
  const [descuentos, setDescuentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescuento, setSelectedDescuento] = useState({});
  const [formData, setFormData] = useState({
    codigoDescuentos: '',
    condiciones: '',
    fecha_Inicio: '',
    fecha_Fin: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredDescuentos = descuentos.filter((descuento) => { 
    
    if (descuento && descuento.codigoDescuentos && descuento.condiciones && descuento.fecha_Inicio && descuento.fecha_Fin) {
      // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
      const codigoDescuentos = descuento.codigoDescuentos.toString().toLowerCase();
      const condiciones = descuento.condiciones.toString().toLowerCase();
      const fecha_Inicio = formatDateForInput(descuento.fecha_Inicio).toLowerCase();
      const fecha_Fin = formatDateForInput(descuento.fecha_Fin).toLowerCase();
  
      // Verifica si la cadena de búsqueda se encuentra en algún campo
      return (
        codigoDescuentos.includes(searchQuery) ||
        condiciones.includes(searchQuery) ||
        fecha_Inicio.includes(searchQuery) ||
        fecha_Fin.includes(searchQuery)
      );
    }
    return false; // Si algún valor está indefinido, no incluirlo en los resultados
  });
  

  // Función para abrir el modal y pasar los datos de la promoción seleccionada
  const openModal = (descuento) => {
    setSelectedDescuento(descuento);

    // Formatea la fecha para el campo Fecha_Inicio
    const formattedFechaInicio = formatDateForInput(descuento.fecha_Inicio);
        // Formatea la fecha para el campo Fecha_Fin
    const formattedFechaFin = formatDateForInput(descuento.fecha_Fin);

    setFormData({
      codigoDescuentos: descuento.codigoDescuentos,
      condiciones: descuento.condiciones,
      fecha_Inicio: formattedFechaInicio,
      fecha_Fin: formattedFechaFin,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadDescuentos = () => {
    fetch('http://localhost:5000/crud/readpromociones')
      .then((response) => response.json())
      .then((data) => setDescuentos(data))
      .catch((error) => console.error('Error al obtener los descuentos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatePromocionesyDescuentos/${selectedDescuento.id_Promociones}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de promociones
          setShowModal(false);
          loadDescuentos(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar una promoción
  const handleDelete = (id_Promociones) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta promoción?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deletePromocionesyDescuentos/${id_Promociones}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de promociones
            loadDescuentos();
          }
        })
        .catch((error) => console.error('Error al eliminar el descuento:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readpromociones')
      .then((response) => response.json())
      .then((data) => setDescuentos(data))
      .catch((error) => console.error('Error al obtener las promociones:', error));
  }, []);

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Descuentos</Card.Title>

          
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
                <th>Código Descuento</th>
                <th>Condiciones</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
              </tr>
            </thead>
            <tbody>   
              {filteredDescuentos.map((descuento) => (
                <tr key={descuento.id_Promociones}>
                  <td>{descuento.id_Promociones}</td>
                  <td>{descuento.codigoDescuentos}</td>
                  <td>{descuento.condiciones}</td>
                  <td>{formatDateForInput(descuento.fecha_Inicio)}</td>
                  <td>{formatDateForInput(descuento.fecha_Fin)}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(descuento)}><FaPencil/></Button>
                    <Button variant="danger" onClick={() => handleDelete(descuento.id_Promociones)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Descuento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="espaciado">
            <Card.Body>
              <Card.Title>Descuento</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="codigoDescuentos" label="Código de descuento">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el código de descuento"
                        name="codigoDescuentos"
                        value={formData.codigoDescuentos}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="condiciones" label="Condiciones">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese las condiciones"
                        name="condiciones"
                        value={formData.condiciones}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="fecha_Inicio" label="Fecha Inicio">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha inicio"
                        name="fecha_Inicio"
                        value={formData.fecha_Inicio}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="fecha_Fin" label="Fecha Fin">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha fin"
                        name="fecha_Fin"
                        value={formData.fecha_Fin}
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

export default ListaDescuento;