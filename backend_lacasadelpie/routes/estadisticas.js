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
  router.get('/clientes', (req, res) => {
    const sql = 
    `SELECT CONCAT(c.nombre, ' ', c.apellido) AS Nombre_Cliente, COUNT(*) AS Total_Ventas
    FROM h_Ventas h
    INNER JOIN d_Clientes c ON h.id_Cliente = c.id_Cliente
    GROUP BY Nombre_Cliente;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).json({ error: 'Error al obtener clientes' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Total de ventas por productos
  router.get('/ventas', (req, res) => {
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
  router.get('/ventas', (req, res) => {
    const sql = 
    `SELECT DAYNAME(fecha) AS Dia_Semana, COUNT(*) AS Total_Ventas
    FROM h_Ventas h
    INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
    GROUP BY Dia_Semana;`;

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
  router.get('/ventas', (req, res) => {
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

    // Total de ventas por marca
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT p.marca, COUNT(*) AS Total_Ventas
      FROM h_Ventas h
      INNER JOIN d_Producto p ON h.id_Producto = p.id_Producto
      GROUP BY p.marca
      ORDER BY Total_Ventas ASC;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas:', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Total de ventas por vendedor en un período específico
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT CONCAT(v.nombre, ' ', v.apellido) AS Nombre_Vendedor, COUNT(*) AS Total_Ventas
      FROM h_Ventas h
      INNER JOIN d_Vendedor v ON h.id_Vendedor = v.id_Vendedor
      INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
      WHERE MONTH(t.fecha) = 6 AND YEAR(t.fecha) = 2024
      GROUP BY Nombre_Vendedor;`;
  
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
    router.get('/ventas', (req, res) => {
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
    router.get('/tiempo', (req, res) => {
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

    // Productos con poca ganancia
    router.get('/productos', (req, res) => {
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

    // Para el número de clientes nuevos
    router.get('/clientes', (req, res) => {
      const sql = 
      `SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(DISTINCT h.id_Cliente) AS Clientes_Nuevos
      FROM h_Ventas h
      INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
      GROUP BY YEAR(t.fecha), MONTH(t.fecha);`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener clientes', err);
          res.status(500).json({ error: 'Error al obtener clientes' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Retencion clientes
    router.get('/clientes', (req, res) => {
      const sql = 
      `SELECT YEAR(t.fecha) AS Año, MONTH(t.fecha) AS Mes, COUNT(DISTINCT h.id_Cliente) AS Clientes_Retención
      FROM h_Ventas h
      INNER JOIN d_tiempo t ON h.id_tiempo = t.id_tiempo
      WHERE YEAR(t.fecha) = YEAR(CURRENT_DATE()) AND MONTH(t.fecha) <= MONTH(CURRENT_DATE())
      GROUP BY YEAR(t.fecha), MONTH(t.fecha);`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener clientes', err);
          res.status(500).json({ error: 'Error al obtener clientes' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Cantidad promedio de productos por venta
    router.get('/productos', (req, res) => {
      const sql = 
      `SELECT AVG(CantidadProducto) AS Cantidad_Promedio_Productos
      FROM h_Ventas;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Mauricio---------------------------------------------------------------------------------------------------------

    // Ventas totales por año:
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT 
            d_tiempo.anio, 
            SUM(h_Ventas.TotalVenta) AS Ventas_totales
      FROM 
            h_Ventas
      JOIN 
            d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
      GROUP BY 
            d_tiempo.anio;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

    // Ventas totales por mes de un año específico (por ejemplo, 2024):
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT 
            d_tiempo.mes, 
            SUM(h_Ventas.TotalVenta) AS Ventas_totales
      FROM 
            h_Ventas
      JOIN 
            d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
      WHERE 
            d_tiempo.anio = 2024
      GROUP BY 
            d_tiempo.mes;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT 
            d_tiempo.dia, 
            SUM(h_Ventas.TotalVenta) AS Ventas_totales
      FROM 
            h_Ventas
      JOIN 
            d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
      WHERE 
            d_tiempo.anio = 2024 AND d_tiempo.mes = 5
      GROUP BY 
            d_tiempo.dia;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Ventas totales por trimestre:
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT 
            QUARTER(d_tiempo.fecha) AS Trimestre, 
            SUM(h_Ventas.TotalVenta) AS Ventas_totales
      FROM 
            h_Ventas
      JOIN 
            d_tiempo ON h_Ventas.id_tiempo = d_tiempo.id_tiempo
      GROUP BY 
            Trimestre;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Ventas totales por producto:
    router.get('/productos', (req, res) => {
      const sql = 
      `SELECT 
            d_Producto.id_Producto, 
            d_Producto.Producto, 
            SUM(h_Ventas.TotalVenta) AS Ventas_totales
      FROM 
          h_Ventas
      JOIN 
          d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
      GROUP BY 
          d_Producto.id_Producto, d_Producto.Producto;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Ventas totales por categoría de producto:
    router.get('/ventas', (req, res) => {
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
    router.get('/ventas', (req, res) => {
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

        // Ventas por producto y por mes:
    router.get('/ventas', (req, res) => {
      const sql = 
      `SELECT 
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
            d_tiempo.anio, d_tiempo.mes, Ventas_Totales DESC;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener ventas', err);
          res.status(500).json({ error: 'Error al obtener ventas' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Top 5 productos más vendidos por cantidad:
    router.get('/productos', (req, res) => {
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
      LIMIT 5;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Top 5 productos más vendidos por cantidad:
    router.get('/productos', (req, res) => {
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
      LIMIT 5;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Top 5 productos más vendidos por valor:
    router.get('/productos', (req, res) => {
      const sql = 
      `SELECT 
            d_Producto.Producto,
            SUM(h_Ventas.TotalVenta) AS Ventas_Totales
      ROM 
            h_Ventas
      JOIN 
            d_Producto ON h_Ventas.id_producto = d_Producto.id_Producto
      GROUP BY 
            d_Producto.Producto
      ORDER BY 
            Ventas_Totales DESC
      LIMIT 5;`;
  
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al obtener productos', err);
          res.status(500).json({ error: 'Error al obtener productos' });
        } else {
          res.status(200).json(result);
        }
      });
    });

        // Top 50 productos más vendidos por cantidad:
    router.get('/productos', (req, res) => {
      const sql = 
      `SELECT 
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
      LIMIT 50;`;
  
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
