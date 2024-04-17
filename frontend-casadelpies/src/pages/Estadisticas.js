import React, { useEffect, useState } from 'react';  
import Header from '../components/Header'; 
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  
import jsPDF from 'jspdf';  
import Chart from 'chart.js/auto';
import '../App.css';  
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';



function Estadisticas({ rol }) { 
  const [productos, setProductos] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [chart2, setChart2] = useState(null);
  const [precio,setPrecio] = useState ([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

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
    if (productos.length > 0) { 
      const ctx = document.getElementById('myChart'); 

      if (myChart !== null) {
        myChart.destroy(); 
      }

      const nombresProductos = productos.map((producto) => producto.nombre);
      const precio = productos.map((producto) => producto.precio);

      const almacen = new Chart(ctx, { 
        type: 'doughnut',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Precio',
            data: precio,
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


  return(
    <div>
      <Header rol={ rol } />  

      <Container className="margen-contenedor">

        <Row className="espaciado">

          <Col sm="6" md="6" lg="4">
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

          <Col sm="6" md="6" lg="4">
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

          <Col sm="6" md="6" lg="4">
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

export default Estadisticas; 
