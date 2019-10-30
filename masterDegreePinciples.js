const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');


Mongoose.connect("mongodb://localhost:27017/mongodb-102", function(err, db) {   // conecting mongoose to mongodb
    if(err) { return console.dir(err); }
    else{console.log("connection established")}   
  });

  function sanitizeDegree(thisDegree)             ///// to filter degree
  {      
    thisDegree = thisDegree.replace(/\./g, '');         //Removing . from the degree     
    thisDegree = thisDegree.toLowerCase().trim();       //converting all degree in lowercase   
    return thisDegree;
  }
  
  function findPrincipleWithMasterDegree()  {
    startTime= new moment();                ///< finding principle with all degrees 
    schoolModel.find({},
    {
      "data.name-of-principal-head-of-institution": 1,
      "data.principals-educationalprofessional-qualifications": 1
    },
      function (err, dataPriciplesandDegree) {
        if(!err){
            var mastersDegrees = [];                                        //  array of master degree 
            dataPriciplesandDegree.forEach( (Element, eIndex)=>{           // loop for taking all master degree in seprate array
              var thisDegrees = Element.data['principals-educationalprofessional-qualifications'];
              var thisDegrees = thisDegrees.split(",");                  //  saperate degrees 
              thisDegrees.forEach( (thisDegree, dIndex)=>{
                if(thisDegree){                                                     
                  thisDegree = sanitizeDegree(thisDegree);  
                  var mIndex = mastersDegrees.indexOf(thisDegree);     
                    if(mIndex == -1){                                              
                      if(thisDegree[0]=='m'){
                        mastersDegrees.push(thisDegree);
                      } 
                    }
                  }
              });                
            });      
            console.log(mastersDegrees) ;              
            var finalPrincipalList=[]; // array of principle with master degree
            dataPriciplesandDegree.forEach( (Element, eIndex)=>{       //loop for mathching that element should have master degree
            var thisDegree = Element.data['principals-educationalprofessional-qualifications'];
                thisDegree = sanitizeDegree(thisDegree);                    
                var pIndex = mastersDegrees.indexOf(thisDegree);    //checking the index of degree with masterdegree   
                if(pIndex != -1){
                  finalPrincipalList.push(Element);                //  push if the degree  matches with master degree 
                }
            });
      }
      else 
      { 
        console.log(err) 
      }; 
      
      var timeNow = moment();
      var diff = moment(timeNow).diff(startTime);                   /// total time taken to process the data
    // console.log(finalPrincipalList);                                      // all principle with master degree   
     console.log("% of principle who have master degree: "+finalPrincipalList.length / dataPriciplesandDegree.length * 100 + "%");      // % of principle with master degree      
     console.log("Time Taken: " + diff)    
  } )   
}
findPrincipleWithMasterDegree() ;       /// function for finding all principle  with master degree

///<-------------- from another method
/* function sanitizeDegree(thisDegree){
  thisDegree = thisDegree.replace(/\./g, '');              
  thisDegree = thisDegree.toLowerCase().trim();
  return thisDegree;
} */

//Find the Principals and % of principals with a Master's Degree
/* function first1(){
  var startTime = moment(); 
  schoolModel.distinct("data.principals-educationalprofessional-qualifications", function (err, distinctQualificationsList) {  
    if (!err){ 
         var k = 0;
         var arr = [];             
         var mastersDegrees = [];         
         distinctQualificationsList.forEach( (Element, eIndex)=>{
           var thisDegrees = Element.split(",");
           thisDegrees.forEach( (thisDegree, dIndex)=>{
            if(thisDegree){
              thisDegree = sanitizeDegree(thisDegree);
              var mIndex = mastersDegrees.indexOf(thisDegree);
              if(mIndex == -1){
                mastersDegrees.push(thisDegree);       // push all degree in array 
              }
            }
          });           
             //arr.push(Element);
         })
         for(i=0;i<mastersDegrees.length;i++){
        
          if(mastersDegrees[i][k]=='m')
          arr.push(mastersDegrees[i]);              // push only master degree 
         }
         //console.log(mastersDegrees)
         var finalPrincipalList = [];
         
        schoolModel.find( {},'data.name-of-principal-head-of-institution  data.principals-educationalprofessional-qualifications', function (err, doc) {  
            if (!err){                                   // then elment have principles with degree
                  doc.forEach(function(element,index)  {
                    var thisDegree = element.data['principals-educationalprofessional-qualifications'];
                    thisDegree = sanitizeDegree(thisDegree);

                    var pIndex = arr.indexOf(thisDegree);    //  match these degree with master degree
                    if(pIndex != -1){
                      finalPrincipalList.push(element);      // only push element which have master degree
                    }
                  });
                }
                else 
              { 
                console.log(err) 
              }; 
              var timeNow = moment();
              var diff = moment(timeNow).diff(startTime);
              console.log("Time Taken: " + diff);
              console.log(finalPrincipalList.length / doc.length * 100 + "%");       
              console.log(finalPrincipalList);       
          });       
        }       
        else{
          console.log("Could not find Distinct Prinicipal Qualification List");
          console.log(err);
        };              
  })
};
first1(); */