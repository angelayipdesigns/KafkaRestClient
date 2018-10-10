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

  //TODO: This constant
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

	var controlGroupSpaceButtonWidth = this.displayValueUtil.getRelativeWidth(RELATIVE_HEADER_ICON_CONTROL_GROUP_SPACE_WIDTH());
	var controlGroupSpaceButtonTop = rowObjectHeightBorder + (rowObjectHeight - controlGroupSpaceButtonWidth)/2;

	/*if (addHome) {
		var homeButtonWidth = controlGroupSpaceButtonWidth;
		//make the button square
		var homeButtonHeight = homeButtonWidth;
		var homeButtonLeft = rowObjectWidthBorder + iconObjectWidth +
								relativeIconTitleSpace + titleLabelWidth;
								//+ relativeIconControlGroupSpacing;
		var HomeButton = require('ui/common/buttons/HomeButton').HomeButton;
	    this.homeButton = new HomeButton(homeButtonHeight, homeButtonWidth, homeButtonLeft, controlGroupSpaceButtonTop);
		headerViewRow.add(this.homeButton);
	}*/

	if (addSettings) {
		var settingsButtonWidth = controlGroupSpaceButtonWidth;
		//make the button square
		var settingsButtonHeight = settingsButtonWidth;
		var settingsButtonLeft = rowObjectWidthBorder + iconObjectWidth +
								relativeIconTitleSpace + titleLabelWidth
								+ controlGroupSpaceButtonWidth + relativeIconControlGroupSpacing;
		var SettingsButton = require('ui/common/buttons/SettingsButton').SettingsButton;
	    var settingsButton = new SettingsButton(this.displayValueUtil, settingsButtonHeight, settingsButtonWidth, settingsButtonLeft, controlGroupSpaceButtonTop);
		headerViewRow.add(settingsButton);
	}

	headerViewRow.add(titleLabel);


	return headerViewRow;
};

AppHeaderRowView.prototype.getHomeButton = function() {
	return this.homeButton;
};


exports.AppHeaderRowView = AppHeaderRowView;
