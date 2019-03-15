//OperationsWindow Component Constructor
function OperationsWindow(displayValueUtil) {

	//create component instance
	var operationsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		operationsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var OperationsView = require('ui/operations/OperationsView').OperationsView;
	var operationsView = new OperationsView(operationsWindow, displayValueUtil);

	operationsWindow.add(operationsView);

	operationsWindow.addEventListener('android:back', function () {
		operationsWindow.remove(operationsView);
		operationsWindow.close();
		operationsWindow = null;
	});

	return operationsWindow;
}

//make constructor function the public component interface
exports.OperationsWindow = OperationsWindow;
