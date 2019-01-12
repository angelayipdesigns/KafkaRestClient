//SettingsButton Component Constructor
function SettingsButton (displayValueUtil, buttonHeight, buttonWidth, buttonRight, buttonTop) {

	var settingsButton = Titanium.UI.createButton({
		backgroundImage:'/assets/images/settings.png',
		backgroundSelectedImage: '/assets/images/settings_selected.png',
		height: buttonHeight,
		width: buttonWidth,
		right: buttonRight,
		top: buttonTop
	});

	settingsButton.addEventListener('click', function(e) {
   		executeClickEvent(e, displayValueUtil);
	});

	return settingsButton;
}

function executeClickEvent(e, displayValueUtil) {
	var AppConfigSettingsWindow = require('ui/appconfig/AppConfigSettingsWindow').AppConfigSettingsWindow;
  var appConfigSettingsWindow = new AppConfigSettingsWindow(displayValueUtil);
  appConfigSettingsWindow.open();
}


exports.SettingsButton = SettingsButton;
