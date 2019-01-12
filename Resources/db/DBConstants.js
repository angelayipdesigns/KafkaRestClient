//DBConstants Singleton Constructor
var DBConstants = (function() {

	function KAFKA_REST_CLIENT() {
		return "KafkaRestClient";
	};

	function KAFKA_INITIALIZED() {
	  return "KafkaInitialized";
  };

  function KAFKA_REST_URL() {
	  return "KafkaRestURL";
  };

  function KAFKA_TOPIC() {
	  return "KafkaTopic";
  };

	return {
		KAFKA_REST_CLIENT:KAFKA_REST_CLIENT,
		KAFKA_INITIALIZED:KAFKA_INITIALIZED,
		KAFKA_REST_URL:KAFKA_REST_URL,
		KAFKA_TOPIC:KAFKA_TOPIC,
	};
})();

exports.DBConstants = DBConstants;
