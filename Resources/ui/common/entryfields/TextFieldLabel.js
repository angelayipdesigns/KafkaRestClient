//TextFieldLabel Component Constructor
function TextFieldLabel (displayValueUtil, labelText, labelHeight) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var labelWidth = displayValueUtil.getAbsoluteWidthLessBoarders();
	var textFieldLabel = Titanium.UI.createLabel({
		text: labelText,
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: labelHeight,
		width: labelWidth,
		left: rowObjectWidthBorderPercent, 
		textAlign: 'left',
		top:2*rowObjectHeightBorderPercent
	});
	return textFieldLabel;
}


exports.TextFieldLabel = TextFieldLabel;