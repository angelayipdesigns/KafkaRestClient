//TopicInfoTopicRowView Component Constructor
function TopicInfoTopicRowView (displayValueUtil, topicInfoInfoRowView) {
	var TIC = require('ui/topicinfo/TopicInfoConstants').TopicInfoConstants;

  // keep a reference to topicInfoInfoRowView
	this.topicInfoInfoRowView = topicInfoInfoRowView;

	this.topicRowView = Titanium.UI.createTableViewRow();
	this.selectedTopic = '';

	this.textFieldLabelHeight = displayValueUtil.getRelativeHeight(TIC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var textFieldValueLabel = new TextFieldLabel(displayValueUtil, 'Topics:', this.textFieldLabelHeight);

	this.topicRowView.add(textFieldValueLabel);

	this.currentTopicPicker = Ti.UI.createPicker({
		top: 0,
		selectionIndicator: true
  });
	var topicPickerRowArray = [];
	topicPickerRowArray[0]=Ti.UI.createPickerRow({title: '(Empty)', color: '#000'});
	this.currentTopicPicker.add(topicPickerRowArray);
  this.currentTopicPicker.addEventListener("change", function(e) {
		this.selectedTopic = e.row.title;
	});

	this.topicRowView.add(this.currentTopicPicker);
}

TopicInfoTopicRowView.prototype.getTopicInfoTopicRowView = function(){
	return this.topicRowView;
};

TopicInfoTopicRowView.prototype.getSelectedTopic = function(){
	return this.selectedTopic;
};

TopicInfoTopicRowView.prototype.setSelectedTopic = function(topicName){
  this.selectedTopic = topicName;
};

TopicInfoTopicRowView.prototype.setTopicPickerData = function(topicArray){
  this.topicRowView.remove(this.currentTopicPicker);

	this.currentTopicPicker = Ti.UI.createPicker({
		top: 0,
		selectionIndicator: true
  });

	var selectedTopicIndex = 0;
	var topicPickerRowArray = [];
  if (topicArray.length > 0) {
	  for (index = 0; index < topicArray.length; index++) {
		  topicPickerRowArray[index]=Ti.UI.createPickerRow({title: topicArray[index], color: '#000'});
			if (this.selectedTopic === topicArray[index]) {
				selectedTopicIndex = index;
			}
	  }
	}
	else {
	  topicPickerRowArray[0]=Ti.UI.createPickerRow({title: '(Empty)', color: '#000'});
	}
	this.currentTopicPicker.add(topicPickerRowArray);

  // There was some unusual behaviour trying to update the instance variable selectedTopic
	// Both of the commented variable assignments in the event listener didn't work, however
	// the instance function call finally did work.
	self = this;
  this.currentTopicPicker.addEventListener("change", function(e) {
		// this.selectedTopic = e.row.title;
		// self.selectedTopic = e.row.title;
		self.updateSelectedTopic(e.row.title);
	});
	this.topicRowView.add(this.currentTopicPicker);

  // Finally, set the selectedRow to the correct topic
	this.currentTopicPicker.setSelectedRow(0, selectedTopicIndex, false);
};

TopicInfoTopicRowView.prototype.updateSelectedTopic = function(newValue) {
	this.selectedTopic = newValue;
	this.topicInfoInfoRowView.setTopicInfoLabel(newValue);
}


exports.TopicInfoTopicRowView = TopicInfoTopicRowView;
