// src/registrarVenta.js
function registrarVenta(venta) {
  const { modoDePago, direccionEnvio, cliente, producto, cantidad, vendedor, tipoDeVenta, fecha } = venta;

  const caracteresEspeciales = /[^a-zA-Z0-9 ]/;

  if (!modoDePago || typeof modoDePago !== 'string' || modoDePago.trim() === '') {
    return 'Error: Modo de pago inválido';
  }

  if (!direccionEnvio || typeof direccionEnvio !== 'string' || direccionEnvio.trim() === '') {
    return 'Error: Dirección de envío inválida';
  }

  if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
    return 'Error: Cliente inválido';
  }

  if (!producto || typeof producto !== 'string' || producto.trim() === '') {
    return 'Error: Producto inválido';
  }

  if (!cantidad || typeof cantidad !== 'number' || cantidad <= 0) {
    return 'Error: Cantidad inválida';
  }

  if (!vendedor || typeof vendedor !== 'string' || vendedor.trim() === '') {
    return 'Error: Vendedor inválido';
  }

  if (!tipoDeVenta || typeof tipoDeVenta !== 'string' || tipoDeVenta.trim() === '') {
    return 'Error: Tipo de venta inválido';
  }

  if (!fecha || !(fecha instanceof Date) || isNaN(fecha)) {
    return 'Error: Fecha inválida';
  }

  return 'Venta registrada correctamente';
}

module.exports = { registrarVenta };
