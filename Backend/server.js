const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
const cors = require("cors");
server.use(bodyParser.json());
server.use(cors());

//Establish the database connection
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "dbschool",

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to Database");
    } else {
      console.log("successfully Connected to Database");
    }
});

//Establish the Port
server.listen(8070,function check(error) {
    if (error) 
    {
    console.log("Error....!!!!");
    }
    else 
    {
        console.log("Server is up and running on port 8070");
    }
});

//Create the Records
server.post("/api/student/add", (req, res) => {
  let details = {
    name: req.body.name,
    bday: req.body.bday,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Registered Failed" });
    } else {
      res.send({ status: true, message: "Student Registered successfully" });
    }
  });
});

//view the Records
server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to Database");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records
server.get("/api/student/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records
server.put("/api/student/update/:id", (req, res) => {
  let sql =
    "UPDATE student SET name='" +
    req.body.name +
    "', bday='" +
    req.body.bday +
    "',address='" +
    req.body.address +
    "',phone='" +
    req.body.phone +
    "',email='" +
    req.body.email +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

 //Delete the Records
 server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});