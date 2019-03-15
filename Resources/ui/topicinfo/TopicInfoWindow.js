//TopicInfoWindow Component Constructor
function TopicInfoWindow(displayValueUtil) {

	//create component instance
	var topicInfoWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		topicInfoWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var TopicInfoView = require('ui/topicinfo/TopicInfoView').TopicInfoView;
	var topicInfoView = new TopicInfoView(topicInfoWindow, displayValueUtil);

	topicInfoWindow.add(topicInfoView);

	topicInfoWindow.addEventListener('android:back', function () {
		topicInfoWindow.remove(topicInfoView);
		topicInfoWindow.close();
		topicInfoWindow = null;
	});

	return topicInfoWindow;
}

//make constructor function the public component interface
exports.TopicInfoWindow = TopicInfoWindow;
