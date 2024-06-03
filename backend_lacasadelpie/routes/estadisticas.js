const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Rutas para d_ModoPagos
  router.get('/modosdepago', (req, res) => {
    const sql = 'SELECT * FROM d_ModoPagos';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener modos de pago:', err);
        res.status(500).json({ error: 'Error al obtener modos de pago' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Rutas para d_Vendedor
  router.get('/vendedores', (req, res) => {
    const sql = 'SELECT * FROM d_Vendedor';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener vendedores:', err);
        res.status(500).json({ error: 'Error al obtener vendedores' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Rutas para d_Clientes
  router.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM d_Clientes';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).json({ error: 'Error al obtener clientes' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Rutas para h_Ventas
  router.get('/ventas', (req, res) => {
    const sql = 'SELECT * FROM h_Ventas';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas:', err);
        res.status(500).json({ error: 'Error al obtener ventas' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporcliente/:id_Cliente', (req, res) => {
    const { id_Cliente } = req.params;
    const sql = 'SELECT * FROM h_Ventas WHERE id_Cliente = ?';
    db.query(sql, [id_Cliente], (err, result) => {
      if (err) {
        console.error('Error al obtener ventas por cliente:', err);
        res.status(500).json({ error: 'Error al obtener ventas por cliente' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporvendedor/:id_Vendedor', (req, res) => {
    const { id_Vendedor } = req.params;
    const sql = 'SELECT * FROM h_Ventas WHERE id_Vendedor = ?';
    db.query(sql, [id_Vendedor], (err, result) => {
      if (err) {
        console.error('Error al obtener ventas por vendedor:', err);
        res.status(500).json({ error: 'Error al obtener ventas por vendedor' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Rutas para d_Producto
  router.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM d_Producto';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error al obtener productos' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Rutas para d_tiempo
  router.get('/tiempos', (req, res) => {
    const sql = 'SELECT * FROM d_tiempo';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener tiempos:', err);
        res.status(500).json({ error: 'Error al obtener tiempos' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  return router;
};
