//hier zal ik een mijn data importeren naar de module
var parser = require('body-parser');//BODY UIT LEZEN, EXTENSIE OP EXPRESS
var mongoose = require('mongoose');//GELIJKACHTIG AAN MONGOCLIENT --> JONAS
var express = require('express');//WEBSERVER NODE JS

//connectie naar mongodb
mongoose.connect('mongodb://localhost:27017/MyAPI');//DATABANK IN ROBOMONGO