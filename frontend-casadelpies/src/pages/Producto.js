import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../App.css';

// Crear un estado para cada campo del formulario
function Producto({rol}) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState(''); // Corregir el nombre de la variable
  const [precio, setPrecio] = useState('');

  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorias
  const [id_Categoria, setId_Categoria] = useState(''); // Estado para el valor seleccionado

  const [marcas, setMarcas] = useState([]); // Estado para almacenar las especialidades
  const [id_Marca, setId_Marca] = useState(''); // Estado para el valor seleccionado

  const [promocionesydescuentos, setPromocionesyDescuentos] = useState([]); // Estado para almacenar las promociones y descuentos
  const [id_Promociones, setId_Promociones] = useState(''); // Estado para el valor seleccionado


  const [imagen, setImagen] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
    }; 
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };





    // Crear un objeto con los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id_Categoria,
      nombre,
      descripcion, // Usar la variable corregida
      precio,
      id_Marca,
      id_Promociones,
      imagen
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createProductos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        setId_Categoria('');
        setNombre('');
        setDescripcion(''); // Reiniciar la variable corregida
        setPrecio('');
        setId_Marca('');
        setId_Promociones('');
        setImagen('');

      } else {
        alert('Asegurese de que todos los campos esten lleno');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las categorias
    fetch('http://localhost:5000/crud/readcategorias')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las Categorias obtenidas
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
      });
  }, []);

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las marcas
    fetch('http://localhost:5000/crud/readmarca')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las Marcas obtenidas
        setMarcas(data);
      })
      .catch(error => {
        console.error('Error al obtener las Marcas', error);
      });
  }, []);


  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las PromocionesyDescuentos
    fetch('http://localhost:5000/crud/readpromociones')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las PromocionesyDescuentos obtenidas
        setPromocionesyDescuentos(data);
      })
      .catch(error => {
        console.error('Error al obtener las Promociones', error);
      });
  }, []);


  return (
    <div>
      <Header rol={ rol}/>

      <Container>
        <Card className="espaciado">
          <Card.Body>
            <Card.Title>Registrar Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.replace(/\d/g,''))}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la Descripcion del producto"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value.replace(/\d/g,''))} // Corregir el nombre de la función de estado
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="PrecioC$">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio del producto"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Categoria" label="Categoria">
                    <Form.Select
                      aria-label="Categoria"
                      value={id_Categoria}
                      onChange={(e) => setId_Categoria(e.target.value)}
                    >
                      <option>Seleccione la categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id_Categoria} value={categoria.id_Categoria}>
                          {categoria.nombre_C}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>



                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Marca" label="Marca">
                    <Form.Select
                      aria-label="Marca"
                      value={id_Marca}
                      onChange={(e) => setId_Marca(e.target.value)}
                    >
                      <option>Seleccione la marca</option>
                      {marcas.map((marca) => (
                        <option key={marca.id_Marca} value={marca.id_Marca}>
                          {marca.nombre_Marca}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>



                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="id_Promociones" label="Promocion">
                    <Form.Select
                      aria-label="promocionesydescuentos"
                      value={id_Promociones}
                      onChange={(e) => setId_Promociones(e.target.value)}
                    >
                      <option>Seleccione las promocionesydescuentos</option>
                      {promocionesydescuentos.map((promocionesydescuentos) => (
                        <option key={promocionesydescuentos.id_Promociones} value={promocionesydescuentos.id_Promociones}>
                          {promocionesydescuentos.condiciones}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>


                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="" >
                    <Form.Control 
                      type="file" 
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
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

export default Producto;
