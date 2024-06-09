import React, { useEffect, useState } from 'react';  
import Header from '../components/Header'; 
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  
import jsPDF from 'jspdf';  
import Chart from 'chart.js/auto';
import '../App.css';  
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';

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

  //productos con poca ganancias

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
        let y = 15;

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

// Definición de la función generarReporteAlmacenImg como una función asíncrona
const generarReporteAlmacenImg = async () => {
  try {
  
    const canvas = await html2canvas(document.getElementById('myChart'));
    
    const pdf = new jsPDF();
   
    const imgData = canvas.toDataURL('image/png');
    
    pdf.text("Reporte de Estado de Almacén", 20, 10);

    pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
   
    pdf.save("reporte_almacen_con_grafico.pdf");
  } catch (error) {
  
    console.error('Error al generar el reporte con imagen:', error);
  }
};

const imprimirEstadisticas = () => {
  console.log("Imprimiendo estadísticas...");
};

  return(
    <div>
      <Header rol={ rol } />  

      <Container className="margen-contenedor">

        <Row className="espaciado">

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por vendedor</Card.Title>
                <canvas id="graficoVendedores"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por marca</Card.Title>
                <canvas id="graficoVentasPorMarca"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por cliente</Card.Title>
                <canvas id="graficoVentasPorCliente"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por producto</Card.Title>
                <canvas id="graficoVentasPorProducto"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por día de la semana</Card.Title>
              <canvas id="graficoVentasPorDiaSemana" height="300"></canvas>
            </Card.Body>
            <Card.Body>
              <Button onClick={generarReporteAlmacen}>
                Generar reporte
              </Button>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="6" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por mes y año</Card.Title>
              <canvas id="graficoVentasPorMesAnio" height="300"></canvas>
            </Card.Body>
            <Card.Body>
              <Button onClick={generarReporteAlmacen}>
                Generar reporte
              </Button>
            </Card.Body>
            
          </Card>
        </Col>

        <Col sm="6" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas totales por tipo de venta</Card.Title>
              <canvas id="graficoVentasPorTipo" height="300"></canvas>
            </Card.Body>
            <Card.Body>
              <Button onClick={generarReporteAlmacen}>
                Generar reporte
              </Button>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="6" md="6" lg="4" className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ingresos anuales por año</Card.Title>
              <canvas id="graficoIngresosAnuales" height="300"></canvas>
            </Card.Body>
            <Card.Body>
              <Button onClick={generarReporteAlmacen}>
                Generar reporte
              </Button>
            </Card.Body>

          </Card>
        </Col>

        <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ganancias de los Productos</Card.Title>
                <canvas id="graficoProductosGanancias" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Ventas totales por Categoría de Producto</Card.Title>
                <canvas id="graficoVentasPorCategoriaProducto" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Promedio de Ventas por Producto</Card.Title>
                <canvas id="graficoPromedioVentasPorProducto" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>
              
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Productos más Vendidos por Cantidad</Card.Title>
                <canvas id="graficoProductosMasVendidos" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
                <canvas id="myChart"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>

            </Card>
          </Col>

          <Col sm="6" md="6" lg="4" className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Productos por Categoría</Card.Title>
                <canvas id="myCategories" height="120"></canvas>
              </Card.Body>

                <Card.Body>
                  <Button onClick={generarReporteAlmacen}>
                  Generar PDF
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

      <Footer/>

    </div>
  );
}

export default Reportes; 
