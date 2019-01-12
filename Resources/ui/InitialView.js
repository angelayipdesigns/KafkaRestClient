//InitialView Component Constructor
function InitialView (appWindow) {
  //TODO: start working here
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	var tableData;

	var appWindowTableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

	if (settingsDBI.getSettingValueByName(DBC.KAFKA_INITIALIZED()) == 'true') {
		var OperationsTableData = require('ui/operations/OperationsTableData').OperationsTableData;
		var tableData = new OperationsTableData();
  }
  else {
		var AppConfigTableData = require('ui/appconfig/AppConfigTableData').AppConfigTableData;
		tableData = new AppConfigTableData(appWindow, appWindowTableView);
  }

	appWindowTableView.setData(tableData);

	return appWindowTableView;
}

exports.InitialView = InitialView;
