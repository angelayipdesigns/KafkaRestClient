function IS_SELECTED_IMAGE() {
	return '/images/checkbox_selected.png';
}
function NOT_SELECTED_IMAGE() {
	return '/images/checkbox_empty.png';
}

//CheckboxButton Component Constructor
function CheckboxButton (displayValueUtil, labelHeight, isSelected) {
	this.displayValueUtil = displayValueUtil;
	this.labelHeight = labelHeight;
	this.isSelected = isSelected;
}

CheckboxButton.prototype.getButtonDisplayable = function(){
	var rowObjectHeightBorder = this.displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = this.displayValueUtil.getRelativeBoarderSize();

	var buttonWidth = this.displayValueUtil.getRelativeWidth(7);
	//make the button square
	var buttonHeight = buttonWidth;

	var labelTop = this.displayValueUtil.getRelativeBoarderSize();
	var buttonTop = this.labelHeight + labelTop - buttonHeight;
	if (buttonTop < 0) {
		buttonTop = 0;
	}

	var backgroundImage;
	if (this.isSelected) {
		backgroundImage = IS_SELECTED_IMAGE();
	}
	else {
		backgroundImage = NOT_SELECTED_IMAGE();
	}

	var checkboxButton = Titanium.UI.createButton({
		backgroundImage: backgroundImage,
		height: buttonHeight,
		width: buttonWidth,
		right: rowObjectWidthBorder,
		top: buttonTop
	});

	var self = this;
	checkboxButton.addEventListener('click', function() {
		if (self.getSelected()) {
			checkboxButton.setBackgroundImage(NOT_SELECTED_IMAGE());
			self.setSelected(false);
		}
		else {
			checkboxButton.setBackgroundImage(IS_SELECTED_IMAGE());
			self.setSelected(true);
		}
	});
	
	return checkboxButton;
};

CheckboxButton.prototype.getSelected = function(){
	return this.isSelected;
};

CheckboxButton.prototype.setSelected = function(isSelected){
	this.isSelected = isSelected;
};




exports.CheckboxButton = CheckboxButton;