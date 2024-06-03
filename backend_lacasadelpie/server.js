const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 5000;

app.use(express.json({limit:'59mb'}));

// manejador de errores
app.use((err,req,res,next)=>{
  if (err instanceof SyntaxError &&'body'in err){
    res.status (400).send({error:'Error en el analisis de Json'})
  }else{
    next() 
  }
});


app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql2023',
  database: 'casadelpies1'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Configuración de la conexión a la segunda base de datos
const db2 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql2023',
  database: 'hec_dim'
});

db2.connect((err) => {
  if (err) {
    console.error('Error de conexión a la segunda base de datos:', err);
  } else {
    console.log('Conexión exitosa a la segunda base de datos');
  }
});

// Configurar el uso de CORS
app.use(cors());


const estadisticas = require('./routes/estadisticas')(db2);
app.use('/estadisticas', estadisticas);

const crudRoutes = require('./routes/crudRoutes')(db);
app.use('/crud', crudRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Codigo funcionando en el puerto ${port}`);
});
