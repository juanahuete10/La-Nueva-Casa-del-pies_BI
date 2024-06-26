// src/registrarProducto.js
function registrarProducto(producto) {
  const { nombre, descripcion, precio, categoria, promociones, descuento, cantidad, imagen } = producto;

  const caracteresEspeciales = /[^a-zA-Z0-9 ]/;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return 'Error: Nombre del producto inválido';
  }
  if (!isNaN(nombre)) {
    return 'Error: El nombre del producto no puede ser números';
  }
  if (caracteresEspeciales.test(nombre)) {
    return 'Error: El nombre del producto no puede contener caracteres especiales no válidos';
  }
  
  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
    return 'Error: Descripción del producto inválida';
  }

  if (!precio || typeof precio !== 'number' || precio <= 0) {
    return 'Error: Precio del producto inválido';
  }

  if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
    return 'Error: Categoría del producto inválida';
  }

  if (promociones && typeof promociones !== 'string') {
    return 'Error: Promociones del producto inválidas';
  }

  if (descuento && (typeof descuento !== 'number' || descuento < 0)) {
    return 'Error: Descuento del producto inválido';
  }

  if (!cantidad || typeof cantidad !== 'number' || cantidad <= 0) {
    return 'Error: Cantidad del producto inválida';
  }

  if (!imagen || typeof imagen !== 'string' || imagen.trim() === '') {
    return 'Error: Imagen del producto inválida';
  }

  return 'Producto registrado correctamente';
}

module.exports = { registrarProducto };
