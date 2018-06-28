//CancelButton Component Constructor
function CancelButton (buttonHeight, buttonWidth, buttonBorderWidth) {

	var cancelButton = Titanium.UI.createButton({
		backgroundImage:'/assets/images/cancel.png',
		backgroundSelectedImage: '/assets/images/cancel_selected.png',
		height: buttonHeight-6*buttonBorderWidth,
		width: buttonWidth-6*buttonBorderWidth,
		left: buttonBorderWidth + 5*buttonWidth,
		top: 2*buttonBorderWidth
	});

	return cancelButton;
}

exports.CancelButton = CancelButton;
