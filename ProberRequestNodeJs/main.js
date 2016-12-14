
var request = require("request");
var dal = require('./storage.js');
// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// opstarten mongo "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath d:\test\mongodb\data

var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
var Settings = function (url) {
	this.url = BASE_URL + url;
	this.method = "GET";
	this.qs = {format: 'json'};
	this.headers = {
		authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
	};
};

var Drone = function (name, mac, files_count, date, id, location, files) {
	this.name = name;
	this.mac = mac;
        this._id = id;
        this.files_count = files_count;
        this.date = date;
        this.location = location;
        this.files = files;
};

var File = function (id, url, contents_count, date_last_record, date_loaded, ref, contents, date_first_record, droneid) {
	this._id = id;
        this.url = url;
        this.contents_count = contents_count;
        this.date_last_record = date_last_record;
	this.date_loaded = date_loaded;
        this.ref = ref;
        this.contents = contents;
        this.date_first_record = date_first_record;
        this.droneid = droneid;
};

var Content = function (id, droneid, url, rssi, ref, mac, datetime, fileid) {
	this._id = id;
        this.droneid = droneid;
        this.url = url;
        this.rssi = rssi;
        this.ref = ref;
	this.mac = mac;
	this.datetime = datetime;
        this.fileid = fileid;
};
var dronesSettings = new Settings("/drones?format=json");

dal.clearDrone();
dal.clearFile();
dal.clearContent();

request(dronesSettings, function (error, response, dronesString) {
        var drones = JSON.parse(dronesString);
	/*console.log(drones);
	console.log("***************************************************************************");*/
	drones.forEach(function (drone) {
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
		request(droneSettings, function (error, response, droneString) {
			var drone = JSON.parse(droneString);
                        dal.insertDrone(new Drone(
                                drone.id,
                                drone.mac_address,
                                drone.name,
                                drone.location,
                                drone.files, 
                                drone.files_count,
                                drone.last_packet_date));
                                
                                
                 var filesSettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-07T12:00:00");
                        ///files?drone_id.is=cc3f2b0604a543399edd0d579447513f&date_loaded.greaterOrEqual=2016-10-13T16:40:05.255Z&format=json
                        console.log(filesSettings);
                        request(filesSettings, function (error, response, filesString){
                            var files = JSON.parse(filesString);
                            files.forEach(function (file){
                                var fileSettings = new Settings("/files/" + file.id + "?format=json");
                                request(fileSettings, function (error, response, fileString){
                                    var file = JSON.parse(fileString);
                                    //console.log(file);
                                    dal.insertFile(new File(
                                            file.id, 
                                            file.contents,
                                            file.contents_count, 
                                            file.ref,
                                            file.url,
                                            file.date_first_record, 
                                            file.date_last_record,
                                            file.date_loaded,
                                            drone.id));
                                            
                                    var contentsSettings = new Settings("/files/" + file.id + "/contents?format=json");
                                    request(contentsSettings, function (error, response, contentsString){
                                        var contents = JSON.parse(contentsString);
                                        /*console.log(contents);
                                        console.log("***************************************************************************");*/
                                        contents.forEach(function (content){
                                           var contentSettings = new Settings("/files/" + file.id + "/contents/"+content.id+"?format=json");
                                           request(contentSettings, function (error, response, contentString){
                                               var content = JSON.parse(contentString);
                                               //console.log(content);
                                               dal.insertContent(new Content(
                                                       content.id,
                                                       content.url,
                                                       content.datetime,
                                                       content.mac_address,
                                                       content.rssi,
                                                       content.ref,
                                                       file.id,
                                                       drone.id));
                                           });
                                        });
                                });
                            });
                        });
		});
	});
});
});


console.log("Hello World!");