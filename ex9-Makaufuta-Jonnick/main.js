//hier zal ik een mijn data importeren naar de module
var parser = require('body-parser');//BODY UIT LEZEN, EXTENSIE OP EXPRESS
var mongoose = require('mongoose');//GELIJKACHTIG AAN MONGOCLIENT --> JONAS
var express = require('express');//WEBSERVER NODE JS

//connectie naar mongodb
mongoose.connect('mongodb://localhost:27017/MyAPI');//DATABANK IN ROBOMONGO

//nu ga ik mijn data in een plaats bewaren en dat zal ik ook aanmaken

//movement
var dalBeweging = require('./storageBewegingen.js');
var validationBewegingen = require('./validateBewegingen.js');

//locatie
var dalLocation = require('./storageLocations.js');
var validationLocations = require('./validateLocations.js');

//availleble
var dalAanwezig = require('./storageAanwezigheden.js');
var validationAanwezigheden = require('./validateAanwezigheden.js');

//webserver variabele aanmaken
var app = express();

//json formaat
app.use(parser.json());