//DisplayValueUtil Component Constructor
function DisplayValueUtil () {
	this.platformWidth = Ti.Platform.displayCaps.platformWidth;
	var statusBarHeight = 0;
	
	if (Titanium.Platform.name == 'android') {
		//the formula was provided by some developer on the forum, and the 10, seems to get the borders just right
	    statusBarHeight = Math.round((25 * Titanium.Platform.displayCaps.dpi)/160) + 10;
	}
	else {
		//20 is the height of the iOS status bar
		statusBarHeight = 20;
	}
	
	this.platformHeight = Ti.Platform.displayCaps.platformHeight - statusBarHeight;
	this.relativeBorderSize = (this.platformWidth > this.platformHeight) ? this.getRelativeHeight(1) : this.getRelativeWidth(1);

    this.configurableTop = isIOS7Plus() ? 20 : 0;
}

DisplayValueUtil.prototype.getConfigurableTop = function() {
	return this.configurableTop;
};

DisplayValueUtil.prototype.getAbsoluteWidth = function() {
	return this.platformWidth;
};

DisplayValueUtil.prototype.getAbsoluteWidthLessBoarders = function() {
	return this.platformWidth - 2*this.relativeBorderSize;
};

DisplayValueUtil.prototype.getAbsoluteHeight = function() {
    return this.platformHeight;
};

DisplayValueUtil.prototype.getRelativeBoarderSize = function() {
    return this.relativeBorderSize;
};

DisplayValueUtil.prototype.getRelativeWidth = function(widthPercent) {
	return Math.round(this.platformWidth * (widthPercent/100));
};

DisplayValueUtil.prototype.getRelativeHeight = function(heightPercent) {
    return Math.round(this.platformHeight * (heightPercent/100));
};

DisplayValueUtil.prototype.getProportionalObjectWidth = function(numObjects, borders) {
	var availableWidthLessBorders = 0;
	if (numObjects == 0){
		return availableWidthLessBorders;
	} 
	if (borders) {
		availableWidthLessBorders = this.platformWidth - 2*this.relativeBorderSize;
	}
	else {
		availableWidthLessBorders = this.platformWidth;
	}
	return Math.round(availableWidthLessBorders/numObjects);
};

DisplayValueUtil.prototype.getRemainingProportionalObjectWidth = function(numObjects, borders, usedWidth) {
	var remainingAvailableWidthLessBorders = 0;
	if (numObjects == 0){
		return remainingAvailableWidthLessBorders;
	} 
	if (borders) {
		remainingAvailableWidthLessBorders = this.platformWidth - 2*this.relativeBorderSize;
	}
	else {
		remainingAvailableWidthLessBorders = this.platformWidth;
	}
	
	remainingAvailableWidthLessBorders = remainingAvailableWidthLessBorders - usedWidth;
	return Math.round(remainingAvailableWidthLessBorders/numObjects);
};

DisplayValueUtil.prototype.getProportionalObjectHeight = function(numObjects, borders) {
	var availableWidthLessBorders = 0;
	if (numObjects == 0){
		return availableWidthLessBorders;
	}
	if (borders) {	
		availableHeightLessBorders = this.platformHeight - 2*this.relativeBorderSize;
	}
	else {
		availableHeightLessBorders = this.platformHeight;
	}
    return Math.round(availableHeightLessBorders / numObjects);
};

DisplayValueUtil.prototype.getRemainingProportionalObjectHeight = function(numObjects, borders, usedHeight) {
	var remainingAvailableHeightLessBorders = 0;
	if (numObjects == 0){
		return remainingAvailableHeightLessBorders;
	}
	if (borders) {	
		remainingAvailableHeightLessBorders = this.platformHeight - 2*this.relativeBorderSize;
	}
	else {
		remainingAvailableHeightLessBorders = this.platformHeight;
	}
	
	remainingAvailableHeightLessBorders = remainingAvailableHeightLessBorders - usedHeight;
    return Math.round(remainingAvailableHeightLessBorders / numObjects);
};

function isIOS7Plus() {
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		if (major >= 7) {
			return true;
		}
	}
	return false;
}


exports.DisplayValueUtil = DisplayValueUtil;