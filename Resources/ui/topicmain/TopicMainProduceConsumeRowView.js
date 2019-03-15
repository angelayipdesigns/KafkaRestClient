//TopicMainProduceConsumeRowView Component Constructor
function TopicMainProduceConsumeRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var TMC = require('ui/topicmain/TopicMainConstants').TopicMainConstants;

  var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var topicNameLabelHeight = displayValueUtil.getRelativeHeight(TMC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
  var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) + topicNameLabelHeight + 2*rowObjectHeightBorderPercent;

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(TMC.NUM_SIMILAR_ROW_ELEMENTS_ON_PAGE(), true, usedHeight);

	var produceConsumeRowView = Titanium.UI.createTableViewRow();

	var produceConsumeLabel = Titanium.UI.createLabel({
		text:'Produce / Consume',
		borderColor: UIC.COLOR_LIGHT_GREY(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	produceConsumeRowView.add(produceConsumeLabel);

	produceConsumeRowView.addEventListener('click', function() {
    var OperationsWindow = require('ui/operations/OperationsWindow').OperationsWindow;
    var operationsWindow = new OperationsWindow(displayValueUtil);
    operationsWindow.open();
	});

	return produceConsumeRowView;
}


exports.TopicMainProduceConsumeRowView = TopicMainProduceConsumeRowView;
