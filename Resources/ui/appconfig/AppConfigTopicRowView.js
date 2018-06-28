//AppConfigTopicRowView Component Constructor
function AppConfigTopicRowView (displayValueUtil) {
	var ACC = require('ui/appconfig/AppConfigConstants').AppConfigConstants;

	this.topicRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(ACC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var textFieldValueLabel = new TextFieldLabel(displayValueUtil, 'Topic Name:', textFieldLabelHeight);

	this.topicRowView.add(textFieldValueLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
  this.textField = new StandardTextField(displayValueUtil, 'someTopic', textFieldLabelHeight);

	this.topicRowView.add(this.textField);
	this.textField.blur();
}

AppConfigTopicRowView.prototype.getAppConfigTopicRowView = function(){
	return this.topicRowView;
};

AppConfigTopicRowView.prototype.getTextFieldValue = function(){
	return this.textField.value;
};

AppConfigTopicRowView.prototype.setTextFieldValue = function(textFieldValue){
	this.textField.value = textFieldValue;
};

exports.AppConfigTopicRowView = AppConfigTopicRowView;
