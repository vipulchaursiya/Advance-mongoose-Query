const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');


///   connect  mongoose to database
Mongoose.connect("mongodb://localhost:27017/schooldata", function(err, db) {   
  if(err) { return console.dir(err); }
  else{console.log("connection established")} 
  
});
////////////////////////////////////////////////////////////////////////////////////////////
///////-------->1. Find all schools located in Jaipur  <---------------------
function first1(){
  var startTime = moment(); 
 schoolModel.find({ 'data.district': 'JAIPUR' }, 'data.name-of-institution', function (err, doc) {  
   if (!err)
          { 
          console.log(doc);
          }
      else 
          { console.log(err) };  
      var timeNow = moment();
      let diff = moment(timeNow).diff(startTime);
      console.log("without aggregation")
      console.log(diff); 
})
}
first1();

////////--------------->1 find all schools in jaipur with aggregation<----------------
function first2(){ 
   var startTime1 = moment(); 
   schoolModel.aggregate([{$match:{"data.district":"JAIPUR"}},{$group:{_id:"$data.name-of-institution",count:{$sum:1}}}], function (err, doc) {      
    if (!err)
            { 
              console.log(doc);
            }
        else 
            { console.log(err) };  
        var timeNow = moment();
        console.log(timeNow)
        var diff = moment(timeNow).diff(startTime);
        console.log("with aggregation")
        console.log(diff);
  })
  }
  first2();
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////-------> 2. Find all schools located in Rajasthan <-------------------
function second1(){
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
     // console.log("without aggregation")
     // console.log(diff); 
})
}
second1();
/////////////----->2.find all schools loacted in Rajasthan with aggregation<-----------

function second2(){
  var startTime = moment();
schoolModel.aggregate([{$match:{"data.state":"JAIPUR"}},{$group:{_id:"$data.name-of-institution",count:{$sum:1}}}], function (err, doc) {
      if (!err) 
        {  
         //  console.log(doc);
        }   
      else 
          return console.log(err);    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
     // console.log("with aggregation");
     // console.log(diff); 
})
}
second2();

//////////////////////////////////////////////////////////////////////////////////////////////
///////-------> 3. Find all schools started after 1 Jan 2017 <-------------------
function third1(){
  var startTime = moment();
schoolModel.find({"data.from":{$gt :"2017"}}, 'data.name-of-institution', function (err, doc) {
      if (!err) 
           {
          //  console.log(doc);   
           }
      else 
          {return console.log(err);}    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
      //console.log("without aggregation")
      // console.log(diff); 
})
}
third1();
///////-------> 3. Find all schools started after 1 Jan 2017 with aggregation <-------------------
function third2(){
  var startTime = moment();
 schoolModel.aggregate([{$match:{"data.from":{$gt :"2017"}}},{$group:{_id:"$data.name-of-institution",count:{$sum:1}}}], function (err, doc) {
      if (!err) 
           {
          //   console.log(doc);   
           }
      else 
          {return console.log(err);}    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
     // console.log("with aggregation")
     //  console.log(diff); 
})
}
third2();
///////////////////////////////////////////////////////////////////////////////////////////////////////
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


