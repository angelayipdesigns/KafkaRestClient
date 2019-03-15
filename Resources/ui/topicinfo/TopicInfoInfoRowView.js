//TopicInfoInfoRowView Component Constructor
function TopicInfoInfoRowView (displayValueUtil) {
	var TIC = require('ui/topicinfo/TopicInfoConstants').TopicInfoConstants;

  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var topicName = kafkaConfigsCache.getKafkaTopic();
  var topicInfoLabelTxt = 'Information for Topic:  ' + topicName;

	this.topicInfoRowView = Titanium.UI.createTableViewRow();
	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(TIC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  this.topicInfoLabel = new TextFieldLabel(displayValueUtil, topicInfoLabelTxt, textFieldLabelHeight);

	this.topicInfoRowView.add(this.topicInfoLabel);

	var StandardTextArea = require('ui/common/entryfields/StandardTextArea').StandardTextArea;
  this.topicInfoTextArea = new StandardTextArea(displayValueUtil, 'This area will be populated with the topic information', textFieldLabelHeight);

	this.topicInfoRowView.add(this.topicInfoTextArea);
	this.topicInfoTextArea.blur();
}

TopicInfoInfoRowView.prototype.getTopicInfoInfoRowView = function(){
	return this.topicInfoRowView;
};

TopicInfoInfoRowView.prototype.setTopicInfoLabel = function(topicName){
	this.topicInfoLabel.text = 'Information for Topic:  ' + topicName;
};

TopicInfoInfoRowView.prototype.setTopicInfoTextArea = function(topicInfo){
	this.topicInfoTextArea.value = topicInfo;
};

exports.TopicInfoInfoRowView = TopicInfoInfoRowView;
