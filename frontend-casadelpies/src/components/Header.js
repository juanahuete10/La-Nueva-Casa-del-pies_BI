import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';



function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  // Función para cerrar sesión
  const cerrarSesion = () => {
    // Eliminar el rol del localStorage al cerrar sesión
    localStorage.removeItem('userRol');
  };

  return (
    <div>
      {rol === 'admin' && (
        <div>
          {/* Navbar principal */}
          <Navbar className="navbar-color" variant="dark" expand="md" fixed="top">
            <Container>
              <Navbar.Brand href="#home">La Nueva Casa Del Pies</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link>
                    <Link to="/" className="link-unstyled">Inicio</Link>
                  </Nav.Link>



                  <NavDropdown title="Login" id="login">
                    <NavDropdown.Item>
                      <Link to="/Login" className="link-unstyled">Inicio de Sesion</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaUsuario" className="link-unstyled">Listar Usuario</Link>
                    </NavDropdown.Item>
                  </NavDropdown>



                  <NavDropdown title="Vendedor" id="vendedor">
                    <NavDropdown.Item>
                      <Link to="/vendedor" className="link-unstyled">Registrar Vendedor</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaVendedor" className="link-unstyled">Listar Vendedor</Link>
                    </NavDropdown.Item>
                  </NavDropdown>


                  <NavDropdown title="Clientes" id="clientes">
                    <NavDropdown.Item>
                      <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/listaCliente" className="link-unstyled">Listar Clientes</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Venta" id="venta">
                    <NavDropdown.Item>
                      <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaVenta" className="link-unstyled">Listar Ventas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  


                  <NavDropdown title="Modo Pagos" id="modopagos">
                    <NavDropdown.Item>
                      <Link to="/modopagos" className="link-unstyled">Registrar Modo De Pagos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaModoPago" className="link-unstyled">Listar ModoPagos</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Producto" id="producto">
                    <NavDropdown.Item>
                      <Link to="/producto" className="link-unstyled">Registrar producto</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaProducto" className="link-unstyled">Listar Producto</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Estadisticas" className="link-unstyled">Estadística</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Marcas" id="marcas">
                    <NavDropdown.Item>
                      <Link to="/marcas" className="link-unstyled">Registrar Marcas</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaMarcas" className="link-unstyled">Listar Marcas</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/EstadisticasMarcas" className="link-unstyled">Estadística Marcas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Categorias" id="categorias">
                    <NavDropdown.Item>
                      <Link to="/categorias" className="link-unstyled">Registrar Categorias</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaCategoria" className="link-unstyled">Listar Categorias</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                 

                  <NavDropdown title="Descuentos" id="descuentos">
                    <NavDropdown.Item>
                      <Link to="/descuento" className="link-unstyled">Registrar Descuento</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/listaDescuento" className="link-unstyled">Listar Descuentos</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
                  </Nav.Link>
                    

                    
                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>


                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">About</Link>
                </Nav.Link>

                

                <NavDropdown title="Login" id="login">
                  <NavDropdown.Item>
                    <Link to="/Login" className="link-unstyled">Inicio de Sesion</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaUsuario" className="link-unstyled">Listar Usuario</Link>
                  </NavDropdown.Item>
                </NavDropdown>



                <NavDropdown title="Vendedor" id="vendedor">
                  <NavDropdown.Item>
                    <Link to="/vendedor" className="link-unstyled">Registrar Vendedor</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaVendedor" className="link-unstyled">Listar Vendedor</Link>
                  </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/customer" className="link-unstyled">Registrar Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/listaCliente" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Ventas" id="venta">
                  <NavDropdown.Item>
                    <Link to="/ventas" className="link-unstyled">Registrar Ventas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaVenta" className="link-unstyled">Listar Ventas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Modo Pagos" id="modopagos">
                  <NavDropdown.Item>
                    <Link to="/modopagos" className="link-unstyled">Registrar Modo De Pagos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaModoPago" className="link-unstyled">Listar ModoPagos</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Producto" id="producto">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Registrar producto</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/listaProducto" className="link-unstyled">Listar Producto</Link>
                  </NavDropdown.Item>

                  <Nav.Link>
                    <Link to="/Estadisticas" className="link-unstyled">Estadisticas</Link>
                  </Nav.Link>
                </NavDropdown>

                <NavDropdown title="Marcas" id="marcas">
                  <NavDropdown.Item>
                    <Link to="/marcas" className="link-unstyled">Registrar Marcas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaMarcas" className="link-unstyled">Listar Marcas</Link>
                  </NavDropdown.Item>

                  <Nav.Link>
                    <Link to="/EstadisticasMarcas" className="link-unstyled">Estadísticas Marca</Link>
                  </Nav.Link>

                </NavDropdown>

                <NavDropdown title="Categorias" id="categorias">
                  <NavDropdown.Item>
                    <Link to="/categorias" className="link-unstyled">Registrar Categorias</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaCategoria" className="link-unstyled">Listar Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown title="Descuentos" id="descuentos">
                  <NavDropdown.Item>
                    <Link to="/descuento" className="link-unstyled">Registrar Descuento</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/listaDescuentos" className="link-unstyled">Listar Descuentos</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                
                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                </Nav.Link>


              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>)}

      {rol === 'clientes' && (
        <div>

          <Navbar
            className="navbar-color" variant="dark" expand="md" fixed="top">
            <Container>
              <Navbar.Brand href="#home">La Nueva Casa Del Pies</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
             
                <NavDropdown title="Galeria" id="galeria">
                  <NavDropdown.Item>
                    <Link to="/Galeria" className="link-unstyled">Galeria</Link>
                  </NavDropdown.Item>
              
                  </NavDropdown>

                  
                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
           
</div>)} 

{rol === 'vendedor' && (
        <div>

          <Navbar
            className="navbar-color" variant="dark" expand="md" fixed="top">
            <Container>
              <Navbar.Brand href="#home">La Nueva Casa Del Pies</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <NavDropdown title="Clientes" id="clientes">
                    <NavDropdown.Item>
                      <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/listaCliente" className="link-unstyled">Listar Clientes</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                <NavDropdown title="Venta" id="venta">
                  <NavDropdown.Item>
                    <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaVenta" className="link-unstyled">Listar Ventas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

               

                <NavDropdown title="Modo Pagos" id="modopagos">
                  <NavDropdown.Item>
                    <Link to="/modopagos" className="link-unstyled">Registrar Modo De Pagos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaModoPago" className="link-unstyled">Listar ModoPagos</Link>
                  </NavDropdown.Item>
                </NavDropdown>

              
              <Nav.Link>
                <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
              </Nav.Link>

              
      
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
           
</div>)} 
 
</div >

  );
  
}

export default Header;