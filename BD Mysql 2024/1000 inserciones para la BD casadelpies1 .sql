USE casadelpies1;

/*Crear un administrador para poder ingresar al inicio de seción del Proyecto*/
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)
VALUES ('Mauri', '2024', 'admin');

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertCategorias()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO Categorias (nombre_C, descripcion) VALUES 
    (CONCAT('Categoria', i), CONCAT('Descripcion de la categoria ', i));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertCategorias();
DROP PROCEDURE InsertCategorias;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertMarcas()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO Marcas (nombre_Marca) VALUES (CONCAT('Marca', i));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertMarcas();
DROP PROCEDURE InsertMarcas;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertModoPagos()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO ModoPagos (Nombre_ModoPago) VALUES (CONCAT('ModoPago', i));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertModoPagos();
DROP PROCEDURE InsertModoPagos;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertPromocionesyDescuentos()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO PromocionesyDescuentos (codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin) VALUES 
    (i, CONCAT('Condicion de descuento ', i), DATE_ADD('2024-01-01', INTERVAL i DAY), DATE_ADD('2024-01-31', INTERVAL i DAY));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertPromocionesyDescuentos();
DROP PROCEDURE InsertPromocionesyDescuentos;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertUsuario()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO Usuario (nombre_Usuario, contrasena, rol) VALUES 
    (CONCAT('usuario', i), CONCAT('password', i), IF(i MOD 2 = 0, 'Cliente', 'Vendedor'));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertUsuario();
DROP PROCEDURE InsertUsuario;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertProductos()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO Productos (id_Categoria, nombre, descripcion, precio, id_Marca, id_Promociones, cantidad, imagen) VALUES 
    ((i MOD 10) + 1, CONCAT('Producto', i), CONCAT('Descripcion del producto ', i), ROUND(RAND() * 200, 2), (i MOD 10) + 1, (i MOD 10) + 1, ROUND(RAND() * 100), CONCAT('imagen', i, '.jpg'));
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;

CALL InsertProductos();
DROP PROCEDURE InsertProductos;

/*----------------------------------------------------------------------------------------------------------------*/

DELIMITER $$
CREATE PROCEDURE InsertVendedor()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE usuario_id INT;
  DECLARE done INT DEFAULT 0;

  DECLARE cur CURSOR FOR SELECT id_Usuario FROM Usuario WHERE rol = 'Vendedor';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;

  fetch_loop: LOOP
    FETCH cur INTO usuario_id;
    IF done THEN
      LEAVE fetch_loop;
    END IF;
    
    INSERT INTO Vendedor (direccion, telefono, nombre, apellido, id_Usuario) VALUES 
    (CONCAT('Direccion ', i), LPAD(i, 8, '0'), CONCAT('Nombre', i), CONCAT('Apellido', i), usuario_id);

    SET i = i + 1;
  END LOOP fetch_loop;

  CLOSE cur;
END$$
DELIMITER ;

CALL InsertVendedor();
DROP PROCEDURE InsertVendedor;

/*----------------------------------------------------------------------------------------------------------------*/


DELIMITER $$
CREATE PROCEDURE InsertClientes()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE usuario_id INT;
  DECLARE done INT DEFAULT 0;

  DECLARE cur CURSOR FOR SELECT id_Usuario FROM Usuario WHERE rol = 'Cliente';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;

  fetch_loop: LOOP
    FETCH cur INTO usuario_id;
    IF done THEN
      LEAVE fetch_loop;
    END IF;

    INSERT INTO Clientes (cedula, nombre, apellido, historialdecompras, id_Usuario) VALUES 
    (LPAD(i, 16, '0'), CONCAT('Nombre', i), CONCAT('Apellido', i), CONCAT('Historial de compras ', i), usuario_id);

    SET i = i + 1;

    IF i > 1000 THEN
      LEAVE fetch_loop;
    END IF;
  END LOOP fetch_loop;

  CLOSE cur;
END$$
DELIMITER ;

CALL InsertClientes();
DROP PROCEDURE InsertClientes;


/*----------------------------------------------------------------------------------------------------------------8BUENO*/


DELIMITER $$
CREATE PROCEDURE InsertVentas()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE cliente_id INT;
  DECLARE vendedor_id INT;
  DECLARE modo_pago_id INT;
  DECLARE done INT DEFAULT 0;

  DECLARE cur_cliente CURSOR FOR SELECT id_Cliente FROM Clientes;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur_cliente;

  fetch_cliente_loop: LOOP
    FETCH cur_cliente INTO cliente_id;
    IF done THEN
      LEAVE fetch_cliente_loop;
    END IF;

    SELECT id_Vendedor INTO vendedor_id FROM Vendedor ORDER BY RAND() LIMIT 1;
    SELECT id_ModoPago INTO modo_pago_id FROM ModoPagos ORDER BY RAND() LIMIT 1;

    INSERT INTO Ventas (id_Cliente, id_Vendedor, id_ModoPago, fecha, Estado, TipoVentas, Direccion_Envio) VALUES 
    (cliente_id, vendedor_id, modo_pago_id, CURRENT_DATE(), 'Completada', 'Normal', CONCAT('Direccion de envio ', i));

    SET i = i + 1;

    IF i > 1000 THEN
      LEAVE fetch_cliente_loop;
    END IF;
  END LOOP fetch_cliente_loop;

  CLOSE cur_cliente;
END$$
DELIMITER ;

CALL InsertVentas();
DROP PROCEDURE InsertVentas;

/*----------------------------------------------------------------------------------------------------------------*/


DELIMITER $$
CREATE PROCEDURE InsertDetalleVenta()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE venta_id INT;
  DECLARE producto_id INT;
  DECLARE done INT DEFAULT 0;

  DECLARE cur_venta CURSOR FOR SELECT cod_Venta FROM Ventas;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur_venta;

  fetch_venta_loop: LOOP
    FETCH cur_venta INTO venta_id;
    IF done THEN
      LEAVE fetch_venta_loop;
    END IF;

    SELECT id_Producto INTO producto_id FROM Productos ORDER BY RAND() LIMIT 1;

    INSERT INTO DetalleVenta (cod_Venta, cantidadProducto, id_Producto, PrecioUnitario, TotalDetalle) VALUES 
    (venta_id, ROUND(RAND() * 10), producto_id, ROUND(RAND() * 100, 2), ROUND(RAND() * 100, 2));

    SET i = i + 1;

    IF i > 1000 THEN
      LEAVE fetch_venta_loop;
    END IF;
  END LOOP fetch_venta_loop;

  CLOSE cur_venta;
END$$
DELIMITER ;

CALL InsertDetalleVenta();
DROP PROCEDURE InsertDetalleVenta;

/*----------------------------------------------------------------------------------------------------------------*/



