//TableComponentSeparatorRowView Component Constructor
function TableComponentSeparatorRowView(displayValueUtil) {
	var rowObjectHeight = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidth = displayValueUtil.getAbsoluteWidth();

	var componentSeparatorRowView = Titanium.UI.createTableViewRow();

	var componentSeparatorLabel = Titanium.UI.createLabel({
		backgroundColor: '#000000', 
		height: rowObjectHeight,
		width: rowObjectWidth
	});

	componentSeparatorRowView.add(componentSeparatorLabel);	
	return componentSeparatorRowView;
}


exports.TableComponentSeparatorRowView = TableComponentSeparatorRowView;