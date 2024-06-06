USE casadelpies2;

-- Insertar 5 categorías
INSERT INTO Categorias (nombre_C, descripcion) VALUES
('Deportivos', 'Zapatos deportivos para actividades físicas'),
('Formales', 'Zapatos formales para ocasiones especiales'),
('Casuales', 'Zapatos casuales para uso diario'),
('Botas', 'Botas para diferentes terrenos'),
('Sandalias', 'Sandalias para climas cálidos');

-- Insertar 6 marcas
INSERT INTO Marcas (nombre_Marca) VALUES
('Nike'),
('Adidas'),
('Puma'),
('Reebok'),
('New Balance'),
('Converse');

-- Insertar 4 modos de pago
INSERT INTO ModoPagos (Nombre_ModoPago) VALUES
('Tarjeta de Crédito'),
('PayPal'),
('Transferencia Bancaria'),
('Efectivo');

-- Insertar 3 promociones y descuentos
INSERT INTO PromocionesyDescuentos (codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin) VALUES
(101, '10% descuento', '2024-01-01', '2024-01-31'),
(102, '15% descuento', '2024-02-01', '2024-02-28'),
(103, 'Envío gratis', '2024-03-01', '2024-03-31');

-- Insertar 20 usuarios
INSERT INTO Usuario (nombre_Usuario, contrasena, rol) VALUES
('janedoe1', 'password123', 'Cliente'),
('janedoe2', 'password123', 'Cliente'),
('janedoe3', 'password123', 'Cliente'),
('janedoe4', 'password123', 'Cliente'),
('janedoe5', 'password123', 'Cliente'),
('janedoe6', 'password123', 'Cliente'),
('janedoe7', 'password123', 'Cliente'),
('janedoe8', 'password123', 'Cliente'),
('janedoe9', 'password123', 'Cliente'),
('janedoe10', 'password123', 'Cliente'),
('janedoe11', 'password123', 'Cliente'),
('janedoe12', 'password123', 'Cliente'),
('janedoe13', 'password123', 'Cliente'),
('janedoe14', 'password123', 'Cliente'),
('janedoe15', 'password123', 'Cliente'),
('janedoe16', 'password123', 'Cliente'),
('janedoe17', 'password123', 'Cliente'),
('janedoe18', 'password123', 'Cliente'),
('janedoe19', 'password123', 'Cliente'),
('janedoe20', 'password123', 'Cliente');

-- Insertar 5 vendedores
INSERT INTO Vendedor (direccion, telefono, nombre, apellido, id_Usuario) VALUES
('Calle Falsa 123', '5551234', 'Juan', 'Perez', 1),
('Av. Siempre Viva 742', '5555678', 'Ana', 'Gomez', 2),
('Boulevard de los Sueños Rotos', '5558765', 'Carlos', 'Lopez', 3),
('Calle del Olvido 456', '5554321', 'Lucia', 'Martinez', 4),
('Paseo de la Reforma', '5556789', 'Miguel', 'Hernandez', 5);

-- Insertar 20 clientes
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
('010-101010-0010J', 'Elena', 'Gutierrez', 'Compra 19, Compra 20', 10),
('011-111111-0011K', 'Roberto', 'Fernandez', 'Compra 21, Compra 22', 11),
('012-121212-0012L', 'Andres', 'Perez', 'Compra 23, Compra 24', 12),
('013-131313-0013M', 'Daniel', 'Garcia', 'Compra 25, Compra 26', 13),
('014-141414-0014N', 'Sara', 'Sanchez', 'Compra 27, Compra 28', 14),
('015-151515-0015O', 'Rosa', 'Lopez', 'Compra 29, Compra 30', 15),
('016-161616-0016P', 'Marta', 'Gomez', 'Compra 31, Compra 32', 16),
('017-171717-0017Q', 'Javier', 'Hernandez', 'Compra 33, Compra 34', 17),
('018-181818-0018R', 'Fernando', 'Gutierrez', 'Compra 35, Compra 36', 18),
('019-191919-0019S', 'Alberto', 'Martinez', 'Compra 37, Compra 38', 19),
('020-202020-0020T', 'Isabel', 'Torres', 'Compra 39, Compra 40', 20);

-- Insertar 20 productos
INSERT INTO Productos (id_Categoria, nombre, descripcion, precio, id_Marca, id_Promociones, cantidad, imagen) VALUES 
-- 1. Productos de la marca Nike
(1, 'Zapatillas Nike Air Max', 'Zapatillas deportivas cómodas y duraderas', 120.00, 1, 1, 50, 'imagen_nike_air_max.jpg'),
(1, 'Zapatillas Nike Zoom Pegasus', 'Zapatillas para correr de alto rendimiento', 140.00, 1, NULL, 40, 'imagen_nike_pegasus.jpg'),
(1, 'Zapatos Nike SB Janoski', 'Zapatos de skate con estilo', 80.00, 1, 2, 30, 'imagen_nike_sb_janoski.jpg'),
(2, 'Zapatillas Nike React ', 'Zapatillas para correr con tecnología React', 160.00, 1, NULL, 35, 'imagen_nike_react_infinity.jpg'),
(3, 'Sandalias Nike Benassi', 'Sandalias cómodas para uso diario', 35.00, 1, 3, 60, 'imagen_nike_benassi.jpg'),

-- 2. Productos de la marca Adidas
(1, 'Zapatillas Adidas', 'Zapatillas de running con amortiguación Boost', 180.00, 2, 1, 45, 'imagen_adidas_ultraboost.jpg'),
(1, 'Zapatillas Adidas', 'Zapatillas clásicas con diseño icónico', 100.00, 2, NULL, 55, 'imagen_adidas_superstar.jpg'),
(2, 'Zapatillas Adidas NMD', 'Zapatillas urbanas con estilo moderno', 130.00, 2, 2, 40, 'imagen_adidas_nmd.jpg'),
(3, 'Sandalias Adidas Adilette', 'Sandalias cómodas para la ducha', 25.00, 2, NULL, 70, 'imagen_adidas_adilette.jpg'),
(3, 'Chanclas Adidas Duramo', 'Chanclas ligeras para la playa o piscina', 20.00, 2, 3, 80, 'imagen_adidas_duramo.jpg'),

-- 3. Productos de la marca Puma
(1, 'Zapatillas Puma RS-X', 'Zapatillas de estilo retro con tecnología RS', 110.00, 3, 1, 50, 'imagen_puma_rs_x.jpg'),
(1, 'Zapatillas Puma Future', 'Zapatillas inspiradas en el estilo de los años 80', 95.00, 3, NULL, 60, 'imagen_puma_future_rider.jpg'),
(2, 'Zapatos Puma Suede', 'Zapatos casuales con diseño clásico de gamuza', 70.00, 3, 2, 70, 'imagen_puma_suede.jpg'),
(2, 'Zapatillas Puma Vikky', 'Zapatillas para mujer con suela de goma', 60.00, 3, NULL, 65, 'imagen_puma_vikky.jpg'),
(3, 'Sandalias Puma ', 'Sandalias cómodas para clima cálido', 30.00, 3, 3, 75, 'imagen_puma_cool_cat.jpg'),

-- 4. Productos de la marca Reebok
(1, 'Zapatillas Reebok', 'Zapatillas de entrenamiento versátiles', 130.00, 4, 1, 40, 'imagen_reebok_nano_x.jpg'),
(1, 'Zapatillas Reebo', 'Zapatillas clásicas de cuero', 90.00, 4, NULL, 55, 'imagen_reebok_classic_leather.jpg'),
(2, 'Zapatos Reebok ', 'Zapatos casuales con diseño retro', 80.00, 4, 2, 60, 'imagen_reebok_club_c_85.jpg'),
(3, 'Chanclas Reebok ', 'Chanclas cómodas para el verano', 25.00, 4, NULL, 70, 'imagen_reebok_classic_slide.jpg'),
(3, 'Sandalias Reebok ', 'Sandalias deportivas con tecnología Zig Energy', 40.00, 4, 3, 65, 'imagen_reebok_zig_kinetica.jpg');

-- Insertar 20 ventas
INSERT INTO Ventas (id_Cliente, id_Vendedor, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio) VALUES
-- Venta 1
(1, 1, 1, '2024-06-01', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 2
(2, 2, 2, '2024-06-02', 'Completada', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 3
(3, 3, 3, '2024-06-03', 'Completada', 'Online', 'Boulevard de los Sueños Rotos'),
-- Venta 4
(4, 4, 1, '2024-06-04', 'Pendiente', 'Presencial', 'Calle del Olvido 456'),
-- Venta 5
(5, 5, 2, '2024-06-05', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 6
(6, 1, 3, '2024-06-06', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 7
(7, 2, 1, '2024-06-07', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 8
(8, 3, 2, '2024-06-08', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 9
(9, 4, 3, '2024-06-09', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 10
(10, 5, 1, '2024-06-10', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 11
(11, 1, 2, '2024-06-11', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 12
(12, 2, 3, '2024-06-12', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 13
(13, 3, 1, '2024-06-13', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 14
(14, 4, 2, '2024-06-14', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 15
(15, 5, 3, '2024-06-15', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 16
(16, 1, 1, '2024-06-16', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 17
(17, 2, 2, '2024-06-17', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 18
(18, 3, 3, '2024-06-18', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 19
(19, 4, 1, '2024-06-19', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 20
(20, 5, 2, '2024-06-20', 'Completada', 'Presencial', 'Paseo de la Reforma');

/*2023*/
-- Insertar 20 ventas
INSERT INTO Ventas (id_Cliente, id_Vendedor, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio) VALUES
-- Venta 1
(1, 1, 1, '2023-06-01', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 2
(2, 2, 2, '2023-06-02', 'Completada', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 3
(3, 3, 3, '2023-06-03', 'Completada', 'Online', 'Boulevard de los Sueños Rotos'),
-- Venta 4
(4, 4, 1, '2023-06-04', 'Pendiente', 'Presencial', 'Calle del Olvido 456'),
-- Venta 5
(5, 5, 2, '2023-06-05', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 6
(6, 1, 3, '2023-06-06', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 7
(7, 2, 1, '2023-06-07', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 8
(8, 3, 2, '2023-06-08', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 9
(9, 4, 3, '2023-06-09', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 10
(10, 5, 1, '2023-06-10', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 11
(11, 1, 2, '2023-06-11', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 12
(12, 2, 3, '2023-06-12', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 13
(13, 3, 1, '2023-06-13', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 14
(14, 4, 2, '2023-06-14', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 15
(15, 5, 3, '2023-06-15', 'Completada', 'Presencial', 'Paseo de la Reforma'),
-- Venta 16
(16, 1, 1, '2023-06-16', 'Completada', 'Presencial', 'Calle Falsa 123'),
-- Venta 17
(17, 2, 2, '2023-06-17', 'Pendiente', 'Presencial', 'Av. Siempre Viva 742'),
-- Venta 18
(18, 3, 3, '2023-06-18', 'Completada', 'Presencial', 'Boulevard de los Sueños Rotos'),
-- Venta 19
(19, 4, 1, '2023-06-19', 'Completada', 'Presencial', 'Calle del Olvido 456'),
-- Venta 20
(20, 5, 2, '2023-06-20', 'Completada', 'Presencial', 'Paseo de la Reforma');


-- Detalles de venta de los primeros 20 productos para las primeras 20 ventas
INSERT INTO DetalleVenta (cod_Venta, cantidadProducto, id_Producto, PrecioUnitario, TotalDetalle) VALUES
-- Venta 1
(1, 2, 1, 120.00, 240.00),
(1, 1, 2, 140.00, 140.00),
(1, 2, 3, 80.00, 160.00),
(1, 1, 4, 160.00, 160.00),
-- Venta 2
(2, 1, 5, 35.00, 35.00),
(2, 3, 6, 180.00, 540.00),
(2, 2, 7, 100.00, 200.00),
(2, 1, 8, 130.00, 130.00),
-- Venta 3
(3, 3, 9, 25.00, 75.00),
(3, 1, 10, 40.00, 40.00),
(3, 2, 11, 120.00, 240.00),
(3, 1, 12, 140.00, 140.00),
-- Venta 4
(4, 2, 13, 80.00, 160.00),
(4, 1, 14, 160.00, 160.00),
(4, 2, 15, 35.00, 70.00),
(4, 1, 16, 180.00, 180.00),
-- Venta 5
(5, 1, 17, 100.00, 100.00),
(5, 3, 18, 130.00, 390.00),
(5, 2, 19, 25.00, 50.00),
(5, 1, 20, 40.00, 40.00),
-- Venta 6
(6, 2, 1, 120.00, 240.00),
(6, 1, 2, 140.00, 140.00),
(6, 2, 3, 80.00, 160.00),
(6, 1, 4, 160.00, 160.00),
-- Venta 7
(7, 1, 5, 35.00, 35.00),
(7, 3, 6, 180.00, 540.00),
(7, 2, 7, 100.00, 200.00),
(7, 1, 8, 130.00, 130.00),
-- Venta 8
(8, 3, 9, 25.00, 75.00),
(8, 1, 10, 40.00, 40.00),
(8, 2, 11, 120.00, 240.00),
(8, 1, 12, 140.00, 140.00),
-- Venta 9
(9, 2, 13, 80.00, 160.00),
(9, 1, 14, 160.00, 160.00),
(9, 2, 15, 35.00, 70.00),
(9, 1, 16, 180.00, 180.00),
-- Venta 10
(10, 1, 17, 100.00, 100.00),
(10, 3, 18, 130.00, 390.00),
(10, 2, 19, 25.00, 50.00),
(10, 1, 20, 40.00, 40.00),
-- Venta 11
(11, 2, 1, 120.00, 240.00),
(11, 1, 2, 140.00, 140.00),
(11, 2, 3, 80.00, 160.00),
(11, 1, 4, 160.00, 160.00),
-- Venta 12
(12, 1, 5, 35.00, 35.00),
(12, 3, 6, 180.00, 540.00),
(12, 2, 7, 100.00, 200.00),
(12, 1, 8, 130.00, 130.00),
-- Venta 13
(13, 3, 9, 25.00, 75.00),
(13, 1, 10, 40.00, 40.00),
(13, 2, 11, 120.00, 240.00),
(13, 1, 12, 140.00, 140.00),
-- Venta 14
(14, 2, 13, 80.00, 160.00),
(14, 1, 14, 160.00, 160.00),
(14, 2, 15, 35.00, 70.00),
(14, 1, 16, 180.00, 180.00),
-- Venta 15
(15, 1, 17, 100.00, 100.00),
(15, 3, 18, 130.00, 390.00),
(15, 2, 19, 25.00, 50.00),
(15, 1, 20, 40.00, 40.00),
-- Venta 16
(16, 2, 1, 120.00, 240.00),
(16, 1, 2, 140.00, 140.00),
(16, 2, 3, 80.00, 160.00),
(16, 1, 4, 160.00, 160.00),
-- Venta 17
(17, 1, 5, 35.00, 35.00),
(17, 3, 6, 180.00, 540.00),
(17, 2, 7, 100.00, 200.00),
(17, 1, 8, 130.00, 130.00),
-- Venta 18
(18, 3, 9, 25.00, 75.00),
(18, 1, 10, 40.00, 40.00),
(18, 2, 11, 120.00, 240.00),
(18, 1, 12, 140.00, 140.00),
-- Venta 19
(19, 2, 13, 80.00, 160.00),
(19, 1, 14, 160.00, 160.00),
(19, 2, 15, 35.00, 70.00),
(19, 1, 16, 180.00, 180.00),
-- Venta 20
(20, 1, 17, 100.00, 100.00),
(20, 3, 18, 130.00, 390.00),
(20, 2, 19, 25.00, 50.00),
(20, 1, 20, 40.00, 40.00);



