// spec/registrarProductoSpec.js
const { registrarProducto } = require('../src/registrarProducto');

describe('Pruebas de la función registrarProducto', () => {
  it('Debería registrar un producto con todos los campos válidos', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: 99.99,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Producto registrado correctamente');
  });

  it('Debería mostrar un error para un nombre de producto inválido', () => {
    const producto = {
      nombre: '',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: 99.99,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Nombre del producto inválido');
  });

  it('Debería mostrar un error para una descripción de producto inválida', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: '',
      precio: 99.99,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Descripción del producto inválida');
  });

  it('Debería mostrar un error para un precio de producto inválido', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: -10,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Precio del producto inválido');
  });

  it('Debería mostrar un error para una categoría de producto inválida', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: 99.99,
      categoria: '',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Categoría del producto inválida');
  });

  it('Debería mostrar un error para una cantidad de producto inválida', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: 99.99,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 0,
      imagen: 'imagen_zapatos.jpg'
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Cantidad del producto inválida');
  });

  it('Debería mostrar un error para una imagen de producto inválida', () => {
    const producto = {
      nombre: 'Zapatos deportivos',
      descripcion: 'Zapatos para correr de alta calidad',
      precio: 99.99,
      categoria: 'Calzado',
      promociones: '20% de descuento en la segunda unidad',
      descuento: 10,
      cantidad: 50,
      imagen: ''
    };
    const resultado = registrarProducto(producto);
    expect(resultado).toBe('Error: Imagen del producto inválida');
  });
});
