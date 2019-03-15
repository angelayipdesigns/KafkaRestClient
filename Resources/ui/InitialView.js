//InitialView Component Constructor
function InitialView (appWindow) {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	var tableData;

	var appWindowTableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	if (settingsDBI.getSettingValueByName(DBC.KAFKA_INITIALIZED()) == 'true') {
		var TopicMainTableData = require('ui/topicmain/TopicMainTableData').TopicMainTableData;
		tableData = new TopicMainTableData(displayValueUtil);
  }
  else {
		var AppConfigTableData = require('ui/appconfig/AppConfigTableData').AppConfigTableData;
		tableData = new AppConfigTableData(appWindow, appWindowTableView, displayValueUtil);
  }

	appWindowTableView.setData(tableData);

	return appWindowTableView;
}

exports.InitialView = InitialView;
