const express= require('express');
const Mongoose=require('mongoose');
const school=require('./school.js')




let db;
Mongoose.connect("mongodb://localhost:27017/schooldata", function(err, db) {
     db = Mongoose.connection;
  if(err) { return console.dir(err); }
  else{console.log("connection established")} 
  
});
 

 schoolModel.find({}).then( (doc) =>{
     console.log(doc);
 }).catch ( (err)=>{console.log(err)})

