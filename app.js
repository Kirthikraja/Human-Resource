const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'ASIAVCSTZY3COBCMSR65',
    secretAccessKey: 'FmM3ofoMH1eMsf7KNz7KBPOk9/lwo5W4b31NBMQu',
    sessionToken: 'FwoGZXIvYXdzEO7//////////wEaDOdr9TBzlp47Bs0mXiLWAQED7n4bnUJmfgZOwpOBOVxJHXWkwGdSdVidTnbq2cAkF+JuKmLWsIFenyBaN7EOXRgpx0wLoHDlnjBsAb6b2lyuSuW7DWo8+eRovHzVwX6C6HYyiLC5YBjQUWFQJ/cndCkjPNUAfkK/+YXTx5vuJLqHPGEsjK03k8TCfFkBxzms29/tEPlfG34Kmonl7mAL8bRmICiXKIMb2R1DCc4w3d3NCCTbvzWh8WwfRWONMUlSf7Jyvz6bk27/TVDDHwmfEa5yHaVU3juOwwMUlgy9hbQVmi1QX44ooOTX/QUyLdji0/x6UC/7T2edDz7GRG5fbdvrkMfhPSo6YKh6hzhGaqP54TbkewA3Z5Wq7A== ',
    region: 'us-east-1'
});
const multer = require('multer');
const morgan=require('morgan');
const config = require("./config.json");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sql = require("mysql");
app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(morgan("dev"));

var sqlConnection = sql.createConnection({
    host: "database-1.cm9oe9pdplex.us-east-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "kirthik2",
    database: "employeedetails",
    multipleStatements: true
});

sqlConnection.connect(function(err) {
    if (!err) {
        console.log("Connected to SQL");
    } else {
        console.log("Connection Failed" + err);
    }
});

app.post("/employee", async function(req, res) {
    var {EName,DOB,Email,Gender,Address,EmployeeRole,EmployeeId,City,State,Zip,Salary}=req.body
    console.log(req.body);


    await sqlConnection.query("INSERT into EmployeeDetails set ?", {EName,DOB,Email,Gender,Address,EmployeeRole,EmployeeId,City,State,Zip,Salary} , async function(err, results) {
        if (err) {
            console.log(err);
        } else {
            try {
                sqlConnection.query('select * from EmployeeDetails', function (error, results, fields) {
                    if (error) throw error;

                  }) 
            } catch (error) {
                console.log(error);
            }

        }


    })
    
});
    

app.post("/employee1", async function(req, res) {
    var {Eid,Salary}=req.body
    console.log(req.body)

    sqlConnection.query(`UPDATE EmployeeDetails SET ? WHERE EmployeeID ="${Eid}"`, { Salary }, async function (err, results) {
        {
            if (err) {
                console.log(err);
            } else {
                try {
                    sqlConnection.query('select * from EmployeeDetails', function (error, results, fields) {
                        if (error)
                            throw error;

                    });
                } catch (error) {
                    console.log(error);
                }

            }


        }
    })


})
app.post("/login_page", async function(req, res) {
    res.redirect("/Untitled-1.hmtl")})

    app.listen(3000, function() {
        console.log("Server Running at 3000");
    })
