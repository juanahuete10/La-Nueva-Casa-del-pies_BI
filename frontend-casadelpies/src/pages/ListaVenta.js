import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaVenta({ rol }) {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
    id_Cliente: '',
    id_Vendedor: '',
    id_ModoPago: '',
    fecha: '',
    Estado: '',
    TipoVentas: '',
    Direccion_Envio: ''
  });

  const [clientes, setClientes] = useState([]);
  const [vendedor, setVendedor] = useState([]);
  const [modopagos, setModoPagos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readvendedor')
      .then(response => response.json())
      .then(data => setVendedor(data))
      .catch(error => console.error('Error al obtener los vendedores', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readclientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener los clientes', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readmodopagos')
      .then(response => response.json())
      .then(data => setModoPagos(data))
      .catch(error => console.error('Error al obtener los modos de pago', error));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredVentas = Array.isArray(ventas) ? ventas.filter((venta) => {
    if (venta && venta.id_Cliente && venta.id_Vendedor && venta.id_ModoPago && venta.fecha && venta.Estado && venta.TipoVentas && venta.Direccion_Envio) {
      const id_Cliente = venta.id_Cliente.toString().toLowerCase();
      const id_Vendedor = venta.id_Vendedor.toString().toLowerCase();
      const id_ModoPago = venta.id_ModoPago.toString().toLowerCase();
      const fecha = venta.fecha.toString().toLowerCase();
      const Estado = venta.Estado.toString().toLowerCase();
      const TipoVentas = venta.TipoVentas.toString().toLowerCase();
      const Direccion_Envio = venta.Direccion_Envio.toString().toLowerCase();

      return (
        id_Cliente.includes(searchQuery) ||
        id_Vendedor.includes(searchQuery) ||
        id_ModoPago.includes(searchQuery) ||
        fecha.includes(searchQuery) ||
        Estado.includes(searchQuery) ||
        TipoVentas.includes(searchQuery) ||
        Direccion_Envio.includes(searchQuery)
      );
    }
    return false;
  }) : [];

  const formatDateForInput = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadVenta = () => {
    fetch('http://localhost:5000/crud/readventas')
      .then((response) => response.json())
      .then((data) => setVentas(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  const handleDelete = (cod_Venta) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteVentas/${cod_Venta}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadVenta();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  useEffect(() => {
    loadVenta();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="espaciado">
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
                  <td className="d-flex justify-content-center">
                <th>Acción</th></td>
                </tr>
              </thead>
              <tbody>
                {filteredVentas.map((venta) => (
                  <tr key={venta.cod_Venta}>
                    <td>{venta.cod_Venta}</td>
                    <td>{venta.id_Cliente}</td>
                    <td>{venta.id_Vendedor}</td>
                    <td>{venta.id_ModoPago}</td>
                    <td>{formatDateForInput(venta.fecha)}</td>
                    <td>{venta.Estado}</td>
                    <td>{venta.TipoVentas}</td>
                    <td>{venta.Direccion_Envio}</td>
                    <td className="d-flex justify-content-center">
                      <Button variant="danger" onClick={() => handleDelete(venta.cod_Venta)}><FaTrashCan /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ListaVenta;
