// KafkaRestController Component Constructor
function KafkaRestController (baseUrl, topicName) {
	this.baseUrl = baseUrl;
	this.topicName = topicName;
	this.consumerCounter = 0;
}

function getConsumerInstance(consumerCounter) {
	return 'consumerInstance' + consumerCounter;
}

function getConsumerGroup(consumerCounter) {
	return 'consumerGroup' + consumerCounter;
}

KafkaRestController.prototype.listTopics = function() {
	var url = this.baseUrl + "/topics";
  // note that we reassign the instance variable this.topicName here, since inside
	// the onload function, we don't seem to have access to our instance variables
	var topic = this.topicName;
  var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
      Ti.API.info("Received text: " + this.responseText);

      if (this.responseText.indexOf(topic) != -1) {
				alert('success! the topic exists')
			}
			else {
				alert('the url looks valid, but the topic doesn\'t seem to exist')
			}
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('hmmm, that url isn\'t available');
     },
		 validatesSecureCertificate : false,
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("GET", url);
 // Send the request.
 client.send();
};

KafkaRestController.prototype.produce = function(message) {
	var url = this.baseUrl + "/topics/" + this.topicName;
  var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
			// TODO: remove this debug log
      Ti.API.info("Received text: " + this.responseText);
			alert('message sent');
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         // TODO: give a meaningful error message and test
				 Ti.API.debug(e.error);
				 Ti.API.info("Status: " + this.statusText + " and " + this.status);
				 Ti.API.info("Received text: " + this.responseText);
         alert('hmmm, there was a problem with that request');
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

KafkaRestController.prototype.consume = function() {
	var consumerGroup = getConsumerGroup(this.consumerCounter);
	var consumerInstance = getConsumerInstance(this.consumerCounter);
  // TODO: remove these debug logs
	Ti.API.info("Consuming using consumer Instance: " + consumerInstance);
	Ti.API.info("Consuming using consumer Group: " + consumerGroup);

	var url = this.baseUrl + "/consumers/" + consumerGroup +
	          "/instances/" + consumerInstance + "/records";

	var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
    onload : function(e) {
			// TODO: remove this debug log
      Ti.API.info("Received text: " + this.responseText);
			alert('Received text: ' + this.responseText);
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
			 // TODO: give a meaningful error message and test
			 Ti.API.debug(e.error);
			 Ti.API.info("Status: " + this.statusText + " and " + this.status);
			 Ti.API.info("Received text: " + this.responseText);
			 Ti.API.info('There was a problem subscribing to the consumer instance.');
			 alert('There was a problem subscribing to the consumer instance.Status: ' + this.statusText + ' and ' + this.status);
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

KafkaRestController.prototype.createConsumerInstance = function() {
  if (this.consumerCounter != 0) {
	  deleteConsumer(this.baseUrl,
		               getConsumerGroup(this.consumerCounter),
		               getConsumerInstance(this.consumerCounter));
  }

	this.consumerCounter++

	createSubscribeConsumer(this.baseUrl,
		                      getConsumerGroup(this.consumerCounter),
													getConsumerInstance(this.consumerCounter),
												  this.topicName);
};

function createSubscribeConsumer(baseUrl, consumerGroup, consumerInstance, topic) {
  // TODO: remove this debug log
	Ti.API.info("Creating consumer instance " + consumerInstance + " on consumer group " +
	            consumerGroup +" and subscribing");

	// create consumer instance
	var url = baseUrl + "/consumers/" + consumerGroup;
	var client = Ti.Network.createHTTPClient({
		 // function called when the response data is available
		onload : function(e) {
			// TODO: remove this debug log
			Ti.API.info("Received text: " + this.responseText);
      Ti.API.info("Create Instance OK, subscribing to " + topic);
			// subscribe the consumer instance
		  var url = baseUrl + "/consumers/" + consumerGroup +
			          "/instances/" + consumerInstance + "/subscription";
			var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		    onload : function(e) {
					// TODO: remove this debug log
		      Ti.API.info("Status: " + this.statusText + " and " + this.status);
					alert('Created consumer instance ' + consumerInstance)
		    },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
					 // TODO: give a meaningful error message and test
					 Ti.API.debug(e.error);
					 Ti.API.info("Status: " + this.statusText + " and " + this.status);
					 Ti.API.info("Received text: " + this.responseText);
					 Ti.API.info('There was a problem subscribing to the consumer instance.');
					 alert('There was a problem subscribing to the consumer instance ' + consumerInstance)
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
			 // TODO: give a meaningful error message and test
		   Ti.API.debug(e.error);
			 Ti.API.info("Status: " + this.statusText + " and " + this.status);
			 if (this.statusText == 'conflict') {
				 hintText = '. Try creating again';
			 }
			 else {
				 hintText = '';
			 }
		   Ti.API.info("Received text: " + this.responseText);
       alert('There was a problem creating the consumer instance ' + consumerInstance + hintText)
		 },
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
			// TODO: remove this debug log
      Ti.API.info("Status: " + this.statusText + " and " + this.status);
    },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
			 // TODO: give a meaningful error message and test
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
