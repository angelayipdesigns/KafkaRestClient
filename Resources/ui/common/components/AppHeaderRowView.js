function RELATIVE_HEADER_ICON_TITLE_SPACE() {
	return 5;
	//This is the width between the icon and the title
}

function RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACE_WIDTH() {
	return 7;
	//This is the width of each icon in the control group
}

function RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACING() {
	return 2;
	//This is the width of the spacing between the control group icons
}

function RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACE() {
	// return 2 * RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACE_WIDTH()
	return RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACING() ;
	//This is the total width of the control group area
}

//AppHeaderRowView Component Constructor
function AppHeaderRowView (displayValueUtil) {
	this.displayValueUtil = displayValueUtil;
}

AppHeaderRowView.prototype.getBasicHeaderRowView = function(headerTitle, headerColor, backgroundColor, addHome, addSettings) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeight = this.displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT());
	var rowObjectHeightBorder = this.displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = this.displayValueUtil.getRelativeBoarderSize();
	//make the icon square
	var iconObjectWidth = rowObjectHeight;

	var headerViewRow = Titanium.UI.createTableViewRow({backgroundColor: backgroundColor});

	var iconImageView = Ti.UI.createImageView({
		image:'/assets/images/appicon.png',
		height: rowObjectHeight,
		width: iconObjectWidth,
		top: rowObjectHeightBorder,
		left: rowObjectWidthBorder
	});
	headerViewRow.add(iconImageView);

	var relativeIconTitleSpace = this.displayValueUtil.getRelativeWidth(RELATIVE_HEADER_ICON_TITLE_SPACE());
	var relativeIconControlGroupSpace = this.displayValueUtil.getRelativeWidth(RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACE());
	var relativeIconControlGroupSpacing = this.displayValueUtil.getRelativeWidth(RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACING());


	var titleLabelWidth = this.displayValueUtil.getAbsoluteWidthLessBoarders()
							- (iconObjectWidth + relativeIconTitleSpace + relativeIconControlGroupSpace);

	var titleLabel = Titanium.UI.createLabel({
		font: { fontSize: "22dp" },
		text: headerTitle,
		textAlign:'left',
		color: headerColor,
		height: rowObjectHeight,
		width: titleLabelWidth,
		top:rowObjectHeightBorder,
		left: (rowObjectWidthBorder + iconObjectWidth + relativeIconTitleSpace)
	});

	headerViewRow.add(titleLabel);

	if (addSettings) {
		var settingsButtonWidth = iconObjectWidth/2;
		//make the button square
		var settingsButtonHeight = settingsButtonWidth;

		var SettingsButton = require('ui/common/buttons/SettingsButton').SettingsButton;

		//compute the top of the settings button
		var settingsTop = rowObjectHeightBorder + (rowObjectHeight/2 - settingsButtonHeight/2);
		var settingsButton = new SettingsButton(this.displayValueUtil, settingsButtonHeight, settingsButtonWidth, rowObjectWidthBorder, settingsTop);

		headerViewRow.add(settingsButton);
	}
  headerViewRow.add(settingsButton);

	return headerViewRow;
};

AppHeaderRowView.prototype.getHomeButton = function() {
	return this.homeButton;
};


exports.AppHeaderRowView = AppHeaderRowView;
