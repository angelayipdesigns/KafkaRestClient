//ActionButton Component Constructor
function ActionButton (buttonLabel, buttonHeight, buttonWidth, buttonBorderWidth, buttonPositionLeft) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var testButton = Titanium.UI.createButton({
		title: buttonLabel,
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: buttonHeight-5*buttonBorderWidth,
		width: buttonWidth-5*buttonBorderWidth,
		left: buttonPositionLeft*buttonWidth + 4*buttonBorderWidth,
		top: 2*buttonBorderWidth,
		selectedColor: UIC.COLOR_DARK_GREY()
	});

	return testButton;
}

exports.ActionButton = ActionButton;
