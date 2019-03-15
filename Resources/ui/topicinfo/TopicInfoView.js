//TopicInfoView Component Constructor
function TopicInfoView (topicInfoWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

	var TopicInfoTableData = require('ui/topicinfo/TopicInfoTableData').TopicInfoTableData;
  var topicInfoTableData = new TopicInfoTableData(topicInfoWindow, displayValueUtil);

	tableView.setData(topicInfoTableData);
	return tableView;
}


exports.TopicInfoView = TopicInfoView;
