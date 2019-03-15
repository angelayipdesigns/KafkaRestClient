// ConsumeRowView Component Constructor
function ConsumeRowView (displayValueUtil) {
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	this.consumeRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var consumeLabel = new TextFieldLabel(displayValueUtil, 'Consume', textFieldLabelHeight);
	this.consumeRowView.add(consumeLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.consumeMessagesTextField = new StandardTextField(displayValueUtil, '', textFieldLabelHeight);
  this.consumeMessagesTextField.value = 'Typically, create the instance, then consume';
	this.consumeMessagesTextField.setEditable(false);
	this.consumeRowView.add(this.consumeMessagesTextField);
	this.consumeMessagesTextField.blur();
}

ConsumeRowView.prototype.getConsumeRowView = function(){
	return this.consumeRowView;
};


exports.ConsumeRowView = ConsumeRowView;
