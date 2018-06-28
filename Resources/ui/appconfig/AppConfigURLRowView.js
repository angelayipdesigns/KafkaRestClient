//AppConfigURLRowView Component Constructor
function AppConfigURLRowView (displayValueUtil) {
	var ACC = require('ui/appconfig/AppConfigConstants').AppConfigConstants;

	this.urlRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(ACC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var textFieldValueLabel = new TextFieldLabel(displayValueUtil, 'URL of Kafka-rest:', textFieldLabelHeight);

	this.urlRowView.add(textFieldValueLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.textField = new StandardTextField(displayValueUtil, 'http://<somehost.or.ip>:8082', textFieldLabelHeight);

	this.urlRowView.add(this.textField);
	this.textField.blur();
}

AppConfigURLRowView.prototype.getAppConfigURLRowView = function(){
	return this.urlRowView;
};

AppConfigURLRowView.prototype.getTextFieldValue = function(){
	return this.textField.value;
};

AppConfigURLRowView.prototype.setTextFieldValue = function(textFieldValue){
	this.textField.value = textFieldValue;
};


exports.AppConfigURLRowView = AppConfigURLRowView;
