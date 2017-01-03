/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//verifieren
module.exports = {
    fieldsNotEmpty: function(object){
        var errors = [];
        var i = 1;
        
        if(typeof object["ID"] != "number"){
            errors.push(arguments[i]);
        }
        i++
        if(object["name_drone"] == "" || typeof object ["name_drone"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["aantal"] <=0 || typeof object ["aantal"] != "number"){
            errors.push(arguments[i]);
        }
        i++
        if(object["name_location"] == "" || typeof object ["name_location"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["uur"] == "" || typeof object ["uur"] != "string"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }
};
