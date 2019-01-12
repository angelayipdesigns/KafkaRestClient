//KafkaConfigsCache Singleton Constructor
var KafkaConfigsCache = (function() {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
	var settingsDBI = new SettingsDBI();
	var kafkaConfigs = new KafkaConfigs(settingsDBI.getSettingValueByName(DBC.KAFKA_REST_URL()),
	                                    settingsDBI.getSettingValueByName(DBC.KAFKA_TOPIC()));

	//DON'T call this method from anywhere other than AppConfigTableData or AppConfigSettingsTableData
	function setKafkaConfigs(newKafkaConfigs) {
		kafkaConfigs = newKafkaConfigs;
	};

	function getKafkaConfigs() {
		return kafkaConfigs;
	};

	return {
		setKafkaConfigs:setKafkaConfigs,
		getKafkaConfigs:getKafkaConfigs,
	};
})();

exports.KafkaConfigsCache = KafkaConfigsCache;
