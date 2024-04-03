import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

function Ventas({rol}) {

  // Crear un estado para cada campo del formulario
  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [id_Cliente, setId_Cliente] = useState('');

  const [vendedor, setVendedor] = useState([]); // Estado para almacenar los vendedor
  const [id_Vendedor, setId_Vendedor] = useState('');

  const [cantidadProducto, setCantidadProducto] = useState('');

  const [modopagos, setModoPagos] = useState([]); // Estado para almacenar los modo de pagos
  const [id_ModoPago, setId_ModoPago] = useState('');

  const [fecha, setFecha] = useState('');
  const [Estado, setEstado] = useState('');
  const [TipoVentas, setTipoVentas] = useState('');
  const [Direccion_Envio, setDireccionEnvio] = useState('');
  const [Total_Venta, setTotalVenta] = useState('');




  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      id_Cliente,
      id_Vendedor,  
      cantidadProducto,  
      id_ModoPago,  
      fecha, 
      Estado, 
      TipoVentas,
      Direccion_Envio ,
      Total_Venta
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createVentas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setId_Cliente('');
        setId_Vendedor('');
        setCantidadProducto('');
        setId_ModoPago('');
        setFecha('');
        setEstado('');
        setTipoVentas('');
        setDireccionEnvio('');
        setTotalVenta('');
    
      } else {
        alert('Error al registrar la venta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  
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




  return(
    <div>
      <Header rol={ rol }/>
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Ventas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">


              <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Cliente" label="Cliente">
                    <Form.Select
                      aria-label="Cliente"
                      value={id_Cliente}
                      onChange={(e) => setId_Cliente(e.target.value)}
                      
                    >
                      <option>Seleccione el Cliente</option>
                      {clientes.map((clientes) => (
                        <option key={clientes.id_Cliente} value={clientes.id_Cliente}>
                          {clientes.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Vendedor" label="Vendedor">
                    <Form.Select
                      aria-label="Vendedor"
                      value={id_Vendedor}
                      onChange={(e) => setId_Vendedor(e.target.value)}
                    >
                      <option>Seleccione el vendedor</option>
                      {vendedor.map((vendedor) => (
                        <option key={vendedor.id_Vendedor} value={vendedor.id_Vendedor}>
                          {vendedor.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>


             
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="cantidadProducto" label="Cantidad de Producto">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cantidad de producto"
                      value={cantidadProducto}
                      onChange={(e) => setCantidadProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_ModoPago" label="Nombre Modo Pago">
                    <Form.Select
                      aria-label="Nombre Modo Pagp"
                      value={id_ModoPago}
                      onChange={(e) => setId_ModoPago(e.target.value)}
                    >
                      <option>Seleccione el modo de Pago</option>
                      {modopagos.map((modopago) => (
                        <option key={modopago.id_ModoPago} value={modopago.id_ModoPago}>
                          {modopago.Nombre_ModoPago}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la Fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="6">
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

                <Col sm="6" md="6" lg="6">
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

              


                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Direccion_Envio" label="Direccion Envio">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese ela direccion de envio"
                      value={Direccion_Envio}
                      onChange={(e) => setDireccionEnvio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Total_Venta" label="Total Venta">
                    <Form.Control
                      type="number"
                      placeholder="Total de la venta"
                      value={Total_Venta}
                      onChange={(e) => setTotalVenta(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

              

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}
export default Ventas;