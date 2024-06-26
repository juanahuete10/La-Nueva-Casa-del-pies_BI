// spec/ModuloLogin.spec.js

// Importa las dependencias necesarias
const ModuloLogin = require('../src/ModuloLogin'); // Asume que ModuloLogin.js está en src/

// Define los datos de prueba directamente aquí
const nombre_usuario = 'usuarioPrueba';
const Contrasena = 'contrasenaPrueba';

// Describe el conjunto de pruebas para el módulo de login
describe('Módulo de Login', () => {

  // Prueba para verificar la función de login con datos válidos
  it('debería iniciar sesión correctamente con nombre de usuario y contraseña válidos', () => {
    const resultado = ModuloLogin.iniciarSesion(nombre_usuario, Contrasena);
    expect(resultado).toBeTruthy();
  });

  // Prueba para verificar el manejo de datos inválidos
  it('debería manejar datos de inicio de sesión incorrectos', () => {
    const resultado = ModuloLogin.iniciarSesion('usuarioIncorrecto', 'contrasenaIncorrecta');
    expect(resultado).toBeFalsy();
  });

  // Puedes añadir más pruebas según sea necesario
});
