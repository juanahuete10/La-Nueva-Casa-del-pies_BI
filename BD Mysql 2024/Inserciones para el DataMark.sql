/*Inserciones para el DataMark*/
USE hec_dim;

INSERT INTO d_ModoPagos (id_ModoPago, Nombre_ModoPago) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta de Crédito'),
(3, 'Tarjeta de Débito'),
(4, 'Transferencia Bancaria'),
(5, 'PayPal'),
(6, 'Bitcoin'),
(7, 'Cheque'),
(8, 'Apple Pay'),
(9, 'Google Wallet'),
(10, 'Electrónica');


INSERT INTO d_Vendedor (id_Vendedor, direccion, telefono, nombre, apellido) VALUES
(1, 'Calle Falsa 123', '5551234', 'Juan', 'Perez'),
(2, 'Av. Siempre Viva 742', '5555678', 'Ana', 'Gomez'),
(3, 'Boulevard de los Sueños Rotos', '5558765', 'Carlos', 'Lopez'),
(4, 'Calle del Olvido 456', '5554321', 'Lucia', 'Martinez'),
(5, 'Paseo de la Reforma', '5556789', 'Miguel', 'Hernandez'),
(6, 'Camino Real 789', '5553456', 'Laura', 'Gonzalez'),
(7, 'Calle Mayor 101', '5557890', 'Pedro', 'Ramirez'),
(8, 'Avenida Central 202', '5552345', 'Mariana', 'Torres'),
(9, 'Plaza Norte 303', '5551230', 'Luis', 'Martinez'),
(10, 'Avenida Sur 404', '5556780', 'Elena', 'Gutierrez');


INSERT INTO d_Clientes (id_Cliente, cedula, nombre, apellido, historialdecompras) VALUES
(1, '001-010101-0001A', 'Pedro', 'Ramirez', 'Compra 1, Compra 2'),
(2, '002-020202-0002B', 'Maria', 'Fernandez', 'Compra 3, Compra 4'),
(3, '003-030303-0003C', 'Jose', 'Garcia', 'Compra 5, Compra 6'),
(4, '004-040404-0004D', 'Laura', 'Sanchez', 'Compra 7, Compra 8'),
(5, '005-050505-0005E', 'Luis', 'Torres', 'Compra 9, Compra 10'),
(6, '006-060606-0006F', 'Ana', 'Martinez', 'Compra 11, Compra 12'),
(7, '007-070707-0007G', 'Carlos', 'Lopez', 'Compra 13, Compra 14'),
(8, '008-080808-0008H', 'Lucia', 'Gomez', 'Compra 15, Compra 16'),
(9, '009-090909-0009I', 'Miguel', 'Hernandez', 'Compra 17, Compra 18'),
(10, '010-101010-0010J', 'Elena', 'Gutierrez', 'Compra 19, Compra 20');


INSERT INTO d_Producto (id_Producto, Producto, nombre_C, Precio, cantidad, marca) VALUES
(1, 'Zapato Deportivo', 'Calzado', 75.00, 10, 'Nike'),
(2, 'Zapato de Vestir', 'Calzado', 50.00, 20, 'Clarks'),
(3, 'Sandalia', 'Calzado', 30.00, 15, 'Birkenstock'),
(4, 'Bota', 'Calzado', 100.00, 5, 'Timberland'),
(5, 'Zapato Casual', 'Calzado', 45.00, 8, 'Vans'),
(6, 'Zapato Formal', 'Calzado', 200.00, 12, 'Hugo Boss'),
(7, 'Zapatilla', 'Calzado', 150.00, 7, 'Adidas'),
(8, 'Mocasín', 'Calzado', 50.00, 25, 'Cole Haan'),
(9, 'Pantufla', 'Calzado', 30.00, 30, 'Ugg'),
(10, 'Botín', 'Calzado', 80.00, 18, 'Dr. Martens');


INSERT INTO d_tiempo (id_tiempo, fecha, anio, mes, dia) VALUES
(20240101, '2024-01-01', 2024, 1, 1),
(20240102, '2024-01-02', 2024, 1, 2),
(20240103, '2024-01-03', 2024, 1, 3),
(20240104, '2024-01-04', 2024, 1, 4),
(20240105, '2024-01-05', 2024, 1, 5),
(20240106, '2024-01-06', 2024, 1, 6),
(20240107, '2024-01-07', 2024, 1, 7),
(20240108, '2024-01-08', 2024, 1, 8),
(20240109, '2024-01-09', 2024, 1, 9),
(20240110, '2024-01-10', 2024, 1, 10);


INSERT INTO h_Ventas (id_hv, cod_Venta, id_Cliente, id_Producto, id_Vendedor, id_tiempo, fecha, Estado, TipoVentas, Direccion_Envio, precio_Unit, total_Venta, id_ModoPago) VALUES
(1, 1001, 1, 1, 1, 20240101, '2024-01-01', 'Completado', 'Online', 'Calle Falsa 123', 75, 75, 1),
(2, 1002, 2, 2, 2, 20240102, '2024-01-02', 'Pendiente', 'Tienda', 'Av. Siempre Viva 742', 50, 100, 2),
(3, 1003, 3, 3, 3, 20240103, '2024-01-03', 'Cancelado', 'Online', 'Boulevard de los Sueños Rotos', 30, 60, 3),
(4, 1004, 4, 4, 4, 20240104, '2024-01-04', 'Completado', 'Tienda', 'Calle del Olvido 456', 100, 100, 4),
(5, 1005, 5, 5, 5, 20240105, '2024-01-05', 'Pendiente', 'Online', 'Paseo de la Reforma', 45, 45, 5),
(6, 1006, 6, 6, 6, 20240106, '2024-01-06', 'Completado', 'Tienda', 'Camino Real 789', 20, 40, 6),
(7, 1007, 7, 7, 7, 20240107, '2024-01-07', 'Cancelado', 'Online', 'Calle Mayor 101', 15, 15, 7),
(8, 1008, 8, 8, 8, 20240108, '2024-01-08', 'Completado', 'Tienda', 'Avenida Central 202', 5, 10, 8),
(9, 1009, 9, 9, 9, 20240109, '2024-01-09', 'Pendiente', 'Online', 'Plaza Norte 303', 3, 9, 9),
(10, 1010, 10, 10, 10, 20240110, '2024-01-10', 'Completado', 'Tienda', 'Avenida Sur 404', 8, 16, 10);


