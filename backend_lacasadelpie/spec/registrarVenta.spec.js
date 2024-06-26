// spec/registrarVentaSpec.js
const { registrarVenta } = require('../src/registrarVenta');

describe('Pruebas de la función registrarVenta', () => {
  it('Debería registrar una venta con todos los campos válidos', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Venta registrada correctamente');
  });

  it('Debería mostrar un error para un modo de pago inválido', () => {
    const venta = {
      modoDePago: '',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Modo de pago inválido');
  });

  it('Debería mostrar un error para una dirección de envío inválida', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: '',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Dirección de envío inválida');
  });

  it('Debería mostrar un error para un cliente inválido', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: '',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Cliente inválido');
  });

  it('Debería mostrar un error para un producto inválido', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: '',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Producto inválido');
  });

  it('Debería mostrar un error para una cantidad inválida', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 0,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Cantidad inválida');
  });

  it('Debería mostrar un error para un vendedor inválido', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: '',
      tipoDeVenta: 'Online',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Vendedor inválido');
  });

  it('Debería mostrar un error para un tipo de venta inválido', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: '',
      fecha: new Date()
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Tipo de venta inválido');
  });

  it('Debería mostrar un error para una fecha inválida', () => {
    const venta = {
      modoDePago: 'Tarjeta de crédito',
      direccionEnvio: 'Calle Falsa 123',
      cliente: 'Juan Pérez',
      producto: 'Laptop',
      cantidad: 1,
      vendedor: 'Pedro Martínez',
      tipoDeVenta: 'Online',
      fecha: 'fecha inválida'
    };
    const resultado = registrarVenta(venta);
    expect(resultado).toBe('Error: Fecha inválida');
  });
});
