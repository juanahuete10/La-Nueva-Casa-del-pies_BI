/*Inserciones para el casadelpies1*/
USE casadelpies1;

/*Crear un administrador para poder ingresar al inicio de seción del Proyecto*/
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)
VALUES ('Mauri', '2024', 'admin');

INSERT INTO Categorias (nombre_C, descripcion) VALUES
('Deportivos', 'Zapatos deportivos para actividades físicas'),
('Formales', 'Zapatos formales para ocasiones especiales'),
('Casuales', 'Zapatos casuales para uso diario'),
('Botas', 'Botas para diferentes terrenos'),
('Sandalias', 'Sandalias para climas cálidos'),
('Mocasines', 'Zapatos elegantes y cómodos'),
('Zapatillas', 'Zapatillas para correr y caminar'),
('Bailarinas', 'Zapatos planos y cómodos'),
('Alpargatas', 'Zapatos de lona y esparto'),
('Oxford', 'Zapatos formales de cuero');

INSERT INTO Marcas (nombre_Marca) VALUES
('Nike'),
('Adidas'),
('Puma'),
('Reebok'),
('Under Armour'),
('Converse'),
('Vans'),
('New Balance'),
('Asics'),
('Skechers');

INSERT INTO ModoPagos (Nombre_ModoPago) VALUES
('Tarjeta de Crédito'),
('PayPal'),
('Bitcoin'),
('Cheque'),
('Transferencia Bancaria'),
('Efectivo'),
('Apple Pay'),
('Google Pay'),
('Tarjeta de Débito'),
('Stripe');

INSERT INTO PromocionesyDescuentos (codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin) VALUES
(101, '10% descuento > $100', '2024-01-01', '2024-01-31'),
(102, '15% descuento nuevos', '2024-02-01', '2024-02-28'),
(103, '20% descuento zapatos', '2024-03-01', '2024-03-31'),
(104, '5% descuento PayPal', '2024-04-01', '2024-04-30'),
(105, '2x1 en sandalias', '2024-05-01', '2024-05-31'),
(106, '30% descuento selectos', '2024-06-01', '2024-06-30'),
(107, 'Envío gratis > $50', '2024-07-01', '2024-07-31'),
(108, '$20 descuento > $200', '2024-08-01', '2024-08-31'),
(109, '25% descuento Adidas', '2024-09-01', '2024-09-30'),
(110, '10% descuento código ABC123', '2024-10-01', '2024-10-31');

INSERT INTO Usuario (nombre_Usuario, contrasena, rol) VALUES
('jdoe', 'password123', 'Cliente'),
('asmith', 'mypassword', 'Cliente'),
('bwhite', 'securepass', 'Vendedor'),
('jblack', 'mypassword123', 'Vendedor'),
('mgreen', 'password789', 'Cliente'),
('jamesb', 'jamespass', 'Cliente'),
('lucyc', 'lucypass', 'Vendedor'),
('mikea', 'mikepass', 'Cliente'),
('amandaj', 'amandapass', 'Cliente'),
('robertk', 'robertpass', 'Vendedor');

INSERT INTO Vendedor (direccion, telefono, nombre, apellido, id_Usuario) VALUES
('Calle Falsa 123', '5551234', 'Juan', 'Perez', 3),
('Av. Siempre Viva 742', '5555678', 'Ana', 'Gomez', 4),
('Boulevard de los Sueños Rotos', '5558765', 'Carlos', 'Lopez', 7),
('Calle del Olvido 456', '5554321', 'Lucia', 'Martinez', 10),
('Paseo de la Reforma', '5556789', 'Miguel', 'Hernandez', 5),
('Camino Real 789', '5553456', 'Laura', 'Gonzalez', 6),
('Calle Mayor 101', '5557890', 'Pedro', 'Ramirez', 8),
('Avenida Central 202', '5552345', 'Mariana', 'Torres', 9),
('Plaza Norte 303', '5551230', 'Luis', 'Martinez', 2),
('Avenida Sur 404', '5556780', 'Elena', 'Gutierrez', 1);

INSERT INTO Clientes (cedula, nombre, apellido, historialdecompras, id_Usuario) VALUES
('001-010101-0001A', 'Pedro', 'Ramirez', 'Compra 1, Compra 2', 1),
('002-020202-0002B', 'Maria', 'Fernandez', 'Compra 3, Compra 4', 2),
('003-030303-0003C', 'Jose', 'Garcia', 'Compra 5, Compra 6', 3),
('004-040404-0004D', 'Laura', 'Sanchez', 'Compra 7, Compra 8', 4),
('005-050505-0005E', 'Luis', 'Torres', 'Compra 9, Compra 10', 5),
('006-060606-0006F', 'Ana', 'Martinez', 'Compra 11, Compra 12', 6),
('007-070707-0007G', 'Carlos', 'Lopez', 'Compra 13, Compra 14', 7),
('008-080808-0008H', 'Lucia', 'Gomez', 'Compra 15, Compra 16', 8),
('009-090909-0009I', 'Miguel', 'Hernandez', 'Compra 17, Compra 18', 9),
('010-101010-0010J', 'Elena', 'Gutierrez', 'Compra 19, Compra 20', 10);

INSERT INTO Productos (id_Categoria, nombre, descripcion, precio, id_Marca, id_Promociones, cantidad, imagen) VALUES 
(1, 'Nike Air Max', 'Zapatos deportivos cómodos', 120.00, 1, 1, 50, 'imagen_nike_air_max.jpg'), 
(2, 'Adidas Ultraboost', 'Zapatos de running', 180.00, 2, 2, 30, 'imagen_adidas_ultraboost.jpg'), 
(3, 'Puma Suede', 'Zapatos casuales', 70.00, 3, 3, 40, 'imagen_puma_suede.jpg'), 
(4, 'Reebok Classic', 'Zapatos retro', 90.00, 4, 4, 20, 'imagen_reebok_classic.jpg'), 
(5, 'Under Armour HOVR', 'Zapatos de entrenamiento', 150.00, 5, 5, 25, 'imagen_ua_hovr.jpg'), 
(1, 'Converse All Star', 'Zapatos casuales icónicos', 65.00, 6, NULL, 35, 'imagen_converse_all_star.jpg'), 
(2, 'Vans Old Skool', 'Zapatillas de skate clásicas', 60.00, 7, 6, 50, 'imagen_vans_old_skool.jpg'), 
(3, 'New Balance 574', 'Zapatos cómodos y versátiles', 85.00, 8, NULL, 45, 'imagen_nb_574.jpg'), 
(4, 'Asics Gel-Kayano', 'Zapatos de running de alto rendimiento', 160.00, 9, 7, 20, 'imagen_asics_gel_kayano.jpg'), 
(5, 'Skechers Go Walk', 'Zapatos cómodos para caminar', 75.00, 10, NULL, 60, 'imagen_skechers_go_walk.jpg');

INSERT INTO Ventas (id_Cliente, id_Vendedor, cantidadProducto, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio, total_Venta) VALUES
(1, 1, 2, 1, '2024-05-01', 'Completado', 'Online', 'Calle Falsa 123', 240),
(2, 2, 1, 2, '2024-05-02', 'Completado', 'Online', 'Av. Siempre Viva 742', 180),
(3, 3, 3, 3, '2024-05-03', 'Completado', 'Tienda Física', 'Boulevard de los Sueños Rotos', 210),
(4, 4, 1, 4, '2024-05-04', 'Completado', 'Tienda Física', 'Calle del Olvido 456', 90),
(5, 5, 2, 5, '2024-05-05', 'Completado', 'Online', 'Paseo de la Reforma', 300),
(6, 6, 1, 6, '2024-05-06', 'Completado', 'Tienda Física', 'Camino Real 789', 65),
(7, 7, 2, 7, '2024-05-07', 'Completado', 'Online', 'Calle Mayor 101', 120),
(8, 8, 1, 8, '2024-05-08', 'Completado', 'Online', 'Avenida Central 202', 85),
(9, 9, 3, 9, '2024-05-09', 'Completado', 'Tienda Física', 'Plaza Norte 303', 480),
(10, 10, 1, 10, '2024-05-10', 'Completado', 'Online', 'Avenida Sur 404', 75);

INSERT INTO DetalleVenta (cod_Venta, cantidad, id_Producto, PrecioUnitario, TotalDetalle) VALUES
(1, 2, 1, 120, 240),
(2, 1, 2, 180, 180),
(3, 3, 3, 70, 210),
(4, 1, 4, 90, 90),
(5, 2, 5, 150, 300),
(6, 1, 6, 65, 65),
(7, 2, 7, 60, 120),
(8, 1, 8, 85, 85),
(9, 3, 9, 160, 480),
(10, 1, 10, 75, 75);
