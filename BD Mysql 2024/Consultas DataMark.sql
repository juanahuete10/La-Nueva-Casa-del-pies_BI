USE hec_dim;

-- Ventas totales por año:
SELECT 
    anio, 
    SUM(total_Venta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    anio;

-- Ventas totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    mes, 
    SUM(total_Venta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
WHERE 
    anio = 2024
GROUP BY 
    mes;

-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
SELECT 
    dia, 
    SUM(total_Venta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
WHERE 
    anio = 2024 AND mes = 5
GROUP BY 
    dia;

-- Ventas totales por trimestre:
SELECT 
    trimestre, 
    SUM(total_Venta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    trimestre;

-- Ventas totales por producto:
SELECT 
    id_Producto, 
    Producto, 
    SUM(total_Venta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
GROUP BY 
    id_Producto, Producto;

-- Ventas totales por categoría de producto:
SELECT 
    nombre_C,
    SUM(total_Venta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
GROUP BY 
    nombre_C
ORDER BY 
    Ventas_Totales DESC;

-- Ventas de productos activos:
SELECT 
    nombre,
    SUM(total_Venta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
WHERE 
    activo = TRUE
GROUP BY 
    nombre
ORDER BY 
    Ventas_Totales DESC;

-- Ventas de productos en stock (productos con stock mayor a 0):
SELECT 
    nombre,
    SUM(total_Venta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
WHERE 
    cantidad > 0
GROUP BY 
    nombre
ORDER BY 
    Ventas_Totales DESC;

-- Promedio de ventas por producto:    
SELECT 
    nombre,
    AVG(total_Venta) AS Promedio_Ventas
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
GROUP BY 
    nombre
ORDER BY 
    Promedio_Ventas DESC;

-- Ventas por producto y por mes:
SELECT 
    Producto,
    mes,
    anio,
    SUM(total_Venta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    Producto, mes, anio
ORDER BY 
    anio, mes, Ventas_Totales DESC;

-- Top 5 productos más vendidos por cantidad:
SELECT 
    Producto,
    SUM(cantidad) AS Cantidad_Total_Vendida
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
GROUP BY 
    Producto
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;

-- Top 5 productos más vendidos por cantidad:
SELECT 
    Producto,
    SUM(total_Venta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_Producto = d_Producto.id_Producto
GROUP BY 
    Producto
ORDER BY 
    Ventas_Totales DESC
LIMIT 5;
