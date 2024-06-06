import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ListaCliente from './pages/ListaCliente';
import Categorias from './pages/Categorias';
import ListaCategoria from './pages/ListaCategoria';
import Marcas from './pages/Marcas';
import ListaMarcas from './pages/ListaMarcas';
import ModoPagos from './pages/ModoPagos';
import ListaModoPago from './pages/ListaModoPago';
import Producto from'./pages/Producto';
import ListaProducto from './pages/ListaProducto';
import Descuento from './pages/Descuento';
import ListaDescuento from './pages/ListaDescuento';
import Venta from './pages/Venta';
import ListaVenta from './pages/ListaVenta';
import Usuario from './pages/Usuario';
import ListaUsuario from './pages/ListaUsuario';
import Vendedor from './pages/Vendedor';
import ListaVendedor from './pages/ListaVendedor';
import Login from './pages/Login';
import Galeria from './pages/Galeria';
import Estadisticas from './pages/Estadisticas';
import EstadisticasMarcas from './pages/EstadisticaMarcas';
import Reportes from './pages/Reportes';
import SinAcceso from './pages/SinAcceso';



function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/Cliente" element={userRol ? <Cliente rol={userRol}/> : <Navigate to="sinacceso"/>} />
        <Route path="/ListaCliente" element={userRol ? <ListaCliente rol={userRol}/> : <Navigate to="sinacceso" />} />
        <Route path="/Marcas" element={userRol ? <Marcas rol={userRol}/> : <Navigate to="sinacceso" />} />
        <Route path="/ListaMarcas" element={userRol ?<ListaMarcas rol={userRol}/> :<Navigate to="sinacceso" />} />
        <Route path="/Categorias" element={userRol ? <Categorias rol={userRol}/> : <Navigate to="sinacceso" />} />
        <Route path="/ListaCategoria" element={userRol ? <ListaCategoria rol={userRol} /> : <Navigate to="sinacceso" />} />
        <Route path="/ModoPagos" element={userRol ? <ModoPagos rol={userRol} /> : <Navigate to="sinacceso" />} />
        <Route path="/ListaModoPago" element={userRol ? <ListaModoPago rol={userRol}/> : <Navigate to="sinacceso"/>} />
        <Route path="/Producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/ListaProducto" element={userRol ? <ListaProducto rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/descuento" element={userRol ? <Descuento rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/listaDescuento" element={userRol ? <ListaDescuento rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/Venta" element={userRol ? <Venta rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/ListaVenta" element={userRol ? <ListaVenta rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/Usuario" element={userRol ? <Usuario rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/ListaUsuario" element={userRol ? <ListaUsuario rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/vendedor" element={userRol ? <Vendedor userRol={userRol}/> : <Navigate to="sinacceso"/>} />
        <Route path="/ListaVendedor" element={userRol ? <ListaVendedor rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/galeria" element={userRol ? <Galeria rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/Estadisticas" element={userRol ? <Estadisticas rol={userRol} /> : <Navigate to="sinacceso"/>} />
        <Route path="/EstadisticasMarcas" element={userRol ? <EstadisticasMarcas rol={userRol} /> : <Navigate to="sinacceso" />} />
        <Route path="/Reportes" element={userRol ? <Reportes rol={userRol} /> : <Navigate to="sinacceso" />} />
        <Route path="/sinacceso" element={<SinAcceso />} />
  
      </Routes>
    </Router>
  );
}

export default App;