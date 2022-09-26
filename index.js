require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT
const Student = require('./DB/User');
mongoose.connect(process.env.db_URL);



app.get('/demo', (req, res) => {
    Student.find({firstname : 'Sky'}, (err, student) => {
        if (err) throw error;
        var response = {
            status: '200',
            data: student
        }
        res.send(response);
    })
})


app.post('/update', function (req, res) {
    if (req.query.id && req.query.firstname && req.query.lastname && req.query.email && req.query.email) {
        Student.updateOne({ _id: req.query.id }, {firstname: req.query.firstname, lastname: req.query.lastname, email: req.query.email, phone: req.query.phone}, (err, students) => {
            var response = {
                status: '200',
                message: 'student successfully update'
            }
            res.send(response);
        })
    }
    else {
        res.send("All field are required");
    }
})


app.get('/delete', (req, res) => {
    if (req.query.id) {
        Student.deleteOne({ "_id": req.query.id }, (err, student) => {
            if (err) throw error
            var response = {
                status: '200',
                message: 'Delete student successfully'
            }
            res.send(response);
        })
    }
    else {
        res.send("Student id required");
    }
})

app.get('/student', (req, res) => {
    if(req.query.studentid){
        Student.findOne({ _id: req.query.studentid }, (err, student) => {
            if (err){
                var response = {
                    status: '500',
                    message: 'Error - something went wrong. Please try' 
                }
                console.log(student);
                res.send(response);
            }
            else{
                if(student){
                    var response = {
                        status: '200',
                        data: student
                    }
                    console.log(student);
                    res.send(response);
                }
                else{
                    var response = {
                        status: '200',
                        message: 'Student not found' 
                    }
                    console.log(student);
                    res.send(response);
                }
            }
     
        })
    }
    else{
        res.send("Student ID required");
    }
})


app.get('/students', (req, res) => {
    Student.find({}, (err, student) => {
        if (err) throw error;
        var response = {
            status: '200',
            data: student
        }
        res.send(response);
    })
})

app.post('/', (req, res) => {
    const Studentdata = new Student(
        {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            email: req.query.email,
            phone: req.query.phone,
        }
    );

    Studentdata.save().then(() => {
        var response = {
            status: '200',
            message: 'Student data saved successfully'
        }
        res.send(response);
    });
})
app.listen(port)