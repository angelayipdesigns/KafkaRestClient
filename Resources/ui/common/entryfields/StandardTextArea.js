//StandardTextArea Component Constructor
function StandardTextArea (displayValueUtil, hintText, labelHeight) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();	
	var textAreaHeight = displayValueUtil.getRelativeHeight(14);
	var textAreaWidth = displayValueUtil.getAbsoluteWidthLessBoarders();
	
	var standardTextArea = Ti.UI.createTextArea({
  		//borderWidth: rowObjectHeightBorderPercent,
  		borderColor: '#bbb',
  		borderRadius: 7,
  		color: UIC.COLOR_DARK_GREY(),
  		font: { fontSize: UIC.FIELD_FONT_SIZE() },
  		//returnKeyType: Ti.UI.RETURNKEY_GO,
  		textAlign: 'left',
  		hintText: hintText,
  		top: 2*rowObjectHeightBorderPercent + labelHeight,
  		width: textAreaWidth,
  		left: rowObjectWidthBorderPercent,
  		height: textAreaHeight,
  		keyboardType: Ti.UI.KEYBOARD_ASCII
	});	
	
	return standardTextArea;
}


exports.StandardTextArea = StandardTextArea;