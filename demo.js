const express= require('express');
const Mongoose=require('mongoose');
const schoolModel=require('./school.js')
const moment = require('moment');






var mydate = new Date('03/04/2017');
var mydate2 =new Date('03/06/2000')
console.log(mydate);
var d=mydate2<mydate;
console.log(d);