CREATE DATABASE IF NOT EXISTS fisico;

USE fisico;

CREATE TABLE IF NOT EXISTS d_vendedor (
  id_Vendedor INT PRIMARY KEY,
  id_Usuario INT,
  nombre VARCHAR(30),
  apellido VARCHAR(30),
  direccion VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS h_venta (
  id_Fecha INT PRIMARY KEY,
  id_Vendedor INT,
  id_Producto INT,
  id_ModoPago INT,
  id_Cliente INT
);

CREATE TABLE IF NOT EXISTS d_modopagos (
  id_ModoPago INT PRIMARY KEY,
  Nombre_ModoPago VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS d_clientes (
  id_Cliente INT PRIMARY KEY,
  id_Usuario INT,
  nombre VARCHAR(30),
  apellido VARCHAR(30),
  cedula VARCHAR(16),
  historialdecompras TEXT
);

CREATE TABLE IF NOT EXISTS d_tiempo (
  id_Fecha INT PRIMARY KEY,
  Anyo INT,
  mes INT,
  desc_mes VARCHAR(20),
  semana_anyo INT,
  dia INT,
  desc_dia VARCHAR(20),
  hora INT,
  minute INT
);

ALTER TABLE h_venta
ADD CONSTRAINT fk_vendedor FOREIGN KEY (id_Vendedor) REFERENCES d_vendedor(id_Vendedor),
ADD CONSTRAINT fk_modopago FOREIGN KEY (id_ModoPago) REFERENCES d_modopagos(id_ModoPago),
ADD CONSTRAINT fk_cliente FOREIGN KEY (id_Cliente) REFERENCES d_clientes(id_Cliente),
ADD CONSTRAINT fk_fecha FOREIGN KEY (id_Fecha) REFERENCES d_tiempo(id_Fecha);