// ProduceRowView Component Constructor
function ProduceRowView (displayValueUtil) {
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	this.produceRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var produceLabel = new TextFieldLabel(displayValueUtil, 'Produce', textFieldLabelHeight);

	this.produceRowView.add(produceLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
  this.produceTextField = new StandardTextField(displayValueUtil, 'Message template prefix', textFieldLabelHeight);
	this.produceRowView.add(this.produceTextField);
	this.produceTextField.blur();

	this.produceRowView.add(this.produceTextField);
}

ProduceRowView.prototype.getProduceRowView = function(){
	return this.produceRowView;
};

ProduceRowView.prototype.getProduceTextField = function(){
	return this.produceTextField.value;
};

ProduceRowView.prototype.setProduceTextField = function(produce){
	this.produceTextField.value = produce;
};


exports.ProduceRowView = ProduceRowView;
