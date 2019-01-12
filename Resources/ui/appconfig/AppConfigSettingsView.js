//AppConfigSettingsView Component Constructor
function AppConfigSettingsView (appConfigSettingsWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

	var AppConfigSettingsTableData = require('ui/appconfig/AppConfigSettingsTableData').AppConfigSettingsTableData;
  var appConfigSettingsTableData = new AppConfigSettingsTableData();

	tableView.setData(appConfigSettingsTableData.buildTableData(appConfigSettingsWindow, displayValueUtil));

	return tableView;
}


exports.AppConfigSettingsView = AppConfigSettingsView;
