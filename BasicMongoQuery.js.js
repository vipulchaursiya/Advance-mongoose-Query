const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');


///   connect  mongoose to database
Mongoose.connect("mongodb://localhost:27017/mongodb-102", function(err, db) {   
  if(err) { return console.dir(err); }
  else{console.log("connection established")}   
});
////////////////////////////////////////////////////////////////////////////////

//removing the '.' and spaces from Degress of School Principals
// function sanitizeDegree(thisDegree){
//   thisDegree = thisDegree.replace(/\./g, '');              
//   thisDegree = thisDegree.toLowerCase().trim();
//   return thisDegree;
// }


/* function principalWithDegree(){
  var startTime = moment();
  schoolModel.find( {},'data.name-of-principal-head-of-institution  data.principals-educationalprofessional-qualifications', function (err, doc) {  
    if (!err){ 
          doc.forEach(function(element,index)  {
            console.log(element.data['principals-educationalprofessional-qualifications']);
          });
        }
        else 
      { console.log(err) };        
  });
}
principalWithDegree(); */

//Find the names of all school trusts & associated schools which have a school in 5 or more districts<------------
/* function trustIn5OrMoreDistricts(){
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
trustIn5OrMoreDistricts(); */


        /* -------->1. Find all schools located in Jaipur  <--------------------- */
/* function allSchoolInJaipur(){
  var startTime = moment();
  schoolModel.find({ 'data.district': 'JAIPUR' }, {'data.name-of-institution': 1}, function (err, doc) {  
    if (!err){ 
          console.log(doc.length);
        }
        else 
            { console.log(err) };  
        var timeNow = moment();     
        let diff = moment(timeNow).diff(startTime);
        //console.log("without aggregation")
        console.log(diff);       
  })
}
allSchoolInJaipur(); */

// ////////--------------->1 find all schools in jaipur with aggregation<----------------
// function first2(){ 
//    var startTime = moment();   
//   schoolModel.aggregate([{$match:{"data.district":"JAIPUR"}},{$group:{_id:"$data.name-of-institution",count:{$sum:1}}}], function (err, doc) {      
//     if (!err)
//             { 
//               console.log(doc);
//             }
//         else 
//             { console.log(err) }; 
//           var  timeNow= moment();             
//         var diff = moment(timeNow).diff(startTime);
//        // console.log("with aggregation")
//        //console.log(diff);
//   })
//   }
//   //first2();
// //////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////-------> 2. Find all schools located in Rajasthan <-------------------
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
//second1();
// /////////////----->2.find all schools located in Rajasthan with aggregation<-----------

function second2(){
  var startTime = moment();
schoolModel.aggregate([{$match:{"data.state":"RAJASTHAN"}},{$group:{_id:"$data.name-of-institution",count:{$sum:1}}}], function (err, doc) {
      if (!err) 
        {  
           //console.log(doc);
        }   
      else 
          return console.log(err);    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
     // console.log("with aggregation");
     // console.log(diff); 
})
}
// //second2();

// //////////////////////////////////////////////////////////////////////////////////////////////
// ///////-------> 3. Find all schools started after 1 Jan 2017 <-------------------
function third1(){
  var startTime = moment();
schoolModel.find({"data.from":{$gt :"2017"}}, {'data.name-of-institution': 1, "data.from": 1}, function (err, doc) {
      if (!err) 
           {
            console.log(doc);   
           }
      else 
          {return console.log(err);}    
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);
      console.log("without aggregation")
       console.log(diff); 
})
}
// //third1();
// ///////-------> 3. Find all schools started after 1 Jan 2017 with aggregation <-------------------
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
// //third2();
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// //////--------> 4. Make a table of all schools in Karnataka with 
// //     Column 1 as the name of the district and column 2 as the number of schools in that district<-------------------
function fourth(){
  var startTime = moment();
  schoolModel.aggregate([
    {$match:{"data.state":"KARNATAKA"}},
    {$group:{_id:"$data.district", Numberofschools:{$sum:1}}}
  ],  function (err, doc) {
        if (!err) 
          {
            //console.log(doc);  
          } 
        else 
            {return console.log(err);}    
        var timeNow = moment();
        var diff = moment(timeNow).diff(startTime);
        console.log(diff); 
  }) 
}
// //fourth();
///////////////////////////////////////////////fourth withourt aggregation/////////////
function fourth1(){ 
  var startTime = moment();
  schoolModel.find({ 'data.state': 'KARNATAKA' }, {'data.district': 1}, function (err, doc) {
        if (!err) 
          {
            var finalObj = {};
            doc.forEach(function(element) {
              var thisDistrict = element.data.district;
              if(!finalObj[thisDistrict]){
                finalObj[thisDistrict] = 0;
              }
              finalObj[thisDistrict] += 1;
              
            });
            //console.log(finalObj);
            //console.log(doc);
          }   
        else 
            return console.log(err);    
        var timeNow = moment();
        var diff = moment(timeNow).diff(startTime);
      // console.log("without aggregation")
       console.log(diff); 
  });
};
//fourth1();
///////////////////////////////
function fifth(){
  var startTime = moment();
  schoolModel.aggregate([
    {$group:{_id:"$data.name-of-trust-society-managing-committee", Numberofschools:{$sum:1}, cities: {$addToSet: "$data.district"}}},
    {$project: {"name": "$_id", "count": "$Numberofschools", "cities": "$cities", _id: 0}},
  ],  function (err, doc) {
        if (!err) 
          {
          console.log(doc);  
          } 
        else 
            {return console.log(err);}    
        var timeNow = moment();
        var diff = moment(timeNow).diff(startTime);
        // console.log(diff); 
  }) 
}
// fifth();

// ///////////////////////  after indexing of schools list 
// function first1(){
//   var startTime = moment(); 
//   schoolModel.find({"data.name-of-institution":"rahul ma shikshan sansthan u ma school"}, function (err, doc) {  
//    if (!err)
//           { 
//           console.log(doc);
//           }
//       else 
//           { console.log(err) };  
//       var timeNow = moment();     
//       let diff = moment(timeNow).diff(startTime);
//       console.log("index")
//       console.log(diff);       
// })
//  }
// first1();


