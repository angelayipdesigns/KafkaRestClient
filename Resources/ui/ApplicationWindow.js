//ApplicationWindow Component Constructor
function ApplicationWindow() {

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	Ti.UI.setBackgroundColor('white');

	//create component instance
	var appWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
	

	if (Titanium.Platform.name == 'android') {
  		appWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}
		
	//construct UI
	var ApplicationView = require('ui/ApplicationView').ApplicationView;
	var applicationView = new ApplicationView(appWindow);
	appWindow.add(applicationView);
	
	return appWindow;
}

//make constructor function the public component interface
exports.ApplicationWindow = ApplicationWindow;
