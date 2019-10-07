const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');


///   connect  mongoose to database
let db;
Mongoose.connect("mongodb://localhost:27017/schooldata", function(err, db) {
     db = Mongoose.connection;
  if(err) { return console.dir(err); }
  else{console.log("connection established")} 
  
});
////////////////////////////////////////////////////////////////////////////////////////////
///////-------->1. Find all schools located in Jaipur  <---------------------
function first(){
var startTime = moment();
 schoolModel.find({ 'data.district': 'JAIPUR' }, 'data.name-of-institution', function (err, doc) {  
      if (!err)
          { 
          console.log(doc);
          }
      else 
          { console.log(err) };  
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
      console.log(diff); 
})
}
first();
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////-------> 2. Find all schools located in Rajasthan <-------------------
function second(){
  var startTime = moment();
schoolModel.find({ 'data.state': 'RAJASTHAN' }, 'data.name-of-institution data.district', function (err, doc) {
      if (!err) 
        {  
         //  console.log(doc);
        }   
      else 
          return console.log(err);    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
     // console.log(diff); 
})
}
second();
//////////////////////////////////////////////////////////////////////////////////////////////
///////-------> 3. Find all schools started after 1 Jan 2017 <-------------------
function third(){
  var startTime = moment();
schoolModel.find({"data.from":{$gt :"1/1/2017"}}, 'data.name-of-institution ', function (err, doc) {
      if (!err) 
           {
           // console.log(doc);   
           }
      else 
          {return console.log(err);}    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
      // console.log(diff); 
})
}
third();
/////////////////////////////////////////////////////////////////////////////
//////--------> 4. Make a table of all schools in Karnataka with 
//     Column 1 as the name of the district and column 2 as the number of schools in that district<-------------------
function fourth(){
  var startTime = moment();
schoolModel.aggregate([{$match:{"data.state":"KARNATAKA"}},{$group:{_id:"$data.district",schools:{$sum:1}}}],  function (err, doc) {
      if (!err) 
        {
          //console.log(doc);  
        } 
      else 
          {return console.log(err);}    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
      //console.log(diff); 
}) 
}
fourth();
////////////////////////////////////////////////



