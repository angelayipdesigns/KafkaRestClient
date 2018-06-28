//OKButton Component Constructor
function OKButton (buttonHeight, buttonWidth, buttonBorderWidth) {

	var okButton = Titanium.UI.createButton({
		backgroundImage:'/assets/images/ok.png',
		backgroundSelectedImage: '/assests/images/ok_selected.png',
		height: buttonHeight-6*buttonBorderWidth,
		width: buttonWidth-6*buttonBorderWidth,
		left: buttonBorderWidth + 4*buttonWidth,
		top: 2*buttonBorderWidth
	});

	return okButton;
}

exports.OKButton = OKButton;
