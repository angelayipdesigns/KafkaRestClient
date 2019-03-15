//OperationsView Component Constructor
function OperationsView (operationsWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

  var OperationsTableData = require('ui/operations/OperationsTableData').OperationsTableData;
  var operationsTableData = new OperationsTableData(operationsWindow, displayValueUtil);
	tableView.setData(operationsTableData);
	return tableView;
}


exports.OperationsView = OperationsView;
