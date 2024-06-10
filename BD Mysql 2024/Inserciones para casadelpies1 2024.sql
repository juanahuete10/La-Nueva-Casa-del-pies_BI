USE casadelpies1;

/*Crear un administrador para poder ingresar al inicio de seción del Proyecto*/
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)
VALUES ('Mauri', '2024', 'admin');

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

-- Insertar 40 usuarios
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
('janedoe20', 'password123', 'Cliente'), 
('janedoe21', 'password123', 'Cliente'), 
('janedoe22', 'password123', 'Cliente'), 
('janedoe23', 'password123', 'Cliente'), 
('janedoe24', 'password123', 'Cliente'), 
('janedoe25', 'password123', 'Cliente'), 
('janedoe26', 'password123', 'Cliente'), 
('janedoe27', 'password123', 'Cliente'), 
('janedoe28', 'password123', 'Cliente'), 
('janedoe29', 'password123', 'Cliente'), 
('janedoe30', 'password123', 'Cliente'), 
('janedoe31', 'password123', 'Cliente'), 
('janedoe32', 'password123', 'Cliente'), 
('janedoe33', 'password123', 'Cliente'), 
('janedoe34', 'password123', 'Cliente'), 
('janedoe35', 'password123', 'Cliente'), 
('janedoe36', 'password123', 'Cliente'), 
('janedoe37', 'password123', 'Cliente'), 
('janedoe38', 'password123', 'Cliente'), 
('janedoe39', 'password123', 'Cliente'), 
('janedoe40', 'password123', 'Cliente');

-- Insertar 40 clientes
INSERT INTO Clientes (cedula, nombre, apellido, historialdecompras, id_Usuario) VALUES 
('01-010101-0001A', 'Pedro', 'Ramirez', 'Compra 1, Compra 2', 1), 
('02-020202-0002B', 'Maria', 'Fernandez', 'Compra 3, Compra 4', 2), 
('03-030303-0003C', 'Jose', 'Garcia', 'Compra 5, Compra 6', 3), 
('04-040404-0004D', 'Laura', 'Sanchez', 'Compra 7, Compra 8', 4), 
('05-050505-0005E', 'Luis', 'Torres', 'Compra 9, Compra 10', 5), 
('06-060606-0006F', 'Ana', 'Martinez', 'Compra 11, Compra 12', 6), 
('07-070707-0007G', 'Carlos', 'Lopez', 'Compra 13, Compra 14', 7), 
('08-080808-0008H', 'Lucia', 'Gomez', 'Compra 15, Compra 16', 8), 
('09-090909-0009I', 'Miguel', 'Hernandez', 'Compra 17, Compra 18', 9), 
('10-101010-0010J', 'Elena', 'Gutierrez', 'Compra 19, Compra 20', 10), 
('11-111111-0011K', 'Roberto', 'Fernandez', 'Compra 21, Compra 22', 11), 
('12-121212-0012L', 'Andres', 'Perez', 'Compra 23, Compra 24', 12), 
('13-131313-0013M', 'Daniel', 'Garcia', 'Compra 25, Compra 26', 13), 
('14-141414-0014N', 'Sara', 'Sanchez', 'Compra 27, Compra 28', 14), 
('15-151515-0015O', 'Rosa', 'Lopez', 'Compra 29, Compra 30', 15), 
('16-161616-0016P', 'Marta', 'Gomez', 'Compra 31, Compra 32', 16), 
('17-171717-0017Q', 'Javier', 'Hernandez', 'Compra 33, Compra 34', 17), 
('18-181818-0018R', 'Fernando', 'Gutierrez', 'Compra 35, Compra 36', 18), 
('19-191919-0019S', 'Alberto', 'Martinez', 'Compra 37, Compra 38', 19), 
('20-202020-0020T', 'Isabel', 'Torres', 'Compra 39, Compra 40', 20), 
('21-212121-0021U', 'Ana', 'Fernandez', 'Compra 41, Compra 42', 21), 
('22-222222-0022V', 'Carlos', 'Gomez', 'Compra 43, Compra 44', 22), 
('23-232323-0023W', 'Lucia', 'Perez', 'Compra 45, Compra 46', 23), 
('24-242424-0024X', 'Miguel', 'Garcia', 'Compra 47, Compra 48', 24), 
('25-252525-0025Y', 'Elena', 'Sanchez', 'Compra 49, Compra 50', 25), 
('26-262626-0026Z', 'Roberto', 'Lopez', 'Compra 51, Compra 52', 26), 
('27-272727-0027AA', 'Andres', 'Gutierrez', 'Compra 53, Compra 54', 27), 
('28-282828-0028AB', 'Daniel', 'Martinez', 'Compra 55, Compra 56', 28), 
('29-292929-0029AC', 'Sara', 'Torres', 'Compra 57, Compra 58', 29), 
('30-303030-0030AD', 'Rosa', 'Fernandez', 'Compra 59, Compra 60', 30), 
('31-313131-0031AE', 'Marta', 'Gomez', 'Compra 61, Compra 62', 31), 
('32-323232-0032AF', 'Javier', 'Hernandez', 'Compra 63, Compra 64', 32), 
('33-333333-0033AG', 'Fernando', 'Gutierrez', 'Compra 65, Compra 66', 33), 
('34-343434-0034AH', 'Alberto', 'Martinez', 'Compra 67, Compra 68', 34), 
('35-353535-0035AI', 'Isabel', 'Torres', 'Compra 69, Compra 70', 35), 
('36-363636-0036AJ', 'Ana', 'Fernandez', 'Compra 71, Compra 72', 36), 
('37-373737-0037AK', 'Carlos', 'Gomez', 'Compra 73, Compra 74', 37), 
('38-383838-0038AL', 'Lucia', 'Perez', 'Compra 75, Compra 76', 38), 
('39-393939-0039AM', 'Miguel', 'Garcia', 'Compra 77, Compra 78', 39), 
('40-404040-0040AN', 'Elena', 'Sanchez', 'Compra 79, Compra 80', 40);

-- Insertar 5 vendedores
INSERT INTO Vendedor (direccion, telefono, nombre, apellido, id_Usuario) VALUES
('Calle Falsa 123', '5551234', 'Juan', 'Perez', 1),
('Av. Siempre Viva 742', '5555678', 'Ana', 'Gomez', 2),
('Boulevard de los Sueños Rotos', '5558765', 'Carlos', 'Lopez', 3),
('Calle del Olvido 456', '5554321', 'Lucia', 'Martinez', 4),
('Paseo de la Reforma', '5556789', 'Miguel', 'Hernandez', 5);

-- Insertar 24 productos
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

-- Insertar 25 ventas
-- Insertar ventas para 2023
INSERT INTO Ventas (id_Cliente, id_Vendedor, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio) VALUES 
(1, 1, 1, '2023-01-01', 'Pendiente', 'Online', 'Calle 123, Ciudad A'), 
(2, 2, 1, '2023-02-03', 'Pendiente', 'Presencial', 'Avenida XYZ, Ciudad B'), 
(3, 3, 2, '2023-03-05', 'Entregado', 'Teléfono', 'Calle 456, Ciudad C'), 
(4, 4, 2, '2023-04-07', 'Pendiente', 'Online', 'Calle 789, Ciudad D'), 
(5, 5, 1, '2023-05-09', 'Pendiente', 'Presencial', 'Avenida LMN, Ciudad E'), 
(6, 1, 1, '2023-06-11', 'Pendiente', 'Teléfono', 'Calle 012, Ciudad F'), 
(7, 2, 2, '2023-07-13', 'Entregado', 'Online', 'Avenida UVW, Ciudad G'), 
(8, 3, 2, '2023-08-15', 'Pendiente', 'Presencial', 'Calle 345, Ciudad H'), 
(9, 4, 1, '2023-09-17', 'Pendiente', 'Teléfono', 'Avenida EFG, Ciudad I'), 
(10, 5, 1, '2023-10-19', 'Pendiente', 'Online', 'Calle HIJ, Ciudad J');

-- Insertar ventas para 2024
INSERT INTO Ventas (id_Cliente, id_Vendedor, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio) VALUES 
(1, 1, 1, '2024-01-01', 'Pendiente', 'Online', 'Calle 123, Ciudad A'), 
(2, 2, 1, '2024-02-03', 'Pendiente', 'Presencial', 'Avenida XYZ, Ciudad B'), 
(3, 3, 2, '2024-03-05', 'Entregado', 'Teléfono', 'Calle 456, Ciudad C'), 
(4, 4, 2, '2024-04-07', 'Pendiente', 'Online', 'Calle 789, Ciudad D'), 
(5, 5, 1, '2024-05-09', 'Pendiente', 'Presencial', 'Avenida LMN, Ciudad E'), 
(6, 1, 1, '2024-06-11', 'Pendiente', 'Teléfono', 'Calle 012, Ciudad F'), 
(7, 2, 2, '2024-07-13', 'Entregado', 'Online', 'Avenida UVW, Ciudad G'), 
(8, 3, 2, '2024-08-15', 'Pendiente', 'Presencial', 'Calle 345, Ciudad H'), 
(9, 4, 1, '2024-09-17', 'Pendiente', 'Teléfono', 'Avenida EFG, Ciudad I'), 
(10, 5, 1, '2024-10-19', 'Pendiente', 'Online', 'Calle HIJ, Ciudad J'), 
(11, 1, 2, '2024-11-21', 'Pendiente', 'Presencial', 'Avenida KLM, Ciudad K'), 
(12, 2, 1, '2024-12-23', 'Pendiente', 'Teléfono', 'Calle NOP, Ciudad L'), 
(13, 3, 1, '2024-01-25', 'Pendiente', 'Online', 'Avenida QRS, Ciudad M'), 
(14, 4, 2, '2024-02-27', 'Pendiente', 'Presencial', 'Calle TUV, Ciudad N'), 
(15, 5, 2, '2024-03-29', 'Pendiente', 'Teléfono', 'Avenida WXY, Ciudad O');

-- Insertar 25 Detalle de ventas
-- Detalle de ventas para el año 2023
INSERT INTO DetalleVenta (cod_Venta, cantidadProducto, id_Producto, PrecioUnitario, TotalDetalle)
VALUES
(1, 2, 1, 10.5, 21.0),
(2, 1, 2, 20.0, 20.0),
(3, 3, 3, 15.0, 45.0),
(4, 2, 4, 12.0, 24.0),
(5, 1, 5, 25.0, 25.0),
(6, 4, 6, 8.0, 32.0),
(7, 2, 7, 18.0, 36.0),
(8, 1, 8, 30.0, 30.0),
(9, 3, 9, 9.0, 27.0),
(10, 2, 10, 14.0, 28.0);

-- Detalle de ventas para el año 2024
INSERT INTO DetalleVenta (cod_Venta, cantidadProducto, id_Producto, PrecioUnitario, TotalDetalle)
VALUES
(11, 2, 1, 18.0, 36.0),
(12, 3, 2, 22.0, 66.0),
(13, 1, 3, 40.0, 40.0),
(14, 2, 4, 16.0, 32.0),
(15, 4, 5, 12.0, 48.0),
(16, 1, 6, 35.0, 35.0),
(17, 3, 7, 9.0, 27.0),
(18, 2, 8, 28.0, 56.0),
(19, 1, 9, 20.0, 20.0),
(20, 2, 10, 15.0, 30.0),
(21, 3, 11, 25.0, 75.0),
(22, 2, 12, 10.0, 20.0),
(23, 1, 13, 30.0, 30.0),
(24, 4, 14, 14.0, 56.0),
(25, 2, 15, 18.0, 36.0);

