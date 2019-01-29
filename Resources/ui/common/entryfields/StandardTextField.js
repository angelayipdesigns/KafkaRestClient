//StandardTextField Component Constructor
function StandardTextField (displayValueUtil, hintText, labelHeight) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var textFieldHeight = displayValueUtil.getRelativeHeight(10);
	var textFieldWidth = displayValueUtil.getAbsoluteWidthLessBoarders();

	var standardTextField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: UIC.COLOR_DARK_GREY(),
  		font: { fontSize: UIC.FIELD_FONT_SIZE() },
  		height: textFieldHeight,
  		width: textFieldWidth,
		  left: rowObjectWidthBorderPercent,
  		top: 2*rowObjectHeightBorderPercent + labelHeight,
  		hintText: hintText,
			hintTextColor: UIC.COLOR_LIGHT_GREY(),
  		keyboardType: Ti.UI.KEYBOARD_ASCII
	});
	return standardTextField;
}


exports.StandardTextField = StandardTextField;
