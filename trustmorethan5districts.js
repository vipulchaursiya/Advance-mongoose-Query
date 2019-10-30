const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');


Mongoose.connect("mongodb://localhost:27017/mongodb-102", function(err, db) {   
    if(err) { return console.dir(err); }
    else{console.log("connection established")}   
  });
//Find the names of all school trusts & associated schools which have a school in 5 or more districts<------------
function trustIn5OrMoreDistricts(){
  var startTime = moment();
  schoolModel.aggregate([
    {
      $group:{
        _id:"$data.name-of-trust-society-managing-committee", 
        Numberofschools:{$sum:1}, 
        cities: {$addToSet: "$data.district"},
        schools:{$addToSet:"$data.name-of-institution"}
      }
    },
    {
      $project: {
        _id: 0,
        "moreThanThreshold":{"$cond":{ if :{ $gte :[{"$size":"$cities"},5]}, then:true,else:false}},
        "trustname":"$_id",
        "schools":"$schools",
        "cities":"$cities"
      }
    }
    ,
    {
      $match: {
        "moreThanThreshold": true,
      },
    }
  ],  function (err, doc) {
        if (!err) 
          {
          console.log(doc);  
          } 
        else 
            {return console.log(err);}    
        var timeNow = moment();
        var diff = moment(timeNow).diff(startTime);
         console.log(diff); 
  }) 
}
trustIn5OrMoreDistricts();