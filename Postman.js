const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  {
    extended:true
  }
));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mconnect'
});

pool.getConnection(err=>
  
  {
    if(err) throw err;
    console.log("Connection Successfull");
  });
// Function to handle GET requests
function handleGet(req, res,next){
  pool.query('SELECT isteer_pro_jobcard.owner_id,isteer_pro_jobcard_spares.spare_name,isteer_pro_service_requested.service_name FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id = isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_requested.jobcard_id limit 20;', (error, results) => {
    if (error) {
      // console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
}

// Function to handle POST requests
function handlePost(req, res,next) {
  const dataPost = req.body;
  const sql = 'INSERT INTO isteer_customer(name, vehicle_number, vehicle_brand, email, user_id, updated_on) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(sql, [dataPost.name, dataPost.vehicle_number, dataPost.vehicle_brand, dataPost.email, dataPost.user_id, dataPost.updated_on], (error, results) => {
    if (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Employee created successfully', Id: results.insertId });
    }
  });
}

// Function to handle PUT requests
function handlePut(req, res,next) {
  const newDataPut = req.body;
  const sql = 'UPDATE isteer_customer SET ? WHERE id = ?';
  pool.query(sql, [newDataPut.choice, newDataPut.id], (error, result) => {
    if (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
}

// Function to handle DELETE requests
function handleDelete(req, res, next) {
  const newDataDelete = req.body;
  const sql = 'DELETE FROM isteer_customer WHERE id = ?';
  pool.query(sql, [newDataDelete.id], (error, result) => {
    if (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
}

const operations = {
  'handleGet': handleGet,
  'handlePost': handlePost,
 'handlePut':handlePut,
 'handleDelete':handleDelete
};


app.post('/:function', (req, res, next) => {
  const operation  = req.params.function;
  const handler = operations[operation];

  if (handler) {
      handler(req, res, next);
  } else {
      res.status(400).send("Invalid operation");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




//Two Tables
//select isteer_pro_jobcard.vehicle_number,isteer_pro_jobcard_spares.spares_name,isteer_pro_service_requested.service_name from isteer_pro_jobcard inner join isteer_pro_jobcard_spares on isteer_pro_jobcard.jobcard_id=isteer_pro_jobcard_spares.jobcard_id;


//Three Tables;
//SELECT isteer_pro_jobcard.owner_id,isteer_pro_jobcard_spares.spare_name,isteer_pro_service_requested.service_name FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id = isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_requested.jobcard_id LIMIT 10;


//SELECT isteer_pro_jobcard.jobcard_id 
//FROM isteer_pro_jobcard, isteer_pro_jobcard_spares, isteer_pro_service_requested limit 10;


//ELECT isteer_pro_jobcard.owner_id,isteer_pro_jobcard_spares.spare_name,isteer_pro_jobcard.customer_id,isteer_pro_jobcard_spares.labour_price,isteer_pro_service_requested.service_name FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id
 //= isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_request
 //ed.jobcard_id LIMIT 10;

