USE hec_dim;

/*12 consultas para el DataMart*/

/*Total de ventas realizadas-------------------------------------------------------------------*/

	SELECT 
	  p.marca,
	  COUNT(h.id_hv) AS cantidad_ventas
	FROM 
	  h_Ventas h
	JOIN 
	  d_Producto p ON h.id_Producto = p.id_Producto
	GROUP BY 
	p.marca;
        
/*Total de ventas por vendedor----------------------------------------------------------------*/

	SELECT 
		v.nombre,
		v.apellido,
		COUNT(h.id_hv) AS cantidad_ventas
	FROM 
		h_Ventas h
	JOIN 
		d_Vendedor v ON h.id_Vendedor = v.id_Vendedor
	GROUP BY 
		v.nombre, v.apellido;
        
/*Total de ventas por cliente-----------------------------------------------------------------*/

    SELECT CONCAT(c.nombre, ' ', c.apellido) AS Nombre_Cliente, COUNT(*) AS Total_Ventas
    FROM 
        h_Ventas h
    INNER JOIN 
        d_Clientes c ON h.id_Cliente = c.id_Cliente
    GROUP BY 
        Nombre_Cliente;

/*Total de ventas por productos---------------------------------------------------------------*/

    SELECT 
       Producto, COUNT(*) AS Total_Ventas
    FROM 
       h_Ventas h
    INNER JOIN 
       d_Producto p ON h.id_Producto = p.id_Producto
    GROUP BY 
       Producto;
       
/*Total de ventas por día de la semana--------------------------------------------------------*/

SELECT 
    CASE DAYOFWEEK(t.fecha)
        WHEN 1 THEN 'Domingo'
        WHEN 2 THEN 'Lunes'
        WHEN 3 THEN 'Martes'
        WHEN 4 THEN 'Miércoles'
        WHEN 5 THEN 'Jueves'
        WHEN 6 THEN 'Viernes'
        WHEN 7 THEN 'Sábado'
    END AS Dia_Semana,
    COUNT(*) AS Total_Ventas
    FROM 
        h_Ventas h
    INNER JOIN 
        d_tiempo t ON h.id_tiempo = t.id_tiempo
    GROUP BY 
        Dia_Semana;
        
/*Total de ventas por mes y año----------------------------------------------------------------*/

    SELECT YEAR
       (t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(*) AS Total_Ventas
    FROM 
       h_Ventas h
    INNER JOIN 
       d_tiempo t ON h.id_tiempo = t.id_tiempo
    GROUP BY YEAR
       (t.fecha), MONTH(t.fecha);
       
/*Total de ventas por tipo de venta------------------------------------------------------------*/

      SELECT 
        TipoVentas, COUNT(*) AS Total_Ventas
      FROM 
        h_Ventas
      GROUP BY 
        TipoVentas;
        
/*ingreso anuales por año----------------------------------------------------------------------*/

      SELECT YEAR
        (t.fecha) AS Año, SUM(h.TotalVenta) AS Ingresos_Año_Actual
      FROM 
        h_Ventas h
      INNER JOIN 
        d_tiempo t ON h.id_tiempo = t.id_tiempo
      GROUP BY YEAR
        (t.fecha);
        
/*Ganancias de los productos-------------------------------------------------------------------*/

      SELECT 
        p.Producto, SUM(h.TotalVenta) AS Ventas_Totales
      FROM 
        h_Ventas h
      INNER JOIN 
        d_Producto p ON h.id_Producto = p.id_Producto
      GROUP BY 
        p.Producto
      HAVING 
        Ventas_Totales < (SELECT 0.7 * SUM(TotalVenta) FROM h_Ventas)
         OR Ventas_Totales < (SELECT 0.4 * SUM(TotalVenta) FROM h_Ventas);

/*Ventas totales por categoría de producto-----------------------------------------------------*/

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
            
/*Promedio de ventas por producto--------------------------------------------------------------*/

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
            
/*Top 10 productos más vendidos por cantidad--------------------------------------------------*/

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
      LIMIT 10;
      
/*---------------------------------------------------------------------------------------------*/