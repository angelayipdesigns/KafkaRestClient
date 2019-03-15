//KafkaConfigs Component Constructor
function KafkaConfigs (kafkaRestURL, kafkaTopic) {
    this.kafkaRestURL = kafkaRestURL;
    this.kafkaTopic = kafkaTopic;
    this.consumerCounter = 0;
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

KafkaConfigs.prototype.getConsumerCounter = function() {
  return this.consumerCounter;
}

KafkaConfigs.prototype.increment = function() {
  this.consumerCounter++;
}


exports.KafkaConfigs = KafkaConfigs;
