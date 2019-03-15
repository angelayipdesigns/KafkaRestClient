// KafkaRestController Component Constructor
function KafkaRestController () {
}

function getConsumerInstance(consumerCounter) {
	return 'consumerInstance' + consumerCounter;
}

function getConsumerGroup(consumerCounter, consumerGroupPrefix) {
	return consumerGroupPrefix + consumerCounter;
}

KafkaRestController.prototype.listTopics = function(baseUrl, showError, callbackFunction, callbackFunctionParam) {
	var url = baseUrl + "/topics";
  var topicArray = [];

  var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
      Ti.API.info("Received text: " + this.responseText);
			topicArray = JSON.parse(this.responseText);
			callbackFunction(topicArray, callbackFunctionParam);
    },
    // function called when an error occurs, including a timeout
    onerror : function(e) {
			if (showError) {
        Ti.API.debug(e.error);
        var dialog = Ti.UI.createAlertDialog({
          message: 'hmmm, that url isn\'t available',
          ok: 'OK',
          title: 'Hmmmm'
        });
        dialog.show();
			}
			else {
				callbackFunction(topicArray, callbackFunctionParam);
			}
    },
    validatesSecureCertificate : false,
    timeout : 5000  // in milliseconds
  });
  // Prepare the connection.
  client.open("GET", url);
  // Send the request.
  client.send();
};

KafkaRestController.prototype.getTopicInfo = function(baseUrl, topicName, callbackFunction, callbackFunctionParam) {
	var url = baseUrl + "/topics/" + topicName;
  var topicInfo = '';

  var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
      Ti.API.info("Received text: " + this.responseText);
			var topicInfoObject = JSON.parse(this.responseText);
			callbackFunction(JSON.stringify(topicInfoObject, null, 2), callbackFunctionParam);
    },
    // function called when an error occurs, including a timeout
    onerror : function(e) {
      Ti.API.debug(e.error);
      var dialog = Ti.UI.createAlertDialog({
        message: 'hmmm, that url isn\'t available',
        ok: 'OK',
        title: 'Hmmmm'
      });
      dialog.show();
    },
    validatesSecureCertificate : false,
    timeout : 5000  // in milliseconds
  });
  // Prepare the connection.
  client.open("GET", url);

	client.setRequestHeader("Accept", "application/vnd.kafka.v2+json");

  // Send the request.
  client.send();
};

KafkaRestController.prototype.produce = function(baseUrl, topicName, message) {
	var url = baseUrl + "/topics/" + topicName;
  var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {

      Ti.API.info("Received text: " + this.responseText);
			var dialog = Ti.UI.createAlertDialog({
        message: 'message sent',
        ok: 'OK',
        title: 'Success'
      });
      dialog.show();
    },
    // function called when an error occurs, including a timeout
     onerror : function(e) {
				 Ti.API.debug(e.error);
				 Ti.API.info("Status: " + this.statusText + " and " + this.status);
				 Ti.API.info("Received text: " + this.responseText);
				 var dialog = Ti.UI.createAlertDialog({
           message: 'hmmmm, there was a problem with that request',
           ok: 'OK',
           title: 'Hmmmm'
         });
         dialog.show();
     },
		 validatesSecureCertificate : false,
     timeout : 5000  // in milliseconds
  });

  // Prepare the connection.
  client.open("POST", url);

	// Set the headers
	client.setRequestHeader("Content-Type", "application/vnd.kafka.json.v2+json")
	client.setRequestHeader("Accept", "application/vnd.kafka.v2+json")
  // Send the request
	client.send("{\"records\": [{\"value\": \"" + message + "\"}]}");
};

KafkaRestController.prototype.consume = function(baseUrl, topicName, consumerGroupPrefix) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var consumerGroup = getConsumerGroup(kafkaConfigsCache.getConsumerCounter(), consumerGroupPrefix);
	var consumerInstance = getConsumerInstance(kafkaConfigsCache.getConsumerCounter());
	Ti.API.info("Consuming using consumer Instance: " + consumerInstance);
	Ti.API.info("Consuming using consumer Group: " + consumerGroup);

	var url = baseUrl + "/consumers/" + consumerGroup +
	          "/instances/" + consumerInstance + "/records";

	var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
      Ti.API.info("Received text: " + this.responseText);
			var consumeResponseObject = JSON.parse(this.responseText);
			var dialog = Ti.UI.createAlertDialog({
			  message: 'received text:\n' + JSON.stringify(consumeResponseObject, null, 2),
			  ok: 'OK',
			  title: 'Success'
			});
			dialog.show();
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
			 Ti.API.debug(e.error);
			 Ti.API.info("Status: " + this.statusText + " and " + this.status);
			 Ti.API.info("Received text: " + this.responseText);
			 Ti.API.info('There was a problem subscribing to the consumer instance.');
			 var dialog = Ti.UI.createAlertDialog({
			   message: 'there was a problem subscribing to the consumer instance. Status: ' + this.statusText + ' and ' + this.status,
			   ok: 'OK',
			   title: 'Hmmmm'
			 });
			 dialog.show();
     },
		 validatesSecureCertificate : false,
     timeout : 5000  // in milliseconds
  });

  // Prepare the connection.
  client.open("GET", url);

	// Set the headers
	//client.setRequestHeader("Content-Type", "application/vnd.kafka.json.v2+json")
	client.setRequestHeader("Accept", "application/vnd.kafka.json.v2+json");
  // Send the request
	client.send();

};

KafkaRestController.prototype.createConsumerInstance = function(baseUrl, topicName, consumerGroupPrefix) {
  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	if (kafkaConfigsCache.getConsumerCounter() != 0) {
	  deleteConsumer(baseUrl,
		               getConsumerGroup(kafkaConfigsCache.getConsumerCounter(), consumerGroupPrefix),
		               getConsumerInstance(kafkaConfigsCache.getConsumerCounter()));
  }

	kafkaConfigsCache.incrementCounter();

	createSubscribeConsumer(baseUrl,
		                      getConsumerGroup(kafkaConfigsCache.getConsumerCounter(), consumerGroupPrefix),
													getConsumerInstance(kafkaConfigsCache.getConsumerCounter()),
												  topicName);
};

function createSubscribeConsumer(baseUrl, consumerGroup, consumerInstance, topic) {
	Ti.API.info("Creating consumer instance " + consumerInstance + " on consumer group " +
	            consumerGroup +" and subscribing");

	// create consumer instance
	var url = baseUrl + "/consumers/" + consumerGroup;
	var client = Ti.Network.createHTTPClient({
		 // function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
      Ti.API.info("Create Instance OK, subscribing to " + topic);
			// subscribe the consumer instance
		  var url = baseUrl + "/consumers/" + consumerGroup +
			          "/instances/" + consumerInstance + "/subscription";
			var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		    onload : function(e) {
		      Ti.API.info("Status: " + this.statusText + " and " + this.status);
					var dialog = Ti.UI.createAlertDialog({
					  message: 'Created consumer instance ' + consumerInstance,
					  ok: 'OK',
					  title: 'Success'
					});
					dialog.show();
		    },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
					 Ti.API.debug(e.error);
					 Ti.API.info("Status: " + this.statusText + " and " + this.status);
					 Ti.API.info("Received text: " + this.responseText);
					 Ti.API.info('There was a problem subscribing to the consumer instance.');
					 var dialog = Ti.UI.createAlertDialog({
					   message: 'There was a problem subscribing to the consumer instance ' + consumerInstance,
					   ok: 'OK',
					   title: 'Hmmmm'
					 });
					 dialog.show();
		     },
				 validatesSecureCertificate : false,
		     timeout : 5000  // in milliseconds
		  });

		  // Prepare the connection.
		  client.open("POST", url);

			// Set the headers
			client.setRequestHeader("Content-Type", "application/vnd.kafka.v2+json");
		  // Send the request
			client.send("{\"topics\": [\"" + topic + "\"]}");
		},
		 // function called when an error occurs, including a timeout
		 onerror : function(e) {
		   Ti.API.debug(e.error);
			 Ti.API.info("Status: " + this.statusText + " and " + this.status);
			 if (this.statusText == 'conflict') {
				 hintText = '. Try creating again or change the consumer group prefix';
			 }
			 else {
				 hintText = '';
			 }
		   Ti.API.info("Received text: " + this.responseText);
			 var dialog = Ti.UI.createAlertDialog({
			   message: 'There was a problem creating the consumer instance ' + consumerInstance + hintText,
			   ok: 'OK',
			   title: 'Hmmmm'
			 });
			 dialog.show();
		 },
		 validatesSecureCertificate : false,
		 timeout : 5000  // in milliseconds
	});

	// Prepare the connection.
	client.open("POST", url);

	// Set the headers
	client.setRequestHeader("Content-Type", "application/vnd.kafka.v2+json");
	//client.setRequestHeader("Accept", "application/vnd.kafka+json")
	// Send the request
	client.send("{\"name\": \"" + consumerInstance + "\", \"format\": \"json\", " +
	            "\"auto.offset.reset\": \"latest\"}");

};

function deleteConsumer(baseUrl, consumerGroup, consumerInstance) {
	Ti.API.info("Deleting consumer instance " + consumerInstance + " on consumer group " +
	            consumerGroup);

	// delete consumer instance

	var url = baseUrl + "/consumers/" + consumerGroup + "/instances/" + consumerInstance;
	var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
      Ti.API.info("Status: " + this.statusText + " and " + this.status);
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
			 Ti.API.debug(e.error);
			 Ti.API.info("Status: " + this.statusText + " and " + this.status);
		   Ti.API.info("Received text: " + this.responseText);
		   Ti.API.info('There was a problem deleting the consumer instance.');
     },
		 validatesSecureCertificate : false,
     timeout : 5000  // in milliseconds
  });

  // Prepare the connection.
  client.open("DELETE", url);

	// Set the headers
	client.setRequestHeader("Accept", "application/vnd.kafka.v2+json")
  // Send the request
	client.send();
};



exports.KafkaRestController = KafkaRestController;
