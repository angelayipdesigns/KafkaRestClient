//KafkaConfigsCache Singleton Constructor
var KafkaConfigsCache = (function() {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
	var settingsDBI = new SettingsDBI();
	var kafkaConfigs = new KafkaConfigs(settingsDBI.getSettingValueByName(DBC.KAFKA_REST_URL()),
	                                    settingsDBI.getSettingValueByName(DBC.KAFKA_TOPIC()));

  function getKafkaRestURL() {
		return kafkaConfigs.getKafkaRestURL();
	}

  // We need to be very cautious about all the places we make updates to the cache values!
	function setKafkaRestURL(kafkaRestURL) {
		kafkaConfigs.setKafkaRestURL(kafkaRestURL);
	}

  function getKafkaTopic() {
		return kafkaConfigs.getKafkaTopic();
	}

  // We need to be very cautious about all the places we make updates to the cache values!
	function setKafkaTopic(kafkaRestTopic) {
		kafkaConfigs.setKafkaTopic(kafkaRestTopic);
	}

  function getConsumerCounter() {
		return kafkaConfigs.getConsumerCounter();
	}

  // We need to be very cautious about all the places we make updates to the cache values!
	function incrementCounter() {
		kafkaConfigs.increment();
	}

	return {
		getKafkaRestURL:getKafkaRestURL,
		setKafkaRestURL:setKafkaRestURL,
		getKafkaTopic:getKafkaTopic,
		setKafkaTopic:setKafkaTopic,
		getConsumerCounter:getConsumerCounter,
		incrementCounter:incrementCounter,
	};
})();

exports.KafkaConfigsCache = KafkaConfigsCache;
