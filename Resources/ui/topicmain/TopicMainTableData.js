// TopicMainTableData Component Constructor

function TopicMainTableData(displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var TMC = require('ui/topicmain/TopicMainConstants').TopicMainConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, true);
  tableData.push(appConfigHeaderRowView);

  var TopicMainTopicNameRowView = require('ui/topicmain/TopicMainTopicNameRowView').TopicMainTopicNameRowView;
  var topicMainTopicNameRowView = new TopicMainTopicNameRowView(displayValueUtil);
	tableData.push(topicMainTopicNameRowView.getTopicMainTopicNameRowView());

	Ti.App.addEventListener('updateTopicNameLabel', function() {
    var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
		var topicName = kafkaConfigsCache.getKafkaTopic();
		topicMainTopicNameRowView.setTopicMainTopicNameRowView(topicName);
  });


  var TopicMainProduceConsumeRowView = require('ui/topicmain/TopicMainProduceConsumeRowView').TopicMainProduceConsumeRowView;
  var produceConsumeRowView = new TopicMainProduceConsumeRowView(displayValueUtil);

  tableData.push(produceConsumeRowView);

	var TopicMainTopicInfoRowView = require('ui/topicmain/TopicMainTopicInfoRowView').TopicMainTopicInfoRowView;
  var topicMainTopicInfoRowView = new TopicMainTopicInfoRowView(displayValueUtil);

  tableData.push(topicMainTopicInfoRowView);
	return tableData;
}

exports.TopicMainTableData = TopicMainTableData;
