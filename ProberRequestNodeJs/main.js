// lucs@sabayon ~/tmp/ProberRequestNodeJs $ npm install --save request
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

var Drone = function (name, mac, files_count, date, id, location, file) {
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
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json")
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
                                
			droneMem.push(new Drone(drone.name, drone.mac_address, drone.id, drone.date_first_record, drone.data_last_record));
			console.log(droneMem);
			console.log("***************************************************************************");
		});
	});
});

console.log("Hello World!");