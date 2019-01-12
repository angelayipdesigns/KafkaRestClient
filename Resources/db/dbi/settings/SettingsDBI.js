function SETTINGS() {
	return 'settings';
}
function NAME() {
	return 'name';
}
function VALUE() {
	return 'value';
}
function DESCRIPTION() {
	return 'description';
}

//SettingsDBI Component Constructor
function SettingsDBI () {
}

function getDefaultSettingFromName(name) {
	var DBC = require('db/DBConstants').DBConstants;
	var Setting = require('db/dbi/settings/Setting').Setting;

  switch (name) {
		// for now, the only setting which requires to provide a default value is KafkaInitialized
    case DBC.KAFKA_INITIALIZED():
      var setting = new Setting(DBC.KAFKA_INITIALIZED(), 'false', 'Kafka Initialized');
		  return setting;
		default:
		    //do nothing for now
    }
}

SettingsDBI.prototype.getSettingValueByName = function(name) {
	var DBC = require('db/DBConstants').DBConstants;

	var Setting = require('db/dbi/settings/Setting').Setting;
	var fetchedSettingValue;

	//open the database
	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());

	//execute the select
	var settingRS = db.execute('SELECT ' + NAME() + ', ' + VALUE() +
								' FROM '+ SETTINGS() + ' WHERE ' + NAME() + ' = ?', name);
	if (settingRS.isValidRow()) {
		var fetchedSettingName = settingRS.fieldByName(NAME());
		fetchedSettingValue = settingRS.fieldByName(VALUE());

		Ti.API.info("Fetched setting:  name: " + fetchedSettingName + ", value: " + fetchedSettingValue);
	}
	settingRS.close();
	db.close();

	//The setting wasn't found, try the default value
	if (!fetchedSettingValue) {
		self = this;
		var setting = getDefaultSettingFromName(name);
		this.insertSetting(setting);
		fetchedSettingValue = setting.getValue();
	}

	return fetchedSettingValue;
};

SettingsDBI.prototype.getSettingByName = function(name) {
	var DBC = require('db/DBConstants').DBConstants;

	var Setting = require('db/dbi/settings/Setting').Setting;
	var setting;

	//open the database
	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());

	//execute the select
	var settingRS = db.execute('SELECT ' + ' , ' + NAME() + ', ' + VALUE() + ', ' + DESCRIPTION() +
								' FROM '+ SETTINGS() + ' WHERE ' + NAME() + ' = ?', name);
	if (settingRS.isValidRow()) {
		var fetchedSettingName = settingRS.fieldByName(NAME());
		var fetchedSettingValue = settingRS.fieldByName(VALUE());
		var fetchedSettingDescription = settingRS.fieldByName(DESCRIPTION());

		Ti.API.info("Fetched setting:  name: " + fetchedSettingName +
											", value: " + fetchedSettingValue + ", description: " + fetchedSettingDescription);

		setting = new Setting(fetchedSettingId, fetchedSettingName, fetchedSettingValue, fetchedSettingDescription);
	}
	settingRS.close();
	db.close();

	return setting;
};

SettingsDBI.prototype.updateSettingValueByName = function(name, value) {
	var DBC = require('db/DBConstants').DBConstants;

	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());
	db.execute('UPDATE ' + SETTINGS() + ' SET ' + VALUE() + ' = ? WHERE '
					+ NAME() + ' = ?', value, name);
	db.close();
};

SettingsDBI.prototype.updateSettingByName = function(setting) {
	var DBC = require('db/DBConstants').DBConstants;

	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());
	db.execute('UPDATE ' + SETTINGS() + ' SET ' + VALUE() + ' = ?, ' + DESCRIPTION() + ' = ? WHERE '
					+ NAME() + ' = ?', setting.getValue(), setting.getDescription(), setting.getName());
	db.close();
};

SettingsDBI.prototype.insertSetting = function(setting) {
	var DBC = require('db/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.KAFKA_REST_CLIENT());
	db.execute('INSERT INTO ' + SETTINGS() + ' (' + NAME() + ', ' + VALUE() + ', ' + DESCRIPTION() +
							') VALUES (?, ?, ?)', setting.getName(), setting.getValue(), setting.getDescription());
	db.close();
};


exports.SettingsDBI = SettingsDBI;
