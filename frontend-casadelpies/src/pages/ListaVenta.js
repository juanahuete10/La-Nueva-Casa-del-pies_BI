import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaVenta({rol}) {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
     id_Cliente: '',
      id_Vendedor: '',   
      id_ModoPago: '',  
      fecha: '', 
      Estado: '', 
      TipoVentas: '',
      Direccion_Envio : ''
  });

  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [vendedor, setVendedor] = useState([]); // Estado para almacenar los vendedor
  const [modopagos, setModoPagos] = useState([]); // Estado para almacenar los modo de pagos

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los clientes
    fetch('http://localhost:5000/crud//readvendedor')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setVendedor(data);
      })
      .catch(error => {
        console.error('Error al obtener los vendedores', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los vendedores
    fetch('http://localhost:5000/crud//readclientes')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setClientes(data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener los vendedores
    fetch('http://localhost:5000/crud//readmodopagos')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los vendedores obtenidas
        setModoPagos(data);
      })
      .catch(error => {
        console.error('Error al obtener los modo de pagos', error);
      });
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredVentas = ventas.filter((ventas) => { 
    
    if (ventas && ventas.id_Cliente && ventas.id_Vendedor && ventas.id_ModoPago && ventas.fecha&& ventas.Estado&& ventas.TipoVentas&& ventas.Date&& ventas.Total_Venta) {
      // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
      const id_Cliente = ventas.id_Cliente.toString().toLowerCase();
      const id_Vendedor = ventas.id_Vendedor.toString().toLowerCase();
      const id_ModoPago = ventas.id_ModoPago.toString().toLowerCase();
      const fecha = ventas.fecha.toString().toLowerCase();
      const Estado = ventas.Estado.toString().toLowerCase();
      const TipoVentas = ventas.TipoVentas.toString().toLowerCase();
      const Direccion_Envio = ventas.Direccion_Envio.toString().toLowerCase();
  
      // Verifica si la cadena de búsqueda se encuentra en algún campo
      return (
        id_Cliente.includes(searchQuery) ||
        id_Vendedor.includes(searchQuery) ||
        id_ModoPago.includes(searchQuery)||
        fecha.includes(searchQuery)||
        Estado.includes(searchQuery)||
        TipoVentas.includes(searchQuery)||
        Direccion_Envio.includes(searchQuery)
      
      );
    }
    return false; // Si algún valor está indefinido, no incluirlo en los resultados
  });
  

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

  const loadventa = () => {
    fetch('http://localhost:5000/crud/readventas')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  const handleDelete = (cod_Venta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar la promoción
      fetch(`http://localhost:5000/crud/deleteVentas/${cod_Venta}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de promociones
            loadventa();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener las promociones
  useEffect(() => {
    fetch('http://localhost:5000/crud/readventas')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  }, []);
  

  return (
    <div>
      <Header rol={ rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Ventas</Card.Title>

          
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

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Modo Pago</th>
                <th>Fecha</th>
                <th>Estado Venta</th>
                <th>Tipo Venta</th>
                <th>Direccion Envio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>   
            {ventas.map((venta) => (
              <tr key={venta.cod_Venta}>
                <td>{venta.cod_Venta}</td>
                <td>{venta.id_Cliente}</td>
                <td>{venta.id_Vendedor}</td>
                <td>{venta.id_ModoPago}</td>
                <td>{formatDateForInput(venta.fecha)}</td>
                <td>{venta.Estado}</td>
                <td>{venta.TipoVentas}</td>
                <td>{venta.Direccion_Envio}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(venta.cod_Venta)}><FaTrashCan/></Button>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

    </div>
  );
}

export default ListaVenta;