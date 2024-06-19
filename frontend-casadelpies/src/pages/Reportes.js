import React, { useEffect, useState } from 'react';  
import Header from '../components/Header'; 
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  
import jsPDF from 'jspdf';  
import Chart from 'chart.js/auto';
import '../App.css';  
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaEnvelopeCircleCheck, FaImage, FaFilePdf } from 'react-icons/fa6';

function Reportes({ rol }) { 
  const [productos, setProductos] = useState([]);
  //Instancia de graficos
  const [myChart, setMyChart] = useState(null);
  const [chart2, setChart2] = useState(null);
  const [graficoVendedores, setgraficoVendedores] = useState(null);
  const [graficoVentasPorMarca, setgraficoVentasPorMarca] = useState(null);
  const [graficoVentasPorCliente, setGraficoVentasPorCliente] = useState(null);
  const [graficoVentasPorProducto, setGraficoVentasPorProducto] = useState(null);
  const [graficoVentasPorDiaSemana, setGraficoVentasPorDiaSemana] = useState(null);
  const [graficoVentasPorMesAnio, setGraficoVentasPorMesAnio] = useState(null);
  const [graficoVentasPorTipo, setGraficoVentasPorTipo] = useState(null);
  const [graficoIngresosAnuales, setGraficoIngresosAnuales] = useState(null);
  const [graficoProductosGanancias, setGraficoProductosGanancias] = useState(null);
  const [graficoVentasPorCategoriaProducto, setGraficoVentasPorCategoriaProducto] = useState(null);
  const [graficoPromedioVentasPorProducto, setGraficoPromedioVentasPorProducto] = useState(null);
  const [graficoProductosMasVendidos, setGraficoProductosMasVendidos] = useState(null);

  //Variables con datos
  const [ventasTotalesPorVendedor,setVentasTotalesPorVendedor] = useState ([]);
  const [ventasPorMarca,setVentasPorMarca] = useState ([]);
  const [ventasPorCliente, setVentasPorCliente] = useState([]);
  const [ventasPorProducto, setVentasPorProducto] = useState([]);
  const [ventasPorDiaSemana, setVentasPorDiaSemana] = useState([]);
  const [ventasPorMesAnio, setVentasPorMesAnio] = useState([]);
  const [ventasPorTipo, setVentasPorTipo] = useState([]);
  const [ingresosAnuales, setIngresosAnuales] = useState([]);
  const [productosGanancias, setProductosGanancias] = useState([]);
  const [ventasPorCategoriaProducto, setVentasPorCategoriaProducto] = useState([]);
  const [promedioVentasPorProducto, setPromedioVentasPorProducto] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  const [precio,setPrecio] = useState ([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

  //rutas para los graficos

  useEffect(() => {
    fetch('http://localhost:5000/crud/readProductos')  
      .then((response) => response.json()) 
      .then((data) => setProductos(data)) 
      .catch((error) => console.error('Error al obtener los productos:', error)); 
  }, []); 

  useEffect(() => {
    fetch('http://localhost:5000/crud/productosPorCategoria')
    .then((response) => response.json())
    .then((data) => setProductosPorCategoria(data))
    .catch((error) => console.error('Error al obtener los productos por categoría:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/vendedores')  
      .then((response) => response.json()) 
      .then((data) => setVentasTotalesPorVendedor(data)) 
      .catch((error) => console.error('Error al obtener las ventas por vendedor:', error)); 
  }, []); 

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventaspormarca')  
      .then((response) => response.json()) 
      .then((data) => setVentasPorMarca(data)) 
      .catch((error) => console.error('Error al obtener las ventas por marca:', error)); 
  }, []); 

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventasporcliente')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por cliente:', data);
        setVentasPorCliente(data);
      })
      .catch(error => console.error('Error al obtener las ventas por cliente:', error));
  }, []); 

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventasporproducto')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por producto:', data);
        setVentasPorProducto(data);
      })
      .catch(error => console.error('Error al obtener las ventas por producto:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventaspordiasemana')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por día de la semana:', data);
        setVentasPorDiaSemana(data);
      })
      .catch(error => console.error('Error al obtener las ventas por día de la semana:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventaspormesyanio')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por mes y año:', data);
        setVentasPorMesAnio(data);
      })
      .catch(error => console.error('Error al obtener las ventas por mes y año:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventasportipo')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por tipo:', data);
        setVentasPorTipo(data);
      })
      .catch(error => console.error('Error al obtener las ventas por tipo:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/tiempoingresoanualporanio')
      .then(response => response.json())
      .then(data => {
        console.log('Ingresos anuales por año:', data);
        setIngresosAnuales(data);
      })
      .catch(error => console.error('Error al obtener los ingresos anuales por año:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/productosganancias')
      .then(response => response.json())
      .then(data => {
        console.log('Ganancias de los productos:', data);
        setProductosGanancias(data);
      })
      .catch(error => console.error('Error al obtener las ganancias de los productos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/ventasporcategoriaproducto')
      .then(response => response.json())
      .then(data => {
        console.log('Ventas por categoría de producto:', data);
        setVentasPorCategoriaProducto(data);
      })
      .catch(error => console.error('Error al obtener las ventas por categoría de producto:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/promedioventasporproducto')
      .then(response => response.json())
      .then(data => {
        console.log('Promedio de ventas por producto:', data);
        setPromedioVentasPorProducto(data);
      })
      .catch(error => console.error('Error al obtener el promedio de ventas por producto:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/Estadisticas/productosmasvendidos')
      .then(response => response.json())
      .then(data => {
        console.log('Productos más vendidos:', data);
        setProductosMasVendidos(data);
      })
      .catch(error => console.error('Error al obtener los productos más vendidos:', error));
  }, []);

  //vendedor, enviar Email-----------------------------------------------------------------------------------------

  //función para formatear los datos a enviar por correo
  const formatearVentasTotalesPorVendedor = (ventasTotalesPorVendedor) => {
    return ventasTotalesPorVendedor.map(ventaTotalPorVendedor => {
      return `Nombre: ${ventaTotalPorVendedor.nombre} \nCantidad de ventas: ${ventaTotalPorVendedor.cantidad_ventas}`;
    }).join('\n\n');
  };

  //método para realizar el envío de los datos correspondientes
  const enviarCorreo = () => {
    // Formateo de datos
    const ventasTotalesPorVendedorFormateadas = formatearVentasTotalesPorVendedor(ventasTotalesPorVendedor);

    // Datos 
    const data = {
      title: 'Estas son las estadisticas de Ventas totales por vendedor',
      subject: 'Reporte de ventas totales por vendedor',
      to_name: 'Usuario',
      user_email: 'rubiom831@gmail.com',
      message: ventasTotalesPorVendedorFormateadas 
    };

    // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

  //Marca, enviar Email-------------------------------------------------------------------------------------------

  // Función para formatear los datos a enviar por correo
  const formatearVentasPorMarca = (ventasPorMarca) => {
    return ventasPorMarca.map(ventaPorMarca => {
      return `Marca: ${ventaPorMarca.marca} \nCantidad de ventas: ${ventaPorMarca.cantidad_ventas}`;
    }).join('\n\n');
  };

  // Método para realizar el envío de los datos correspondientes
  const enviarCorreo2 = () => {
    // Formateo de datos
    const ventasPorMarcaFormateadas = formatearVentasPorMarca(ventasPorMarca);

    // Datos 
    const data = {
      title: 'Estas son las estadísticas de Ventas por Marca',
      subject: 'Reporte de ventas por marca',
      to_name: 'Usuario',
      user_email: 'rubiom831@gmail.com',
      message: ventasPorMarcaFormateadas 
    };

      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

  //cliente, enviar Email-----------------------------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorCliente = (ventasPorCliente) => {
      return ventasPorCliente.map(venta => {
        return `Nombre del Cliente: ${venta.Nombre_Cliente} \nTotal de Ventas: ${venta.Total_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo3 = () => {
      // Formateo de datos
      const ventasPorClienteFormateadas = formatearVentasPorCliente(ventasPorCliente);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Cliente',
        subject: 'Reporte de ventas por cliente',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorClienteFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //producto, enviar Email-----------------------------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorProducto = (ventasPorProducto) => {
      return ventasPorProducto.map(venta => {
        return `Producto: ${venta.Producto} \nTotal de Ventas: ${venta.Total_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo4 = () => {
      // Formateo de datos
      const ventasPorProductoFormateadas = formatearVentasPorProducto(ventasPorProducto);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Producto',
        subject: 'Reporte de ventas por producto',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorProductoFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //ventas por dia de la semana, enviar Email----------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorDiaSemana = (ventasPorDiaSemana) => {
      return ventasPorDiaSemana.map(venta => {
        return `Día de la Semana: ${venta.Dia_Semana} \nTotal de Ventas: ${venta.Total_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo5 = () => {
      // Formateo de datos
      const ventasPorDiaSemanaFormateadas = formatearVentasPorDiaSemana(ventasPorDiaSemana);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Día de la Semana',
        subject: 'Reporte de ventas por día de la semana',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorDiaSemanaFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //ventas por mes y año, enviar Email-----------------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorMesAnio = (VentasPorMesAnio) => {
      return VentasPorMesAnio.map(venta => {
        return `Mes/Año: ${venta.Mes}/${venta.Año} \nTotal de Ventas: ${venta.Total_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo6 = () => {
      // Formateo de datos
      const ventasPorMesAnioFormateadas = formatearVentasPorMesAnio(ventasPorMesAnio);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Mes y Año',
        subject: 'Reporte de ventas por mes y año',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorMesAnioFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //Ventas totales por tipo de venta, enviar Email-----------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorTipo = (ventasPorTipo) => {
      return ventasPorTipo.map(venta => {
        return `Tipo de Ventas: ${venta.TipoVentas} \nTotal de Ventas: ${venta.Total_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo7 = () => {   
      // Formateo de datos
      const ventasPorTipoFormateadas = formatearVentasPorTipo(ventasPorTipo);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Tipo',
        subject: 'Reporte de ventas por tipo',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorTipoFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //Ingresos anuales por año, enviar Email-------------------------------------------------------------------------

  // Función para formatear los datos a enviar por correo
  const formatearIngresosAnuales = (ingresosAnuales) => {
    return ingresosAnuales.map(ingreso => {
      return `Año: ${ingreso.Año} \nIngresos del Año Actual: ${ingreso.Ingresos_Año_Actual}`;
    }).join('\n\n');
  };

  // Método para realizar el envío de los datos correspondientes
  const enviarCorreo8 = () => {
    // Formateo de datos
    const ingresosAnualesFormateados = formatearIngresosAnuales(ingresosAnuales);

    // Datos 
    const data = {
      title: 'Estas son las estadísticas de Ingresos Anuales',
      subject: 'Reporte de ingresos anuales',
      to_name: 'Usuario',
      user_email: 'rubiom831@gmail.com',
      message: ingresosAnualesFormateados 
    };

    // Envía el correo utilizando EmailJS
    emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
    .then((response) => {
      alert('Correo enviado.');
      console.log('Correo enviado.', response);
    })
    .catch((error) => {
      alert('Error al enviar el correo.');
      console.error('Error al enviar el correo:', error);
    });
  };

  //Ganancias de los Productos, enviar Email-----------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearProductosGanancias = (productosGanancias) => {
      return productosGanancias.map(producto => {
        return `Producto: ${producto.Producto} \nVentas Totales: ${producto.Ventas_Totales}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo9 = () => {
      // Formateo de datos
      const productosGananciasFormateadas = formatearProductosGanancias(productosGanancias);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ganancias por Producto',
        subject: 'Reporte de ganancias por producto',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: productosGananciasFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };
  
  //Ventas totales por Categoría de Producto, enviar Email----------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearVentasPorCategoriaProducto = (ventasPorCategoriaProducto) => {
      return ventasPorCategoriaProducto.map(venta => {
        return `Categoría: ${venta.nombre_C} \nVentas Totales: ${venta.Ventas_Totales}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo10 = () => {
      // Formateo de datos
      const ventasPorCategoriaProductoFormateadas = formatearVentasPorCategoriaProducto(ventasPorCategoriaProducto);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Ventas por Categoría de Producto',
        subject: 'Reporte de ventas por categoría de producto',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: ventasPorCategoriaProductoFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //Promedio de Ventas por Producto, enviar Email------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearPromedioVentasPorProducto = (promedioVentasPorProducto) => {
      return promedioVentasPorProducto.map(venta => {
        return `Producto: ${venta.Producto} \nPromedio de Ventas: ${venta.Promedio_Ventas}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo11 = () => {
      // Formateo de datos
      const promedioVentasPorProductoFormateadas = formatearPromedioVentasPorProducto(promedioVentasPorProducto);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas del Promedio de Ventas por Producto',
        subject: 'Reporte del promedio de ventas por producto',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: promedioVentasPorProductoFormateadas 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };
  
  //Productos más Vendidos por Cantidad, enviar Email--------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearProductosMasVendidos = (productosMasVendidos) => {
      return productosMasVendidos.map(producto => {
        return `Producto: ${producto.Producto} \nCantidad Total Vendida: ${producto.Cantidad_Total_Vendida}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo12 = () => {
      // Formateo de datos
      const productosMasVendidosFormateados = formatearProductosMasVendidos(productosMasVendidos);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de los Productos Más Vendidos',
        subject: 'Reporte de productos más vendidos',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: productosMasVendidosFormateados 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //Estado del almacen, enviar Email-------------------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearProductos = (productos) => {
      return productos.map(producto => {
        return `Producto: ${producto.nombre} \nCantidad: ${producto.cantidad}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo13 = () => {
      // Formateo de datos
      const productosFormateados = formatearProductos(productos);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas del estado del almacen ',
        subject: 'Reporte del estado del almacen',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: productosFormateados 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //Productos por Categoría, enviar Email--------------------------------------------------------------------------

    // Función para formatear los datos a enviar por correo
    const formatearProductosPorCategoria = (productosPorCategoria) => {
      return productosPorCategoria.map(categoria => {
        return `Categoría: ${categoria.nombre_C} \nCantidad de Productos: ${categoria.CantidadProductos}`;
      }).join('\n\n');
    };
  
    // Método para realizar el envío de los datos correspondientes
    const enviarCorreo14 = () => {
      // Formateo de datos
      const productosPorCategoriaFormateados = formatearProductosPorCategoria(productosPorCategoria);
  
      // Datos 
      const data = {
        title: 'Estas son las estadísticas de Productos por Categoría',
        subject: 'Reporte de productos por categoría',
        to_name: 'Usuario',
        user_email: 'rubiom831@gmail.com',
        message: productosPorCategoriaFormateados 
      };
  
      // Envía el correo utilizando EmailJS
      emailjs.send('service_j9u86er', 'template_4gxkjsk', data, '4cMyLqQtskFFYTSVz')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
    };

  //función para guardar los datos de las estadísticas en un archivo de excel--------------------------------------

  //Ventas totales por vendedor------------------------------------------------------------------------------------

  const exportarVentasAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(ventasTotalesPorVendedor);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Vendedor');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_vendedor.xlsx');
  };

  //Ventas totales por marca---------------------------------------------------------------------------------------

  const exportarVentasPorMarcaAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorMarca.map(ventaPorMarca => ({
      Marca: ventaPorMarca.marca,
      'Cantidad de Ventas': ventaPorMarca.cantidad_ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Marca');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_marca.xlsx');
  };

  //Ventas totales por cliente-------------------------------------------------------------------------------------

  const exportarVentasPorClienteAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorCliente.map(venta => ({
      'Nombre del Cliente': venta.Nombre_Cliente,
      'Total de Ventas': venta.Total_Ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Cliente');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_cliente.xlsx');
  };

  //Ventas totales por producto------------------------------------------------------------------------------------

  const exportarVentasPorProductoAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorProducto.map(venta => ({
      'Producto': venta.Producto,
      'Total de Ventas': venta.Total_Ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Producto');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_producto.xlsx');
  };

  //Ventas totales por día de la semana----------------------------------------------------------------------------

  const exportarVentasPorDiaSemanaAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorDiaSemana.map(venta => ({
      'Día de la Semana': venta.Dia_Semana,
      'Total de Ventas': venta.Total_Ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Día de la Semana');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_dia_semana.xlsx');
  };

  //Ventas totales por mes y año-----------------------------------------------------------------------------------

  const exportarVentasPorMesAnioAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorMesAnio.map(venta => ({
      'Mes/Año': `${venta.Mes}/${venta.Año}`,
      'Total de Ventas': venta.Total_Ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    const sheetName = 'VentasPorMesAnio'; // Nombre sin caracteres especiales
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_mes_anio.xlsx');
  };

  //Ventas totales por tipo de venta-------------------------------------------------------------------------------

  const exportarVentasPorTipoAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorTipo.map(venta => ({
      'Tipo de Ventas': venta.TipoVentas,
      'Total de Ventas': venta.Total_Ventas
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Tipo');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_tipo.xlsx');
  };

  //Ingresos anuales por año---------------------------------------------------------------------------------------

  const exportarIngresosAnualesAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ingresosAnuales.map(ingreso => ({
      'Año': ingreso.Año,
      'Ingresos Anuales': ingreso.Ingresos_Año_Actual
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ingresos Anuales');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ingresos_anuales.xlsx');
  };

  //Ganancias de los Productos-------------------------------------------------------------------------------------

  const exportarProductosGananciasAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = productosGanancias.map(producto => ({
      'Producto': producto.Producto,
      'Ganancias': producto.Ventas_Totales
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos y Ganancias');
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'productos_ganancias.xlsx');
  };

  //Ventas totales por Categoría de Producto-----------------------------------------------------------------------

  const exportarVentasPorCategoriaProductoAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = ventasPorCategoriaProducto.map(venta => ({
      'Categoría': venta.nombre_C,
      'Ventas Totales': venta.Ventas_Totales
    }));
  
    // Truncar el nombre de la hoja si excede los 31 caracteres
    const nombreHoja = 'Ventas Por Categoría';
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja.substring(0, 31)); 
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ventas_por_categoria_producto.xlsx');
  };

  //Promedio de Ventas por Producto--------------------------------------------------------------------------------

  const exportarPromedioVentasPorProductoAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = promedioVentasPorProducto.map(venta => ({
      'Producto': venta.Producto,
      'Promedio de Ventas': venta.Promedio_Ventas
    }));
  
    // Truncar el nombre de la hoja si excede los 31 caracteres
    const nombreHoja = 'Promedio Ventas Producto';
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja.substring(0, 31));
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'promedio_ventas_producto.xlsx');
  };

  //Productos más Vendidos por Cantidad----------------------------------------------------------------------------

  const exportarProductosMasVendidosAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = productosMasVendidos.map(producto => ({
      'Producto': producto.Producto,
      'Cantidad Total Vendida': producto.Cantidad_Total_Vendida
    }));
  
    // Truncar el nombre de la hoja si excede los 31 caracteres
    const nombreHoja = 'Productos Más Vendidos';
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja.substring(0, 31)); 
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'productos_mas_vendidos.xlsx');
  };

  //Estado del almacen---------------------------------------------------------------------------------------------

  const exportarProductosAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = productos.map(producto => ({
      'Nombre del Producto': producto.nombre,
      'Cantidad': producto.cantidad
    }));
  
    // Truncar el nombre de la hoja si excede los 31 caracteres
    const nombreHoja = 'Productos'; 
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja.substring(0, 31));
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Estado_del_almacen.xlsx');
  };

  //Productos por Categoría----------------------------------------------------------------------------------------

  const exportarProductosPorCategoriaAExcel = () => {
    // Convertir los datos a una hoja de trabajo de Excel
    const datos = productosPorCategoria.map(categoria => ({
      'Categoría': categoria.nombre_C,
      'Cantidad de Productos': categoria.CantidadProductos
    }));
  
    // Truncar el nombre de la hoja si excede los 31 caracteres
    const nombreHoja = 'Productos por Categoría';
  
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja.substring(0, 31));
  
    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'productos_por_categoria.xlsx');
  };

  //---------------------------------------------------------------------------------------------------------------

  //cantidad de productos------------------------------------------------------------------------------------------

  useEffect(() => {
    if (productos.length > 0) { 
      const ctx = document.getElementById('myChart'); 

      if (myChart !== null) {
        myChart.destroy(); 
      }

      const nombresProductos = productos.map((producto) => producto.nombre);
      const cantidad = productos.map((producto) => producto.cantidad);

      const almacen = new Chart(ctx, { 
        type: 'doughnut',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Candidad de Productos',
            data: cantidad,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],  
            borderColor: 'rgba(54, 162, 235, 1)',  
            borderWidth: 1 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true 
            }
          }
        }
      });
      setMyChart(almacen);
    }
  }, [productos]);

  //productos por categoria----------------------------------------------------------------------------------------

  useEffect(() => {
    if (productosPorCategoria.length > 0) {
      const ctx = document.getElementById('myCategories');

      if (chart2 !== null) {
        chart2.destroy(); 
      }

      const labels = productosPorCategoria.map((categoria) => categoria.nombre_C);
      const data = productosPorCategoria.map((categoria) => categoria.CantidadProductos);

      const categorias = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de productos por categoría',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cantidad de productos por categoría'
            }
          }
        }
      });
      setChart2(categorias);
    }
  }, [productosPorCategoria]);

  //ventas por vendedor--------------------------------------------------------------------------------------------
  
  useEffect(() => {
    if (ventasTotalesPorVendedor.length > 0) { 
      const ctx = document.getElementById('graficoVendedores'); 

      if (graficoVendedores !== null) {
        graficoVendedores.destroy(); 
      }

      const nombres = ventasTotalesPorVendedor.map((ventaTotalPorVendedor) => ventaTotalPorVendedor.nombre);
      const totales = ventasTotalesPorVendedor.map((ventaTotalPorVendedor) => ventaTotalPorVendedor.cantidad_ventas);

      const gVendedores = new Chart(ctx, { 
        type: 'bar',
        data: {
          labels: nombres,
          datasets: [{
            label: 'Cantidades de ventas',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],  
            borderColor: 'rgba(54, 162, 235, 1)',  
            borderWidth: 1 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true 
            }
          }
        }
      });
      setgraficoVendedores(gVendedores);
    }
  }, [ventasTotalesPorVendedor]);

  //ventas por marca------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorMarca.length > 0) { 
      const ctx = document.getElementById('graficoVentasPorMarca'); 

      if (graficoVentasPorMarca !== null) {
        graficoVentasPorMarca.destroy(); 
      }

      const marcas = ventasPorMarca.map((ventaPorMarca) => ventaPorMarca.marca);
      const cantidad_ventas = ventasPorMarca.map((ventaPorMarca) => ventaPorMarca.cantidad_ventas);

      const gMarca = new Chart(ctx, { 
        type: 'bar',
        data: {
          labels: marcas,
          datasets: [{
            label: 'Cantidades de ventas por marca',
            data: cantidad_ventas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],  
            borderColor: 'rgba(54, 162, 235, 1)',  
            borderWidth: 1 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true 
            }
          }
        }
      });
      setgraficoVentasPorMarca(gMarca);
    }
  }, [ventasPorMarca]);

  //ventas por cliente----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorCliente.length > 0) {
      const ctx = document.getElementById('graficoVentasPorCliente').getContext('2d');
      if (graficoVentasPorCliente) graficoVentasPorCliente.destroy();

      const clientes = ventasPorCliente.map(venta => venta.Nombre_Cliente);
      const totales = ventasPorCliente.map(venta => venta.Total_Ventas);

      const newChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: clientes,
          datasets: [{
            label: 'Ventas por Cliente',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorCliente(newChart);
    }
  }, [ventasPorCliente]);

  //ventas por producto---------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorProducto.length > 0) {
      const ctx = document.getElementById('graficoVentasPorProducto').getContext('2d');
      if (graficoVentasPorProducto) graficoVentasPorProducto.destroy();

      const productos = ventasPorProducto.map(venta => venta.Producto);
      const totales = ventasPorProducto.map(venta => venta.Total_Ventas);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: productos,
          datasets: [{
            label: 'Ventas por Producto',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorProducto(newChart);
    }
  }, [ventasPorProducto]);

  //ventas por dia de la semana-------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorDiaSemana.length > 0) {
      const ctx = document.getElementById('graficoVentasPorDiaSemana').getContext('2d');
      if (graficoVentasPorDiaSemana) graficoVentasPorDiaSemana.destroy();

      const dias = ventasPorDiaSemana.map(venta => venta.Dia_Semana);
      const totales = ventasPorDiaSemana.map(venta => venta.Total_Ventas);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dias,
          datasets: [{
            label: 'Ventas por Día de la Semana',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorDiaSemana(newChart);
    }
  }, [ventasPorDiaSemana]);

    //ventas por mes y año------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorMesAnio.length > 0) {
      const ctx = document.getElementById('graficoVentasPorMesAnio').getContext('2d');
      if (graficoVentasPorMesAnio) graficoVentasPorMesAnio.destroy();

      const labels = ventasPorMesAnio.map(venta => `${venta.Mes}/${venta.Año}`);
      const totales = ventasPorMesAnio.map(venta => venta.Total_Ventas);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ventas por Mes y Año',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorMesAnio(newChart);
    }
  }, [ventasPorMesAnio]);

  //ventas por tipo-------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorTipo.length > 0) {
      const ctx = document.getElementById('graficoVentasPorTipo').getContext('2d');
      if (graficoVentasPorTipo) graficoVentasPorTipo.destroy();

      const tipos = ventasPorTipo.map(venta => venta.TipoVentas);
      const totales = ventasPorTipo.map(venta => venta.Total_Ventas);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: tipos,
          datasets: [{
            label: 'Ventas por Tipo de Venta',
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorTipo(newChart);
    }
  }, [ventasPorTipo]);

  //ingreso anuales por año----------------------------------------------------------------------------------------

  useEffect(() => {
    if (ingresosAnuales.length > 0) {
      const ctx = document.getElementById('graficoIngresosAnuales').getContext('2d');
      if (graficoIngresosAnuales) graficoIngresosAnuales.destroy();

      const labels = ingresosAnuales.map(ingreso => ingreso.Año);
      const ingresos = ingresosAnuales.map(ingreso => ingreso.Ingresos_Año_Actual);

      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ingresos Anuales por Año',
            data: ingresos,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoIngresosAnuales(newChart);
    }
  }, [ingresosAnuales]);

  //productos con poca ganancias-------------------------------------------------------------------------------------

  useEffect(() => {
    if (productosGanancias.length > 0) {
      const ctx = document.getElementById('graficoProductosGanancias').getContext('2d');
      if (graficoProductosGanancias) graficoProductosGanancias.destroy();

      const productos = productosGanancias.map(producto => producto.Producto);
      const ganancias = productosGanancias.map(producto => producto.Ventas_Totales);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: productos,
          datasets: [{
            label: 'Ganancias de los Productos',
            data: ganancias,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoProductosGanancias(newChart);
    }
  }, [productosGanancias]);

  // Ventas totales por categoría de producto----------------------------------------------------------------------

  useEffect(() => {
    if (ventasPorCategoriaProducto.length > 0) {
      const ctx = document.getElementById('graficoVentasPorCategoriaProducto').getContext('2d');
      if (graficoVentasPorCategoriaProducto) graficoVentasPorCategoriaProducto.destroy();

      const categorias = ventasPorCategoriaProducto.map(venta => venta.nombre_C);
      const ventasTotales = ventasPorCategoriaProducto.map(venta => venta.Ventas_Totales);

      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categorias,
          datasets: [{
            label: 'Ventas por Categoría de Producto',
            data: ventasTotales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoVentasPorCategoriaProducto(newChart);
    }
  }, [ventasPorCategoriaProducto]);

  // Promedio de ventas por producto-------------------------------------------------------------------------------

  useEffect(() => {
    if (promedioVentasPorProducto.length > 0) {
      const ctx = document.getElementById('graficoPromedioVentasPorProducto').getContext('2d');
      if (graficoPromedioVentasPorProducto) graficoPromedioVentasPorProducto.destroy();

      const productos = promedioVentasPorProducto.map(venta => venta.Producto);
      const promedios = promedioVentasPorProducto.map(venta => venta.Promedio_Ventas);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: productos,
          datasets: [{
            label: 'Promedio de Ventas por Producto',
            data: promedios,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoPromedioVentasPorProducto(newChart);
    }
  }, [promedioVentasPorProducto]);

  // Top 10 productos más vendidos por cantidad-------------------------------------------------------------------

  useEffect(() => {
    if (productosMasVendidos.length > 0) {
      const ctx = document.getElementById('graficoProductosMasVendidos').getContext('2d');
      if (graficoProductosMasVendidos) graficoProductosMasVendidos.destroy();

      const productos = productosMasVendidos.map(producto => producto.Producto);
      const cantidades = productosMasVendidos.map(producto => producto.Cantidad_Total_Vendida);

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: productos,
          datasets: [{
            label: 'Productos más Vendidos por Cantidad',
            data: cantidades,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setGraficoProductosMasVendidos(newChart);
    }
  }, [productosMasVendidos]);


  //-----------------------------------------------------------------------------------------------------------------

  //Codigos para generar reportes
  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readProductos') 
      .then((response) => response.json())  
      .then((productos) => {
        const doc = new jsPDF();  
        let y = 20;

        doc.text("Reporte de Estado de Almacén", 20, 10);

        productos.forEach((producto) => {
          doc.text(`Nombre: ${producto.nombre}`, 20, y);
          doc.text(`Precio: ${producto.precio}`, 20, y + 10);


          y += 30; 
          if (y >= 280) {  
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_almacen.pdf"); 
      })
      .catch((error) => console.error('Error al obtener los productos:', error)); 
  };

// Definición de la función generarReporteAlmacenImg como una función asíncrona-----------------------------------
const generarReporteAlmacenImg = async () => {
  try {
  
    const canvas = await html2canvas(document.getElementById('myChart'));
    
    const pdf = new jsPDF();
   
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Estado de Almacén", 66, 10);

    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
   
    pdf.save("reporte_almacen_con_grafico.pdf");
  } catch (error) {
  
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes
const generarReporteCategorias = () => {
  fetch('http://localhost:5000/crud/productosPorCategoria') 
    .then((response) => response.json())  
    .then((productos) => {
      const doc = new jsPDF();  
      let y = 20;

      doc.text("Reporte de Productos por Categoría", 20, 10);

      productos.forEach((producto) => {
        doc.text(`Nombre_C: ${producto.nombre_C}`, 20, y);
        doc.text(`CantidadProductos: ${producto.CantidadProductos}`, 20, y + 10);

        y += 40; 
        if (y >= 280) {  
          doc.addPage();
          y = 15;
        }
      });

      doc.save("reporte_productos_por_categoria.pdf"); 
    })
    .catch((error) => console.error('Error al obtener los productos por categoría:', error)); 
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona
const generarReporteCategoriasImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('myCategories'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Productos por Categoría", 60, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_productos_por_categoria_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes
const generarReporteVendedores = () => {
  fetch('http://localhost:5000/Estadisticas/vendedores') 
    .then((response) => response.json())  
    .then((vendedores) => {
      const doc = new jsPDF();  
      let y = 20;

      doc.text("Reporte de Ventas por Vendedor", 20, 10);

      vendedores.forEach((vendedor) => {
        doc.text(`Nombre: ${vendedor.nombre}`, 20, y);
        doc.text(`Apellido: ${vendedor.apellido}`, 20, y + 10);
        doc.text(`Cantidad de Ventas: ${vendedor.cantidad_ventas}`, 20, y + 20);

        y += 50; 
        if (y >= 280) {  
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_vendedor.pdf"); 
    })
    .catch((error) => console.error('Error al obtener las ventas por vendedor:', error)); 
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteVendedoresImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVendedores'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Vendedor", 60, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ventas_por_vendedor_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteMarcas = () => {
  fetch('http://localhost:5000/Estadisticas/ventaspormarca')
    .then((response) => response.json())
    .then((marcas) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Marca", 20, 10);

      marcas.forEach((marca) => {
        doc.text(`Marca: ${marca.marca}`, 20, y);
        doc.text(`Cantidad de Ventas: ${marca.cantidad_ventas}`, 20, y + 10);

        y += 40;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_marca.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por marca:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteMarcasImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorMarca'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Marca", 65, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ventas_por_marca_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteClientes = () => {
  fetch('http://localhost:5000/Estadisticas/ventasporcliente')
    .then((response) => response.json())
    .then((clientes) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Cliente", 20, 10);

      clientes.forEach((cliente) => {
        doc.text(`Nombre del Cliente: ${cliente.Nombre_Cliente}`, 20, y);
        doc.text(`Total de Ventas: ${cliente.Total_Ventas}`, 20, y + 10);

        y += 40;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_cliente.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por cliente:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteClientesImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorCliente'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Cliente", 65, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_ventas_por_cliente_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteProductos = () => {
  fetch('http://localhost:5000/Estadisticas/ventasporproducto')
    .then((response) => response.json())
    .then((productos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Producto", 20, 10);

      productos.forEach((producto) => {
        doc.text(`Producto: ${producto.Producto}`, 20, y);
        doc.text(`Total de Ventas: ${producto.Total_Ventas}`, 20, y + 10);

        y += 40;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_producto.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por producto:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteProductosImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorProducto'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Producto", 65, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_ventas_por_producto_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteDiaSemana = () => {
  fetch('http://localhost:5000/Estadisticas/ventaspordiasemana')
    .then((response) => response.json())
    .then((dias) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Día de la Semana", 20, 10);

      dias.forEach((dia) => {
        doc.text(`Día de la Semana: ${dia.Dia_Semana}`, 20, y);
        doc.text(`Total de Ventas: ${dia.Total_Ventas}`, 20, y + 10);

        y += 40;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_dia_de_la_semana.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por día de la semana:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteDiaSemanaImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorDiaSemana'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Día de la Semana", 65, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ventas_por_dia_de_la_semana_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteMesAnio = () => {
  fetch('http://localhost:5000/Estadisticas/ventaspormesyanio')
    .then((response) => response.json())
    .then((meses) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Mes y Año", 20, 10);

      meses.forEach((mes) => {
        doc.text(`Año: ${mes.Año}`, 20, y);
        doc.text(`Mes: ${mes.Mes}`, 20, y + 10);
        doc.text(`Total de Ventas: ${mes.Total_Ventas}`, 20, y + 20);

        y += 50;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_mes_y_anio.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por mes y año:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteMesAnioImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorMesAnio'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Mes y Año", 63, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ventas_por_mes_y_anio_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteVentasPorTipo = () => {
  fetch('http://localhost:5000/Estadisticas/ventasportipo')
    .then((response) => response.json())
    .then((tipos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Tipo", 20, 10);

      tipos.forEach((tipo) => {
        doc.text(`Tipo de Venta: ${tipo.TipoVentas}`, 20, y);
        doc.text(`Total de Ventas: ${tipo.Total_Ventas}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_tipo.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por tipo:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteVentasPorTipoImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorTipo'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Tipo", 70, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_ventas_por_tipo_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteIngresosAnuales = () => {
  fetch('http://localhost:5000/Estadisticas/tiempoingresoanualporanio')
    .then((response) => response.json())
    .then((ingresos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ingresos Anuales por Año", 20, 10);

      ingresos.forEach((ingreso) => {
        doc.text(`Año: ${ingreso.Año}`, 20, y);
        doc.text(`Ingresos del Año Actual: ${ingreso.Ingresos_Año_Actual}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ingresos_anuales_por_año.pdf");
    })
    .catch((error) => console.error('Error al obtener los ingresos anuales por año:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteIngresosAnualesImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoIngresosAnuales'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ingresos Anuales por Año", 58, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_ingresos_anuales_por_año_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteProductosGanancias = () => {
  fetch('http://localhost:5000/Estadisticas/productosganancias')
    .then((response) => response.json())
    .then((productos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ganancias por Producto", 20, 10);

      productos.forEach((producto) => {
        doc.text(`Producto: ${producto.Producto}`, 20, y);
        doc.text(`Ventas Totales: ${producto.Ventas_Totales}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ganancias_por_producto.pdf");
    })
    .catch((error) => console.error('Error al obtener las ganancias de los productos:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteProductosGananciasImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoProductosGanancias'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ganancias por Producto", 63, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ganancias_por_producto_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteVentasPorCategoria = () => {
  fetch('http://localhost:5000/Estadisticas/ventasporcategoriaproducto')
    .then((response) => response.json())
    .then((categorias) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Ventas por Categoría de Producto", 20, 10);

      categorias.forEach((categoria) => {
        doc.text(`Categoría: ${categoria.nombre_C}`, 20, y);
        doc.text(`Ventas Totales: ${categoria.Ventas_Totales}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_ventas_por_categoria.pdf");
    })
    .catch((error) => console.error('Error al obtener las ventas por categoría de producto:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteVentasPorCategoriaImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoVentasPorCategoriaProducto'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Categoría de Producto", 49, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); // Ajusta las coordenadas y el tamaño de la imagen según tu necesidad
    pdf.save("reporte_ventas_por_categoria_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReportePromedioVentasPorProducto = () => {
  fetch('http://localhost:5000/Estadisticas/promedioventasporproducto')
    .then((response) => response.json())
    .then((productos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Promedio de Ventas por Producto", 20, 10);

      productos.forEach((producto) => {
        doc.text(`Producto: ${producto.Producto}`, 20, y);
        doc.text(`Promedio de Ventas: ${producto.Promedio_Ventas}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_promedio_ventas_por_producto.pdf");
    })
    .catch((error) => console.error('Error al obtener el promedio de ventas por producto:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReportePromedioVentasPorProductoImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoPromedioVentasPorProducto'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Ventas por Vendedor", 65, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100);
    pdf.save("reporte_ventas_por_vendedor_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};


//----------------------------------------------------------------------------------------------------------------

// Codigos para generar reportes

const generarReporteProductosMasVendidos = () => {
  fetch('http://localhost:5000/Estadisticas/productosmasvendidos')
    .then((response) => response.json())
    .then((productos) => {
      const doc = new jsPDF();
      let y = 20;

      doc.text("Reporte de Productos más Vendidos", 20, 10);

      productos.forEach((producto) => {
        doc.text(`Producto: ${producto.Producto}`, 20, y);
        doc.text(`Cantidad Total Vendida: ${producto.Cantidad_Total_Vendida}`, 20, y + 10);

        y += 30;
        if (y >= 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("reporte_productos_mas_vendidos.pdf");
    })
    .catch((error) => console.error('Error al obtener los productos más vendidos:', error));
};

// Definición de la función generarReporteCategoriasImg como una función asíncrona

const generarReporteProductosMasVendidosImg = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('graficoProductosMasVendidos'));
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Productos más Vendidos", 63, 10);
    pdf.addImage(imgData, 'PNG', 54, 20, 100, 100); 
    pdf.save("reporte_ventas_por_vendedor_con_grafico.pdf");
  } catch (error) {
    console.error('Error al generar el reporte con imagen:', error);
  }
};

//----------------------------------------------------------------------------------------------------------------

const imprimirEstadisticas = () => {
  console.log("Imprimiendo estadísticas...");
};

  return(
    <div>
      <Header rol={ rol } />  

      <Container className="margen-contenedor">

        <Row className="espaciado">

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por vendedor</Card.Title>
                <canvas id="graficoVendedores"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteVendedores}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteVendedoresImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarVentasAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por marca</Card.Title>
                <canvas id="graficoVentasPorMarca"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={generarReporteMarcas}>
                  <FaFilePdf style={{ color: 'cyan' }} />
                </Button>
                <Button onClick={generarReporteMarcasImg}>
                  <FaImage style={{ color: 'purple' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo2}>
                  <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                </Button>
                <Button variant="success" onClick={exportarVentasPorMarcaAExcel}>
                  <FaFileExcel style={{ color: 'white' }} />
                </Button>
              </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por cliente</Card.Title>
                <canvas id="graficoVentasPorCliente"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={generarReporteClientes}>
                  <FaFilePdf style={{ color: 'cyan' }} />
                </Button>
                <Button onClick={generarReporteClientesImg}>
                  <FaImage style={{ color: 'purple' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo3}>
                  <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                </Button>
                <Button variant="success" onClick={exportarVentasPorClienteAExcel}>
                  <FaFileExcel style={{ color: 'white' }} />
                </Button>
              </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por producto</Card.Title>
                <canvas id="graficoVentasPorProducto"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={generarReporteProductos}>
                  <FaFilePdf style={{ color: 'cyan' }} />
                </Button>
                <Button onClick={generarReporteProductosImg}>
                  <FaImage style={{ color: 'purple' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo4}>
                  <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                </Button>
                <Button variant="success" onClick={exportarVentasPorProductoAExcel}>
                  <FaFileExcel style={{ color: 'white' }} />
                </Button>
              </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por día de la semana</Card.Title>
              <canvas id="graficoVentasPorDiaSemana" height="300"></canvas>
            </Card.Body>

            <Card.Body>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={generarReporteDiaSemana}>
                <FaFilePdf style={{ color: 'cyan' }} />
              </Button>
              <Button onClick={generarReporteDiaSemanaImg}>
                <FaImage style={{ color: 'purple' }} />
              </Button>
              <Button variant="secondary" onClick={enviarCorreo5}>
                <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
              </Button>
              <Button variant="success" onClick={exportarVentasPorDiaSemanaAExcel}>
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
            </div>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por mes y año</Card.Title>
              <canvas id="graficoVentasPorMesAnio" height="300"></canvas>
            </Card.Body>

            <Card.Body>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={generarReporteMesAnio}>
                <FaFilePdf style={{ color: 'cyan' }} />
              </Button>
              <Button onClick={generarReporteMesAnioImg}>
                <FaImage style={{ color: 'purple' }} />
              </Button>
              <Button variant="secondary" onClick={enviarCorreo6}>
                <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
              </Button>
              <Button variant="success" onClick={exportarVentasPorMesAnioAExcel}>
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
            </div>
            </Card.Body>
            
          </Card>
        </Col>

        <Col sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por tipo de venta</Card.Title>
              <canvas id="graficoVentasPorTipo" height="300"></canvas>
            </Card.Body>

            <Card.Body>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={generarReporteVentasPorTipo}>
                <FaFilePdf style={{ color: 'cyan' }} />
              </Button>
              <Button onClick={generarReporteVentasPorTipoImg}>
                <FaImage style={{ color: 'purple' }} />
              </Button>
              <Button variant="secondary" onClick={enviarCorreo7}>
                <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
              </Button>
              <Button variant="success" onClick={exportarVentasPorTipoAExcel}>
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
            </div>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="12" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ingresos anuales por año</Card.Title>
              <canvas id="graficoIngresosAnuales" height="300"></canvas>
            </Card.Body>

            <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={generarReporteIngresosAnuales}>
                  <FaFilePdf style={{ color: 'cyan' }} />
                </Button>
                <Button onClick={generarReporteIngresosAnualesImg}>
                  <FaImage style={{ color: 'purple' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo8}>
                  <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                </Button>
                <Button variant="success" onClick={exportarIngresosAnualesAExcel}>
                  <FaFileExcel style={{ color: 'white' }} />
                </Button>
              </div>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ganancias de los Productos</Card.Title>
                <canvas id="graficoProductosGanancias" height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteProductosGanancias}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteProductosGananciasImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo9}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarProductosGananciasAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por Categoría de Producto</Card.Title>
                <canvas id="graficoVentasPorCategoriaProducto" height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteVentasPorCategoria}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteVentasPorCategoriaImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo10}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarVentasPorCategoriaProductoAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Promedio de Ventas por Producto</Card.Title>
                <canvas id="graficoPromedioVentasPorProducto" height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReportePromedioVentasPorProducto}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReportePromedioVentasPorProductoImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo11}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarPromedioVentasPorProductoAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>
              
            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Productos más Vendidos por Cantidad</Card.Title>
                <canvas id="graficoProductosMasVendidos" height="300"></canvas>
              </Card.Body>

              <Card.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteProductosMasVendidos}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteProductosMasVendidosImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo12}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarProductosMasVendidosAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
                <canvas id="myChart" height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteAlmacen}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteAlmacenImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo13}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarProductosAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Productos por Categoría</Card.Title>
                <canvas id="myCategories" height="120"></canvas>
              </Card.Body>

              <Card.Body>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={generarReporteCategorias}>
                    <FaFilePdf style={{ color: 'cyan' }} />
                  </Button>
                  <Button onClick={generarReporteCategoriasImg}>
                    <FaImage style={{ color: 'purple' }} />
                  </Button>
                  <Button variant="secondary" onClick={enviarCorreo14}>
                    <FaEnvelopeCircleCheck style={{ color: 'darkgray' }} />
                  </Button>
                  <Button variant="success" onClick={exportarProductosPorCategoriaAExcel}>
                    <FaFileExcel style={{ color: 'white' }} />
                  </Button>
                </div>
              </Card.Body>

            </Card>
          </Col>


        </Row>
      </Container>

    </div>
  );
}

export default Reportes; 
