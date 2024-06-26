// src/ModuloLogin.js

// Función para iniciar sesión
function iniciarSesion(nombreUsuario, contrasena) {
  // Lógica para verificar el inicio de sesión
  if (nombreUsuario === 'usuarioPrueba' && contrasena === 'contrasenaPrueba') {
    return true;
  } else {
    return false;
  }
}

// Exporta la función para ser utilizada en otros archivos
module.exports = {
  iniciarSesion
};
