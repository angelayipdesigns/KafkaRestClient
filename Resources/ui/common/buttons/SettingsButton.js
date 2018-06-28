//SettingsButton Component Constructor
function SettingsButton (displayValueUtil, buttonHeight, buttonWidth, buttonLeft, buttonTop) {

	var settingsButton = Titanium.UI.createButton({
		backgroundImage:'/images/settings.png',
		backgroundSelectedImage: '/images/settings_selected.png',
		height: buttonHeight,
		width: buttonWidth,
		left: buttonLeft,
		top: buttonTop
	});

	settingsButton.addEventListener('click', function(e) {
   		executeClickEvent(e, displayValueUtil);
	});
	
	return settingsButton;
}

function executeClickEvent(e, displayValueUtil) {
	var SettingsWindow = require('ui/settings/SettingsWindow').SettingsWindow;
    var settingsWindow = new SettingsWindow(displayValueUtil);
    settingsWindow.open();
}


exports.SettingsButton = SettingsButton;