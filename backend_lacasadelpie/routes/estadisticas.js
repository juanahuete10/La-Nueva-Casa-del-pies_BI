const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Total de ventas realizadas
  router.get('/ventaspormarca', (req, res) => {
    const sql = `
      SELECT 
          p.marca,
          COUNT(h.id_hv) AS cantidad_ventas
      FROM 
          h_Ventas h
      JOIN 
          d_Producto p ON h.id_Producto = p.id_Producto
      GROUP BY 
        p.marca;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas por marca:', err);
        res.status(500).json({ error: 'Error al obtener ventas por marca' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por vendedor
  router.get('/vendedores', (req, res) => {
    const sql =
    `SELECT 
        v.nombre,
        v.apellido,
        COUNT(h.id_hv) AS cantidad_ventas
    FROM 
        h_Ventas h
    JOIN 
        d_Vendedor v ON h.id_Vendedor = v.id_Vendedor
    GROUP BY 
        v.nombre, v.apellido;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener vendedores:', err);
        res.status(500).json({ error: 'Error al obtener vendedores' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por cliente
  router.get('/ventasporcliente', (req, res) => {
    const sql = 
    `SELECT CONCAT(c.nombre, ' ', c.apellido) AS Nombre_Cliente, COUNT(*) AS Total_Ventas
    FROM h_Ventas h
    INNER JOIN d_Clientes c ON h.id_Cliente = c.id_Cliente
    GROUP BY Nombre_Cliente;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas por cliente:', err);
        res.status(500).json({ error: 'Error al obtener ventas por cliente' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por productos
  router.get('/ventasporproducto', (req, res) => {
    const sql = 
    `SELECT Producto, COUNT(*) AS Total_Ventas
    FROM h_Ventas h
    INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
    GROUP BY Producto;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error al obtener productos' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por día de la semana
  router.get('/ventaspordiasemana', (req, res) => {
    const sql = 
    `SELECT 
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
        Dia_Semana;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas:', err);
        res.status(500).json({ error: 'Error al obtener ventas' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por mes y año
  router.get('/ventaspormesyanio', (req, res) => {
    const sql = 
    `SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(*) AS Total_Ventas
    FROM h_Ventas h
    INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
    GROUP BY YEAR(t.fecha), MONTH(t.fecha);`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas:', err);
        res.status(500).json({ error: 'Error al obtener ventas' });
      } else {
        res.status(200).json(result);
      }
    });
  });

    // Total de ventas por tipo de venta
    router.get('/ventasportipo', (req, res) => {
      const sql = 
      `SELECT TipoVentas, COUNT(*) AS Total_Ventas
      FROM h_Ventas
      GROUP BY TipoVentas;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas:', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // ingreso anuales por año 
    router.get('/tiempoingresoanualporanio', (req, res) => {
      const sql = 
      `SELECT YEAR(t.fecha) AS Año, SUM(h.TotalVenta) AS Ingresos_Año_Actual
      FROM h_Ventas h
      INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
      GROUP BY YEAR(t.fecha);`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener tiempo:', err);
          res.status(500).json({ error: 'Error al obtener tiempo' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Ganancias de los productos
    router.get('/productosganancias', (req, res) => {
      const sql = 
      `SELECT p.Producto, SUM(h.TotalVenta) AS Ventas_Totales
      FROM h_Ventas h
      INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
      GROUP BY p.Producto
      HAVING Ventas_Totales < (SELECT 0.7 * SUM(TotalVenta) FROM h_Ventas)
         OR Ventas_Totales < (SELECT 0.4 * SUM(TotalVenta) FROM h_Ventas);`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    //-------------------------------------------------------------------------------------------------------------------

        // Ventas totales por categoría de producto
    router.get('/ventasporcategoriaproducto', (req, res) => {
      const sql = 
      `SELECT 
            d_Producto.nombre_C,
            SUM(h_Ventas.TotalVenta) AS Ventas_Totales
      FROM 
            h_Ventas
      JOIN 
            d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
      GROUP BY 
            d_Producto.nombre_C
      ORDER BY 
            Ventas_Totales DESC;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Promedio de ventas por producto: 
    router.get('/promedioventasporproducto', (req, res) => {
      const sql = 
      `SELECT 
            d_Producto.Producto,
            AVG(h_Ventas.TotalVenta) AS Promedio_Ventas
      FROM 
            h_Ventas
      JOIN 
            d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
      GROUP BY 
            d_Producto.Producto
      ORDER BY 
            Promedio_Ventas DESC;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Top 10 productos más vendidos por cantidad:
    router.get('/productosmasvendidos', (req, res) => {
      const sql = 
      `SELECT 
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
      LIMIT 10;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });
  
  return router;
};
