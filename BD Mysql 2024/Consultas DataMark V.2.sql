USE hec_dim;

/*11 consultas*/

-- Ventas totales por año:
SELECT 
    d_tiempo.anio, 
    SUM(h_Ventas.TotalVenta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    d_tiempo.anio;

-- Ventas totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    d_tiempo.mes, 
    SUM(h_Ventas.TotalVenta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
WHERE 
    d_tiempo.anio = 2024
GROUP BY 
    d_tiempo.mes;

-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
SELECT 
    d_tiempo.dia, 
    SUM(h_Ventas.TotalVenta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
WHERE 
    d_tiempo.anio = 2024 AND d_tiempo.mes = 5
GROUP BY 
    d_tiempo.dia;

-- Ventas totales por trimestre:
SELECT 
    QUARTER(d_tiempo.fecha) AS Trimestre, 
    SUM(h_Ventas.TotalVenta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    Trimestre;

-- Ventas totales por producto:
SELECT 
    d_Producto.id_Producto, 
    d_Producto.Producto, 
    SUM(h_Ventas.TotalVenta) AS Ventas_totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
GROUP BY 
    d_Producto.id_Producto, d_Producto.Producto;

-- Ventas totales por categoría de producto:
SELECT 
    d_Producto.nombre_C,
    SUM(h_Ventas.TotalVenta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
GROUP BY 
    d_Producto.nombre_C
ORDER BY 
    Ventas_Totales DESC;

-- Promedio de ventas por producto:    
SELECT 
    d_Producto.Producto,
    AVG(h_Ventas.TotalVenta) AS Promedio_Ventas
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
GROUP BY 
    d_Producto.Producto
ORDER BY 
    Promedio_Ventas DESC;

-- Ventas por producto y por mes:
SELECT 
    d_Producto.Producto,
    d_tiempo.mes,
    d_tiempo.anio,
    SUM(h_Ventas.TotalVenta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
JOIN 
    d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
GROUP BY 
    d_Producto.Producto, d_tiempo.mes, d_tiempo.anio
ORDER BY 
    d_tiempo.anio, d_tiempo.mes, Ventas_Totales DESC;

-- Top 5 productos más vendidos por cantidad:
SELECT 
    d_Producto.Producto,
    SUM(h_Ventas.cantidadProducto) AS Cantidad_Total_Vendida
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
GROUP BY 
    d_Producto.Producto
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;

-- Top 5 productos más vendidos por valor:
SELECT 
    d_Producto.Producto,
    SUM(h_Ventas.TotalVenta) AS Ventas_Totales
FROM 
    h_Ventas
JOIN 
    d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
GROUP BY 
    d_Producto.Producto
ORDER BY 
    Ventas_Totales DESC
LIMIT 5;

-- Top 50 productos más vendidos por cantidad:
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
LIMIT 50;
