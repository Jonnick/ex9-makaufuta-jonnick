/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//npm install
var mongoose = require("mongoose");

//schema aanmaken in mongoose
var bewegingSchema = mongoose.Schema({
    beweging:{
        type: Boolean,
        required: true
    },
    beweging_id:{
        type: Number,
        required: true,
        unique: true
    },
    duur:{
        type: Number,
        required: true
    },
    weer:{
        type: String
    },
    begin_location:{
        name_drone: {
                    type: String
                    },
        datum_vertrek: {
                        type: Date
                       } 
    },
    end_location:{
        name_drone: {
                    type: String
                    },
        datum_aankomst: {
                        type: Date
                        }
    }
});

//gegevens bijhouden
var Beweging = module.exports = mongoose.model('Beweging', bewegingSchema);

//gegeven exporteren naar mongoose
module.exports = {
    findBewegingen: function(id, callback){
    Beweging.find({bewegingid:id}, callback);
    },
    saveBewegingen: function (beweging, callback){
    Beweging.create(beweging, callback);
    },
    AllBewegingen: function(callback){
    Beweging.find(callback);
    }
        };
