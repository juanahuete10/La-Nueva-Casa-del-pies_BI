USE hec_dim;

-- Ventas totales por año
SELECT 
    t.anio, 
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY 
    t.anio;

-- Ventas totales por mes de un año específico (por ejemplo, 2024)
SELECT 
    t.mes, 
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_tiempo t ON h.id_tiempo = t.id_tiempo
WHERE 
    t.anio = 2024
GROUP BY 
    t.mes;

-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024)
SELECT 
    t.dia, 
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_tiempo t ON h.id_tiempo = t.id_tiempo
WHERE 
    t.anio = 2024 AND t.mes = 5
GROUP BY 
    t.dia;

-- Ventas totales por trimestre
SELECT 
    QUARTER(t.fecha) AS Trimestre, 
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY 
    Trimestre;

-- Ventas totales por producto
SELECT 
    p.id_Producto, 
    p.Producto AS Nombre_Producto, 
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY 
    p.id_Producto, p.Producto;

-- Ventas totales por categoría de producto
SELECT 
    p.nombre_C AS Nombre_Categoria,
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY 
    p.nombre_C
ORDER BY 
    Ventas_totales DESC;

-- Ventas totales por productos en stock (productos con stock mayor a 0)
SELECT 
    p.Producto AS Nombre_Producto,
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
WHERE 
    p.cantidad > 0
GROUP BY 
    p.Producto
ORDER BY 
    Ventas_totales DESC;

-- Promedio de ventas por producto    
SELECT 
    p.Producto AS Nombre_Producto,
    AVG(h.total_Venta) AS Promedio_Ventas
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY 
    p.Producto
ORDER BY 
    Promedio_Ventas DESC;

-- Ventas por producto y por mes
SELECT 
    p.Producto AS Nombre_Producto,
    t.mes,
    t.anio,
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
JOIN 
    d_tiempo t ON h.id_tiempo = t.id_tiempo
GROUP BY 
    p.Producto, t.mes, t.anio
ORDER BY 
    t.anio, t.mes, Ventas_totales DESC;

-- Top 5 productos más vendidos por cantidad
SELECT 
    p.Producto AS Nombre_Producto,
    SUM(h.id_Producto) AS Cantidad_Total_Vendida
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY 
    p.Producto
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;

-- Top 5 productos más vendidos por monto de ventas
SELECT 
    p.Producto AS Nombre_Producto,
    SUM(h.total_Venta) AS Ventas_totales
FROM 
    h_Ventas h
JOIN 
    d_Producto p ON h.id_Producto = p.id_Producto
GROUP BY 
    p.Producto
ORDER BY 
    Ventas_totales DESC
LIMIT 5;
