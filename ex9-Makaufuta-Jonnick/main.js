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

//hier zullen we werken op availleble

//opvangen van GET op /aanwezigheden
app.get('/aanwezigheden', function(request, response){
    dalAanwezig.AllAanwezigheden(function(err, aanwezig){
        if(err){
            throw err;
        }
        response.send(aanwezig);
    });
});

//opvangen van GET op /aanwezigheden/:id
app.get('/aanwezigheden/:id', function(request, response){
    dalAanwezig.findAanwezigheden(request.params.id, function(err, aanwezig){
        if(aanwezig){
        response.send(aanwezig);
        }else{
            err;
        }
    });
});

//opvangen van POST op /aanwezigheden
app.post("/aanwezigheden", function(request, response){
    //data toegekend aan aanwezig variabele
    //enkel opgevuld als het JSON formaat is.
    var people =request.body;
    //Bestaan van velden validate
    var errors = validationAanwezigheden.fieldsNotEmpty(people,"name_drone", "name_location", "aantal", "uur", "ID");
    //functie om error te push
    if (errors){
        response.status(400).send({
            msg: "U moet de velden juist invullen: " + errors.concat()       
        });
        return;
    }
    //bestaan van velden in de bewaarplaats
    dalAanwezig.saveAanwezigheden(people, function(err, mensen){
        if(err){
            throw err;
        }
        response.send(mensen);
    });
});