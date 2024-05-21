CREATE DATABASE casadelpies1;
USE casadelpies1;

CREATE TABLE Categorias (
  id_Categoria Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_C Varchar(30),
  descripcion Varchar(50)
);

CREATE TABLE Marcas (
  id_Marca Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Marca Varchar(60)
);

CREATE TABLE ModoPagos (
  id_ModoPago Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Nombre_ModoPago Varchar(20)

);

CREATE TABLE PromocionesyDescuentos (
  id_Promociones Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  codigoDescuentos Int,
  condiciones Varchar(30),
  fecha_Inicio Date,
  fecha_Fin Date
);

CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar (20) NOT NULL
);

CREATE TABLE Vendedor (
  id_Vendedor Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  direccion Varchar(60),
  telefono Varchar(8),
  nombre Varchar(30),
  apellido Varchar(30),
  id_Usuario Int UNIQUE
);

CREATE TABLE Clientes (
  id_Cliente Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cedula Varchar(16),
  nombre Varchar(30),
  apellido Varchar(30),
  historialdecompras Varchar(200),
  id_Usuario Int UNIQUE
);

CREATE TABLE Productos (
  id_Producto Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_Categoria Int,
  nombre Varchar(30),
  descripcion Varchar(200),
  precio Decimal(12,2),
  id_Marca Int,
  id_Promociones Int,
  cantidad INT,
  imagen LONGTEXT
);

CREATE TABLE DetalleVenta (
  id_detalleVenta Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cod_Venta Int,
  cantidad Int,
  id_producto Int,
  PrecioUnitario Int,
  TotalDetalle int
);

CREATE TABLE Ventas (
  cod_Venta Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_Cliente Int,
  id_Vendedor Int,
  cantidadProducto Int,
  id_ModoPago Int,
  fecha Date,
  Estado Varchar(50),
  TipoVentas Varchar(20),
  Direccion_Envio Varchar(50),
  total_Venta Int
  
);

 CREATE TABLE bitacora (
 id_bitacora INT NOT NULL AUTO_INCREMENT,
 transaccion VARCHAR(10) NOT NULL,
 usuario VARCHAR (40),
 fecha DATETIME NOT NULL,
 tabla VARCHAR (22) NOT NULL,
 PRIMARY KEY (id_bitacora)
 );
 

ALTER TABLE DetalleVenta 
ADD CONSTRAINT FK_DetalleVenta_cod_Venta
FOREIGN KEY (cod_Venta) 
REFERENCES Ventas (cod_Venta);

ALTER TABLE Productos
ADD CONSTRAINT FK_Productos_id_Categoria
FOREIGN KEY (id_Categoria) 
REFERENCES Categorias (id_Categoria);

ALTER TABLE Productos 
ADD CONSTRAINT FK_Productos_id_Marca
FOREIGN KEY (id_Marca) 
REFERENCES Marcas (id_Marca);

ALTER TABLE Productos 
ADD CONSTRAINT FK_Productos_id_Promociones
FOREIGN KEY (id_Promociones) 
REFERENCES PromocionesyDescuentos (id_Promociones);


ALTER TABLE Ventas 
ADD CONSTRAINT FK_Ventas_id_Cliente 
FOREIGN KEY (id_Cliente) 
REFERENCES Clientes (id_Cliente);

ALTER TABLE Ventas
ADD CONSTRAINT FK_Ventas_id_ModoPago
FOREIGN KEY (id_ModoPago)
REFERENCES ModoPagos(id_ModoPago);


ALTER TABLE Ventas 
ADD CONSTRAINT FK_Ventas_id_Vendedor
FOREIGN KEY (id_Vendedor) 
REFERENCES Vendedor (id_Vendedor);

ALTER TABLE DetalleVenta 
ADD CONSTRAINT FK_DetalleVenta_id_producto 
FOREIGN KEY (id_producto) 
REFERENCES Productos (id_Producto);

ALTER TABLE Clientes 
ADD CONSTRAINT FK_Clientes_id_Usuario
FOREIGN KEY (id_Usuario) 
REFERENCES Usuario (id_Usuario);

ALTER TABLE Vendedor 
ADD CONSTRAINT FK_Vendedor_id_Usuario
FOREIGN KEY (id_Usuario) 
REFERENCES Usuario (id_Usuario);

SELECT 
    P.id_Producto,
    P.nombre AS Producto,
    C.nombre_C,
    P.precio,
    M.nombre_Marca AS marca,
    DV.cantidad AS cantidadProducto
FROM 
    Productos AS P
INNER JOIN 
    Categorias AS C ON P.id_Categoria = C.id_Categoria
INNER JOIN 
    Marcas AS M ON P.id_Marca = M.id_Marca
INNER JOIN 
    DetalleVenta AS DV ON DV.cod_Venta = P.id_producto;
    
/*Crear un nuevo usuario*/
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)
VALUES ('Mauri', '2024', 'admin');
