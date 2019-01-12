//AppConfigSettingsWindow Component Constructor
function AppConfigSettingsWindow(displayValueUtil) {

	//create component instance
	var appConfigSettingsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		appConfigSettingsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var AppConfigSettingsView = require('ui/appconfig/AppConfigSettingsView').AppConfigSettingsView;
	var appConfigSettingsView = new AppConfigSettingsView(appConfigSettingsWindow, displayValueUtil);

	appConfigSettingsWindow.add(appConfigSettingsView);

	appConfigSettingsWindow.addEventListener('android:back', function () {
		appConfigSettingsWindow.remove(appConfigSettingsView);
		appConfigSettingsWindow.close();
		appConfigSettingsWindow = null;
	});

	return appConfigSettingsWindow;
}

//make constructor function the public component interface
exports.AppConfigSettingsWindow = AppConfigSettingsWindow;
