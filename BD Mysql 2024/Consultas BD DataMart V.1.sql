USE hec_dim;

/*14 consultas*/

-- Total de ventas realizadas--
SELECT COUNT(*) AS Total_Ventas FROM h_Ventas;

-- Total de ventas por vendedor--
SELECT CONCAT(c.nombre, ' ', c.apellido) AS Nombre_Cliente, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_Clientes c ON h.id_Cliente = c.id_Cliente
GROUP BY Nombre_Cliente;

-- Total de ventas por cliente-- 
SELECT CONCAT(c.nombre, ' ', c.apellido) AS Nombre_Cliente, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_Clientes c ON h.id_Cliente = c.id_Cliente
GROUP BY Nombre_Cliente;

-- Total de ventas por productos--
SELECT Producto, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY Producto;

-- Total de ventas por día de la semana--
SELECT DAYNAME(fecha) AS Dia_Semana, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY Dia_Semana;


-- Total de ventas por mes y año--
SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY YEAR(t.fecha), MONTH(t.fecha);

-- Total de ventas por marca--
SELECT p.marca, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY p.marca
ORDER BY Total_Ventas ASC;

-- Total de ventas por vendedor en un período específico --
SELECT CONCAT(v.nombre, ' ', v.apellido) AS Nombre_Vendedor, COUNT(*) AS Total_Ventas
FROM h_Ventas h
INNER JOIN d_Vendedor v ON h.id_Vendedor = v.id_Vendedor
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
WHERE MONTH(t.fecha) = 6 AND YEAR(t.fecha) = 2024
GROUP BY Nombre_Vendedor;


-- Total de ventas por tipo de venta--
SELECT TipoVentas, COUNT(*) AS Total_Ventas
FROM h_Ventas
GROUP BY TipoVentas;

-- ingreso anuales por año --
SELECT YEAR(t.fecha) AS Año, SUM(h.TotalVenta) AS Ingresos_Año_Actual
FROM h_Ventas h
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY YEAR(t.fecha);

-- Productos con poca ganancia--
SELECT p.Producto, SUM(h.TotalVenta) AS Ventas_Totales
FROM h_Ventas h
INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY p.Producto
HAVING Ventas_Totales < (SELECT 0.7 * SUM(TotalVenta) FROM h_Ventas)
   OR Ventas_Totales < (SELECT 0.4 * SUM(TotalVenta) FROM h_Ventas);

-- Para el número de clientes nuevos--
SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(DISTINCT h.id_Cliente) AS Clientes_Nuevos
FROM h_Ventas h
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY YEAR(t.fecha), MONTH(t.fecha);

-- Retencion clientes--
SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(DISTINCT h.id_Cliente) AS Clientes_Retención
FROM h_Ventas h
INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
WHERE YEAR(t.fecha) = YEAR(CURRENT_DATE()) AND MONTH(t.fecha) <= MONTH(CURRENT_DATE())
GROUP BY YEAR(t.fecha), MONTH(t.fecha);

-- Cantidad promedio de productos por venta--
SELECT AVG(CantidadProducto) AS Cantidad_Promedio_Productos
FROM h_Ventas;





