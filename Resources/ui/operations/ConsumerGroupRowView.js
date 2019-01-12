// ConsumerGroupRowView Component Constructor
function ConsumerGroupRowView (displayValueUtil) {
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	this.consumerGroupRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var consumerGroupLabel = new TextFieldLabel(displayValueUtil, 'Consumer Group Prefix:', textFieldLabelHeight);
	this.consumerGroupRowView.add(consumerGroupLabel);

  var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.consumerGroupPrefixTextField = new StandardTextField(displayValueUtil, '', textFieldLabelHeight);
	this.consumerGroupPrefixTextField.value = 'consumerGroup';
	this.consumerGroupRowView.add(this.consumerGroupPrefixTextField);
	this.consumerGroupPrefixTextField.blur();
}

ConsumerGroupRowView.prototype.getConsumerGroupRowView = function(){
	return this.consumerGroupRowView;
};

ConsumerGroupRowView.prototype.getConsumerGroupPrefixTextField = function(){
	return this.consumerGroupPrefixTextField.value;
};


exports.ConsumerGroupRowView = ConsumerGroupRowView;
