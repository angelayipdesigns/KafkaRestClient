//TopicMainTopicInfoRowView Component Constructor
function TopicMainTopicInfoRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var TMC = require('ui/topicmain/TopicMainConstants').TopicMainConstants;

	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
  var topicNameLabelHeight = displayValueUtil.getRelativeHeight(TMC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
  var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) + topicNameLabelHeight + 2*rowObjectHeightBorderPercent;

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(TMC.NUM_SIMILAR_ROW_ELEMENTS_ON_PAGE(), true, usedHeight);


	var topicInfoRowView = Titanium.UI.createTableViewRow();

	var topicInfoLabel = Titanium.UI.createLabel({
		text:'Topic Information',
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

	topicInfoRowView.add(topicInfoLabel);

	topicInfoRowView.addEventListener('click', function() {
    var TopicInfoWindow = require('ui/topicinfo/TopicInfoWindow').TopicInfoWindow;
    var topicInfoWindow = new TopicInfoWindow(displayValueUtil);
    topicInfoWindow.open();
	});

	return topicInfoRowView;
}


exports.TopicMainTopicInfoRowView = TopicMainTopicInfoRowView;
