CREATE DATABASE hec_dim;

USE hec_dim;

CREATE TABLE d_ModoPagos (
  id_ModoPago Int NOT NULL PRIMARY KEY,
  Nombre_ModoPago Varchar(20)

);

CREATE TABLE d_Vendedor (
  id_Vendedor Int NOT NULL PRIMARY KEY,
  direccion Varchar(60),
  telefono Varchar(8),
  nombre Varchar(30),
  apellido Varchar(30)

);



CREATE TABLE d_Clientes (
  id_Cliente Int NOT NULL PRIMARY KEY,
  cedula Varchar(16),
  nombre Varchar(30),
  apellido Varchar(30),
  historialdecompras Varchar(200)
);


CREATE TABLE h_Ventas (
  id_hv Int NOT NULL PRIMARY KEY, 
  cod_Venta Int , 
  id_Cliente Int,
  id_Producto Int,
  id_Vendedor Int,
  fecha Date,
  Estado Varchar(20),
  TipoVentas Varchar(20),
  Direccion_Envio Varchar(100),
  precio_Unit Int,
  total_Venta Int
 );

CREATE TABLE d_Producto (
id_Producto INT NOT NULL PRIMARY KEY,
Producto varchar(30),
nombre_C Varchar (30),
nombre Varchar(30),
Precio decimal(12,2),
marca Varchar(30),
cantidadProducto Int
);

ALTER TABLE h_Ventas
ADD COLUMN id_ModoPago INT,
ADD CONSTRAINT fk_ModoPago FOREIGN KEY (id_ModoPago) 
REFERENCES d_ModoPagos(id_ModoPago);

ALTER TABLE h_Ventas
ADD CONSTRAINT fk_Vendedor
FOREIGN KEY (id_Vendedor) 
REFERENCES d_Vendedor(id_Vendedor);

ALTER TABLE h_Ventas
ADD CONSTRAINT fk_Cliente
FOREIGN KEY (id_Cliente) 
REFERENCES d_Clientes(id_Cliente);

ALTER TABLE h_Ventas
ADD CONSTRAINT fk_Producto 
FOREIGN KEY (id_Producto)  
REFERENCES d_Producto(id_Producto);