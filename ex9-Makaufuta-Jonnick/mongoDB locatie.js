/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//npm install
var mongoose = require("mongoose");

//schema aanmaken in mongoose
var locationSchema = mongoose.Schema({
    name_drone:{
        type: String,
        required: true,
        unique:true
    },
    mac_address_drone:{
        type: String,
        required: true,
        unique:true
    },
    beschrijving:{
        type: String,
        required: true
    },
        name_location:{
        type: String,
        required: true,
        unique:true
    }
});

//gegevens bijhouden
var Location = module.exports = mongoose.model('Location', locationSchema);

//gegeven exporteren naar mongoose

module.exports = {
    findLocations: function(id, callback){
    Location.find({name_drone:id}, callback);
    },
    saveLocations: function (Location, callback){
    Location.create(Location, callback);
    },
    AllLocations: function(callback){
    Location.find(callback);
    },
    updateLocations: function(id,location, callback){
    Location.findOneAndUpdate({name_drone:id}, location, callback);
    }
        };
