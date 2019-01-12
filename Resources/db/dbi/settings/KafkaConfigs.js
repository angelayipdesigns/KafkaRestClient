//KafkaConfigs Component Constructor
function KafkaConfigs (kafkaRestURL, kafkaTopic) {
    this.kafkaRestURL = kafkaRestURL;
    this.kafkaTopic = kafkaTopic;
}

KafkaConfigs.prototype.getKafkaRestURL = function(){
	return this.kafkaRestURL;
};

KafkaConfigs.prototype.setKafkaRestURL = function(kafkaRestURL) {
    this.kafkaRestURL = kafkaRestURL;
};

KafkaConfigs.prototype.getKafkaTopic = function(){
	return this.kafkaTopic;
};

KafkaConfigs.prototype.setKafkaTopic = function(kafkaTopic) {
    this.kafkaTopic = kafkaTopic;
};


exports.KafkaConfigs = KafkaConfigs;
