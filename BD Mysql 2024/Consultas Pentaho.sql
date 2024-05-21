use casadelpies1;
/*-----------------------------------------------------------------------------------------------*/

SELECT
    id_Cliente,
    cedula,
    nombre,
    apellido,
    historialdecompras
FROM
    Clientes;

/*-----------------------------------------------------------------------------------------------*/

SELECT
    id_ModoPago,
    Nombre_ModoPago
FROM
    ModoPagos;
    
/*-----------------------------------------------------------------------------------------------*/

SELECT 
    P.id_Producto,
    P.nombre AS Producto,
    C.nombre_C,
    P.precio,
    P.cantidad, 
    M.nombre_Marca AS marca
FROM 
    Productos AS P
INNER JOIN 
    Categorias AS C ON P.id_Categoria = C.id_Categoria
INNER JOIN 
    Marcas AS M ON P.id_Marca = M.id_Marca
    
/*-----------------------------------------------------------------------------------------------*/

SELECT
    CONCAT(
        YEAR(fecha), 
        LPAD(MONTH(fecha), 2, '0'), 
        LPAD(DAY(fecha), 2, '0')
    ) AS id_tiempo, 
    fecha,
    YEAR(fecha) AS Anio,
    MONTH(fecha) AS Mes,
    DAY(fecha) AS Dia
FROM 
    Ventas		
GROUP BY 
    fecha;

/*-----------------------------------------------------------------------------------------------*/

SELECT
    id_Vendedor,
    direccion,
    telefono,
    nombre,
    apellido
FROM
    Vendedor;
    
/*-----------------------------------------------------------------------------------------------*/

SELECT 
  DV.cod_Venta AS id_hv,  
  v.id_Cliente,
  DV.id_producto,
  v.id_Vendedor, 
  v.cod_Venta,
  v.Estado,
  DV.PrecioUnitario AS precio_Unit,
  v.id_ModoPago,
  v.TipoVentas,
  v.Direccion_Envio,
 CONCAT(
        YEAR(v.fecha), 
        LPAD(MONTH(v.fecha), 2, '0'), 
        LPAD(DAY(v.fecha), 2, '0')
    ) AS fecha, 
  v.Total_Venta
FROM 
Ventas v
INNER JOIN clientes C ON v.id_Cliente = C.id_Cliente
INNER JOIN detalleventa DV ON v.cod_Venta = DV.cod_Venta;

/*-----------------------------------------------------------------------------------------------*/