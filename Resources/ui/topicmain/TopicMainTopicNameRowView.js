//TopicMainTopicNameRowView Component Constructor
function TopicMainTopicNameRowView (displayValueUtil) {
	var TMC = require('ui/appconfig/AppConfigConstants').AppConfigConstants;

  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var topicName = kafkaConfigsCache.getKafkaTopic();
  var topicNameLabelTxt = 'Topic Name:  ' + topicName;

	this.topicNameRowView = Titanium.UI.createTableViewRow();
	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(TMC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  this.textFieldLabel = new TextFieldLabel(displayValueUtil, topicNameLabelTxt, textFieldLabelHeight);

	this.topicNameRowView.add(this.textFieldLabel);
}

TopicMainTopicNameRowView.prototype.getTopicMainTopicNameRowView = function(){
	return this.topicNameRowView;
};

TopicMainTopicNameRowView.prototype.setTopicMainTopicNameRowView = function(topicName){
	this.textFieldLabel.text = 'Topic Name:  ' + topicName;
};


exports.TopicMainTopicNameRowView = TopicMainTopicNameRowView;
