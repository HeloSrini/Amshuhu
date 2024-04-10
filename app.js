const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors=require('cors')
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  {
    extended:true
  }
));

const myscript ={
  origin:'http://localhost:4200'
};

app.use(cors(myscript));

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
  pool.query('select * from company', (error, results) => {
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
  
  pool.query('insert into company set ?',dataPost, (error, results) => {
    if (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Employee created successfully', Id: results.insertId });
    }
  });
}


// Function to handle PUT requests 
function handleEditData(req, res,next) {
  const newDataPut = req.body;
  const sql = 'UPDATE company SET ?WHERE cmpid = ?';
  pool.query(sql, [newDataPut, req.params.id], (error, result) => {
    if (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
}

// Function to handle PUT requests 

function  handlePut(req, res, next)
{
  // const id = req.params.cmpid;
  const data= req.body;
  const sql = 'UPDATE company SET status = ? where cmpid=?'; 
 console.log(data);
  pool.query(`UPDATE company SET status=? where cmpid=?`,[data.status,data.id], (error, result) => {
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
  const sql = 'DELETE FROM isteer_ WHERE id = ?';
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
  'handlePost1': handlePost,
 'handlePut':handlePut,
 'handleDelete':handleDelete
};


app.get('/:function', (req, res, next) => {
  const operation  = req.params.function;
  const handler = operations[operation];

  if (handler) {
      handler(req, res, next);
  } else {
      res.status(400).send("Invalid operation");
  }
});

app.post('/handlePost',handlePost)
app.put ('/handlePut',handlePut)
app.put ('/handlePut/:id',handleEditData)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//Two Tables
//select isteer_pro_jobcard.vehicle_number,isteer_pro_jobcard_spares.spares_name,isteer_pro_service_requested.service_name from isteer_pro_jobcard inner join isteer_pro_jobcard_spares on isteer_pro_jobcard.jobcard_id=isteer_pro_jobcard_spares.jobcard_id;


//Three Tables;
//SELECT isteer_pro_jobcard.owner_id,isteer_pro_jobcard_spares.spare_name,isteer_pro_service_requested.service_name FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id = isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_requested.jobcard_id LIMIT 10;


// SELECT isteer_pro_jobcard.jobcard_id 
// FROM isteer_pro_jobcard, isteer_pro_jobcard_spares, isteer_pro_service_requested limit 10;


// SELECT isteer_pro_jobcard.owner_id,isteer_pro_jobcard_spares.spare_name,isteer_pro_jobcard.customer_id,isteer_pro_jobcard_spares.labour_price,isteer_pro_service_requested.service_name FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id
// = isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_request
// ed.jobcard_id ;


//Insert Using 
//  INSERT INTO isteer_pro_jobcard (status) values ("updated")
//  SELECT status
//  FROM isteer_pro_jobcard 
//  INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id = isteer_pro_jobcard_spares.jobcard_id
// INNER JOIN isteer_pro_service_requested  ON isteer_pro_jobcard_spares.jobcard_id = isteer_pro_service_requested.jobcard_id;

// INSERT INTO isteer_pro_jobcard (jobcard_from)
// VALUES ('Salesman');

/*SELECT ipj.owner_id,ipj.customer_id,ipjs.labour_price,ipsr.service_name FROM isteer_pro_jobcard AS ipj INNER JOIN 
isteer_pro_jobcard_spares AS ipjs ON ipj.jobcard_id = ipjs.jobcard_id INNER JOIN 
isteer_pro_service_requested AS ipsr ON ipj.jobcard_id = ipsr.jobcard_id;

*/
// SELECT ipj.owner_id,ipsr.service_name FROM isteer_pro_jobcard AS ipj INNER JOIN 
// isteer_pro_jobcard_spares AS ipjs ON ipj.jobcard_id = ipjs.jobcard_id INNER JOIN isteer_pro_service_requested AS ipsr ON ipj.jobcard_id = ipsr.jobcard_id;

// SELECT ipj.owner_id,ipj.customer_id FROM isteer_pro_jobcard AS ipj JOIN 
// isteer_pro_jobcard_spares AS ipjs ON ipj.jobcard_id = ipjs.jobcard_id INNER JOIN isteer_pro_service_requested AS ipsr ON ipj.jobcard_id = ipsr.jobcard_id;


// SELECT columns
// FROM table1
// INNER JOIN table2 ON table1.column = table2.column;


// select isteer_pro_jobcard_spares.spare_name,isteer_pro_jobcard_spares.qty,isteer_pro_service_requested.attachment,isteer_pro_service_requested.service_name from isteer_pro_jobcard_spares join isteer_pro_service_requested on isteer_pro_jobcard_spares.jobcard_id=isteer_pro_service_requested.jobcard_id


// QUERY ACCEPTED;
// SELECT isteer_pro_jobcard.customer_phone,isteer_pro_jobcard_spares.spare_name,isteer_pro_service_requested.qty FROM isteer_pro_jobcard INNER JOIN isteer_pro_jobcard_spares ON isteer_pro_jobcard.jobcard_id = isteer_pro_jobcard_spares.jobcard_id  INNER JOIN isteer_pro_service_requested ON isteer_pro_jobcard.jobcard_id = isteer_pro_service_requested.jobcard_id LIMIT 10;



// {"jobcard_from":"Helo","pick_up_latitude":"Leftt","pick_up_longitude":"Rightt"}
// {"qty":2,"labour_price":"1000","jobcard_id":59}
// {"jobcard_id":59,"service_menu_id":34,"qty":78,"price":"250","subservice_id":256}    