//DatabaseInit Component Constructor
function DatabaseInit () {
}

DatabaseInit.prototype.exec = function() {
	var DBC = require('db/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());

	//iOSSpecific:  Disable the db file from being backed up to the cloud
	if ((Titanium.Platform.name == 'iphone') || (Titanium.Platform.name == 'ipad')) {
		db.file.setRemoteBackup(false);
	}

	db.execute('CREATE TABLE IF NOT EXISTS settings(name TEXT, value TEXT, description TEXT);');
	//db.execute('CREATE TABLE IF NOT EXISTS version(versionnumber TEXT, versiondetails TEXT);');

	db.close();
};


exports.DatabaseInit = DatabaseInit;
