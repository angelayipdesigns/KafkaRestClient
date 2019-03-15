// TopicInfoTableData Component Constructor

function TopicInfoTableData (topicInfoWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
  tableData.push(appConfigHeaderRowView);

  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var urlFieldValue = kafkaConfigsCache.getKafkaRestURL();
	var topicFieldValue = kafkaConfigsCache.getKafkaTopic();

  // Declare this early, before adding it to the tabledata, so we can pass it to
  var TopicInfoInfoRowView = require('ui/topicinfo/TopicInfoInfoRowView').TopicInfoInfoRowView;
  var topicInfoInfoRowView = new TopicInfoInfoRowView(displayValueUtil);

  var TopicInfoTopicRowView = require('ui/topicinfo/TopicInfoTopicRowView').TopicInfoTopicRowView;
  var topicInfoTopicRowView = new TopicInfoTopicRowView(displayValueUtil, topicInfoInfoRowView);
	topicInfoTopicRowView.setSelectedTopic(topicFieldValue);
	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController();
  // This poplulates the the picker with topics, if they are available
	kafkaRestController.listTopics(urlFieldValue, false, updateTopicListPicker, topicInfoTopicRowView);
	tableData.push(topicInfoTopicRowView.getTopicInfoTopicRowView());

  var testTopicButtonViewRow = Titanium.UI.createTableViewRow();
  var buttonWidth = displayValueUtil.getProportionalObjectWidth(2, true);
  var buttonHeight = displayValueUtil.getProportionalObjectWidth(6, true);
  var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();

	var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
  var testTopicButton = new ActionButton("Test Topic", buttonHeight, buttonWidth, buttonBorderWidth, 0);
	testTopicButton.addEventListener('click', function(e) {
		var topicFieldValue = topicInfoTopicRowView.getSelectedTopic();
		kafkaRestController.listTopics(urlFieldValue, true, checkTopicExists, topicFieldValue);
	});
	testTopicButtonViewRow.add(testTopicButton);
	tableData.push(testTopicButtonViewRow);

	tableData.push(topicInfoInfoRowView.getTopicInfoInfoRowView());

  var getInfoButtonViewRow = Titanium.UI.createTableViewRow();
  var getTopicInfoButton = new ActionButton("Get Info", buttonHeight, buttonWidth, buttonBorderWidth, 0);
  getTopicInfoButton.addEventListener('click', function(e) {
    var topicFieldValue = topicInfoTopicRowView.getSelectedTopic();
		var topicInfo = kafkaRestController.getTopicInfo(urlFieldValue, topicFieldValue, updateTopicInfoTextArea, topicInfoInfoRowView);
  });
  getInfoButtonViewRow.add(getTopicInfoButton);
  tableData.push(getInfoButtonViewRow);

  var buttonViewRow = Titanium.UI.createTableViewRow();

  var okButtonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var okButtonHeight = okButtonWidth;
  var OKButton = require('ui/common/buttons/OKButton').OKButton;
  var okButton = new OKButton(okButtonHeight, okButtonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function(e) {
	  var topicFieldValue = topicInfoTopicRowView.getSelectedTopic();
		executeSaveClickEvent(topicInfoWindow, topicFieldValue);
		topicInfoWindow.close();
		topicInfoWindow = null;
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
  var cancelButton = new CancelButton(okButtonHeight, okButtonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function(e) {
	  topicInfoWindow.close();
		topicInfoWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);

	return tableData;
}

function checkTopicExists(topicArray, topicName) {
  if (topicArray.includes(topicName)) {
		var dialog = Ti.UI.createAlertDialog({
			message: 'Yes! The topic ' + topicName + ' is available ',
			ok: 'OK',
			title: 'Success'
		});
		dialog.show();
	}
	else {
		var dialog = Ti.UI.createAlertDialog({
			message: 'The topic ' + topicName + ' doesn\'t seem to exist',
			ok: 'OK',
			title: 'Hmmmm'
		});
		dialog.show();
	}
}

function updateTopicListPicker(topicsArray, topicInfoTopicRowView) {
  topicInfoTopicRowView.setTopicPickerData(topicsArray);
}

function updateTopicInfoTextArea(topicInfo, topicInfoInfoRowView) {
	topicInfoInfoRowView.setTopicInfoTextArea(topicInfo);
}

function executeSaveClickEvent(topicInfoWindow, topicFieldValue) {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	settingsDBI.updateSettingValueByName(DBC.KAFKA_TOPIC(), topicFieldValue);

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaConfigsCache.setKafkaTopic(topicFieldValue);
  Ti.App.fireEvent('updateTopicNameLabel');
}


exports.TopicInfoTableData = TopicInfoTableData;
