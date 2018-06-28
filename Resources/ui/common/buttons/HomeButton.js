//HomeButton Component Constructor
function HomeButton (buttonHeight, buttonWidth, buttonLeft, buttonTop) {

	var homeButton = Titanium.UI.createButton({
		backgroundImage:'/images/home.png',
		backgroundSelectedImage: '/images/home_selected.png',
		height: buttonHeight,
		width: buttonWidth,
		left: buttonLeft,
		top: buttonTop
	});
	
	return homeButton;
}

exports.HomeButton = HomeButton;