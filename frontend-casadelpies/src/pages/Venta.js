import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table, ListGroup } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../App.css';

function Venta({ rol }) {

  const [formData, setFormData] = useState({
    id_Cliente: '',
    id_Vendedor: '',
    id_ModoPago: '',
    Estado: '',
    TipoVentas: '',
    Direccion_Envio: '',
  });

  const [Estado, setEstado] = useState('');
  const [TipoVentas, setTipoVentas] = useState('');
  const [Direccion_Envio, setDireccionEnvio] = useState('');
  
  const [fecha, setFecha] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');

  const [vendedor, setVendedor] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modopagos, setModoPago] = useState([]);

  const [detalleventa, setDetalleVenta] = useState([]);

  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showVendedorModal, setShowVendedorModal] = useState(false);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [showModoPagoModal, setShowModoPagoModal] = useState(false);

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedModoPago, setSelectedModoPago] = useState(null);

  const [verificacion, setVerificacion] = useState(false);

  const handleCloseVerificacion = () => {
    setVerificacion(false);
  };

  const handleCloseConfirmacion = () => {
    setVerificacion(false);
    registrarVenta();
  };
  
  const handleShowVerificacion = () => setVerificacion(true);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const AgregarDetalleProducto = () => {
    if (selectedProducto && cantidadProducto) {
      const nuevoDetalle = {
        id_Producto: selectedProducto.id_Producto,
        nombre: selectedProducto.nombre,
        precio: selectedProducto.precio,
        cantidadProducto: cantidadProducto
      };
      setDetalleVenta([...detalleventa, nuevoDetalle]);
      setCantidadProducto('');
      setSelectedProducto('');
    } else {
      alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
    }
  };

  const EliminarDetalle = (id_Producto) => {
    const detallesActualizados = detalleventa.filter(detalle => detalle.id_Producto !== id_Producto);
    setDetalleVenta(detallesActualizados);
  };


  const filteredClientes = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idCliente = cliente.idCliente;
    const nombre = cliente.nombre.toLowerCase(); 
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      idCliente == (search) ||
      nombre.includes(search)
    );
  });
  

  //Manejo de carga y selección de Clientes --------------------------------------
  const loadClientes = () => {
    fetch('http://localhost:5000/crud/readclientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  //Control de apertura de modal de Clientes
  const openClienteModal = () => {
    setShowClienteModal(true);
  };

  //Control de clierre de modal de Clientes
  const closeClienteModal = () => {
    setShowClienteModal(false);
    setSearchQuery('');
  };

  //Actualización de valor de variable de estado de Cliente selecionado
  const selectCliente = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({
      ...formData,
      idCliente: cliente.idCliente,
    });
    closeClienteModal();
  };

  //Manejo de carga y selección de Vendedor --------------------------------------
  const loadVendedor = () => {
    fetch('http://localhost:5000/crud/readvendedor')
      .then((response) => response.json())
      .then((data) => setVendedor(data))
      .catch((error) => console.error('Error al obtener los vendedores:', error));
  };

  //Control de apertura de modal de Vendedor
  const openVendedorModal = () => {
    setShowVendedorModal(true);
  };

  //Control de clierre de modal de Vendedor
  const closeVendedorModal = () => {
    setShowVendedorModal(false);
  };

  //Actualización de valor de variable de estado de Vendedor selecionado
  const selectVendedor = (vendedor) => {
    setSelectedVendedor(vendedor);
    setFormData({
      ...formData,
      id_Vendedor: vendedor.id_Vendedor,
    });
    closeVendedorModal();
  };

  //Manejo de carga y selección de Productos --------------------------------------
  const loadProductos = () => {
    fetch('http://localhost:5000/crud/readProductos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  //Control de apertura de modal de Vendedor
  const openProductoModal = () => {
    setShowProductoModal(true);
  };

  //Control de clierre de modal de Vendedor
  const closeProductoModal = () => {
    setShowProductoModal(false);
  };

  //Actualización de valor de variable de estado de Vendedor selecionado
  const selectProducto = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      ...formData,
      id_Producto: producto.id_Producto,
    });
    closeProductoModal();
  };

   //Manejo de carga y selección de ModoPago --------------------------------------
   const loadModoPago = () => {
    fetch('http://localhost:5000/crud/readmodopagos')
      .then((response) => response.json())
      .then((data) => setModoPago(data))
      .catch((error) => console.error('Error al obtener los pagos:', error));
  };

  //Control de apertura de modal de Vendedor
  const openModoPagoModal = () => {
    setShowModoPagoModal(true);
  };

  //Control de clierre de modal de ModoPago
  const closeModoPagoModal = () => {
    setShowModoPagoModal(false);
  };

  //Actualización de valor de variable de estado de Vendedor selecionado
  const selectModoPago = (modopagos) => {
    setSelectedModoPago(modopagos);
    setFormData({
      ...formData,
      id_ModoPago: modopagos.id_ModoPago,
    });
    closeModoPagoModal();
  };

  //Carga de datos de Clientes, vendedor , Productos y pagos
  useEffect(() => {
    loadClientes ();
    loadVendedor();
    loadProductos();
    loadModoPago();
  }, []);

  const registrarVenta = () => {
    if (selectedCliente && selectedVendedor && selectedModoPago && selectedVendedor &&  fecha && Estado && TipoVentas && Direccion_Envio && detalleventa.length > 0) {
      const data = {
        id_Cliente: selectedCliente.id_Cliente,
        id_Vendedor: selectedVendedor.id_Vendedor,
        id_ModoPago: selectedModoPago.id_ModoPago,
        fecha : fecha,
        Estado: Estado,
        TipoVentas: TipoVentas,
        Direccion_Envio: Direccion_Envio,
        detalle: detalleventa,
      };

      fetch('http://localhost:5000/crud/createventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Venta registrada con éxito');
            alert('¡Venta registrada con éxito!');
            setFecha('');
            setDetalleVenta([]);
          } else {
            console.error('Error al registrar la venta');
          }
        })
        .catch((error) => {
          // Aquí maneja los errores de red u otros
          console.error('Error en la solicitud:', error);
        });
    } else {
      alert('Asegúrese de completar la información necesaria para registrar la venta.');
    }
  };


  return(
    <div>
      <Header rol={ rol } />

      <Container className="margen-contenedor">
        <Card className="espaciado">
          <Card.Body>
            <Card.Title className="mt-3 title">Registro de Venta</Card.Title>
            <Form className="mt-3" >
              <Row className="g-3">

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha venta"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="cliente" label="Cliente">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Cliente"
                      name="cliente"
                      value={selectedCliente ? selectedCliente.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openClienteModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="vendedor" label="Vendedor">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Vendedor"
                      name="vendedor"
                      value={selectedVendedor ? selectedVendedor.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openVendedorModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>
                
                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="modopagos" label="ModoPago">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar el Modo Pago"
                      name="producto"
                      value={selectedModoPago ? selectedModoPago.Nombre_ModoPago : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openModoPagoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>
                
                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="Estado" label="Estado Venta">
                    <Form.Select 
                      aria-label="Estado"
                      value={Estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option>Seleccione el Estado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Entregado">Entregado</option>
                      <option value="EnProceso">En Proceso</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                
                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="TipoVentas" label="Tipo de Venta">
                    <Form.Select 
                      aria-label="TipoVentas"
                      value={TipoVentas}
                      onChange={(e) => setTipoVentas(e.target.value)}
                    >
                      
                      <option>Seleccione el Tipo de Venta</option>
                      <option value="Presencial">Presencial</option>
                      <option value="EnLinea">En Linea</option>
              
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="10" md="3" lg="4">
                  <FloatingLabel controlId="Direccion_Envio" label="Direccion Envio">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese ela direccion de envio"
                      value={Direccion_Envio}
                      onChange={(e) => setDireccionEnvio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="producto" label="Producto">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Producto"
                      name="producto"
                      value={selectedProducto ? selectedProducto.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openProductoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="3" className="">
                  <FloatingLabel controlId="cantidadProducto" label="Cantidad">
                    <Form.Control 
                      type="number"
                      min={1} 
                      placeholder="Cantidad de Producto"
                      value={cantidadProducto}
                      onChange={(e) => setCantidadProducto(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="2" md="1" lg="1" className="d-flex align-items-center">
                  <Button onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                    <FaPlus />
                  </Button>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <Card className="global-margin-top">
                    <Card.Body>
                      <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                        {detalleventa.map((detalle) => (
                          <tr key={detalle.id_Producto}>
                            <td>{detalle.id_Producto}</td>
                            <td>{detalle.nombre}</td>
                            <td>{detalle.precio}</td>
                            <td>{detalle.cantidadProducto}</td>
                            <td>{detalle.cantidadProducto * detalle.precio}</td>
                            <td className="align-button">
                              <Button 
                                size="sm"
                                onClick={() => EliminarDetalle(detalle.id_Producto)}
                                variant="danger">
                                  
                                <FaTrashAlt />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" onClick={handleShowVerificacion} className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col sm="12" md="12" lg="12">
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
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.idCliente} onClick={() => selectCliente(cliente)}>
                  <td>{cliente.nombre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      

      <Modal show={showVendedorModal} onHide={closeVendedorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vendedor.map((vendedor) => (
            <div className="Seleccion" key={vendedor.id_Vendedor} onClick={() => selectVendedor(vendedor)}>
              {vendedor.nombre}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={showModoPagoModal} onHide={closeModoPagoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar ModoPago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modopagos.map((modopagos) => (
            <div className="Seleccion" key={modopagos.id_ModoPago} onClick={() => selectModoPago(modopagos)}>
              {modopagos.Nombre_ModoPago}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      

      <Modal show={showProductoModal} onHide={closeProductoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productos.map((producto) => (
            <div className="Seleccion" key={producto.id_Producto} onClick={() => selectProducto(producto)}>
              {producto.nombre}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={verificacion} onHide={handleCloseVerificacion}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>Cliente: {selectedCliente ? selectedCliente.nombre : ''}</ListGroup.Item>
            <ListGroup.Item>Vendedor: {selectedVendedor ? selectedVendedor.nombre : ''}</ListGroup.Item>
            <ListGroup.Item>Modo Pago: {selectedModoPago ? selectedModoPago.Nombre_ModoPago : ''}</ListGroup.Item>
            <ListGroup.Item>Estado: {Estado ? Estado: ''}</ListGroup.Item>
            <ListGroup.Item>Tipo Ventas: {TipoVentas ? TipoVentas : ''}</ListGroup.Item>
            <ListGroup.Item>Direccion_Envio: {Direccion_Envio ? Direccion_Envio : ''}</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVerificacion}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseConfirmacion}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Venta;