// AppConfigSettingsTableData Component Constructor
function AppConfigSettingsTableData(appConfigSettingsWindow, displayValueUtil) {
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

  var AppConfigURLRowView = require('ui/appconfig/AppConfigURLRowView').AppConfigURLRowView;
  var appConfigURLRowView = new AppConfigURLRowView(displayValueUtil);
	appConfigURLRowView.setTextFieldValue(urlFieldValue);
	tableData.push(appConfigURLRowView.getAppConfigURLRowView());

	var testURLButtonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var testButtonWidth = displayValueUtil.getProportionalObjectWidth(2, true);
	var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
	var testURLButton = new ActionButton("Test URL", buttonHeight, testButtonWidth, buttonBorderWidth, 0);
  // Normally, we would add the event listener to the button immediately, but we delay it in this
	// case since we will update the appConfigTopicRowView during the event listener.

  testURLButtonViewRow.add(testURLButton);
	tableData.push(testURLButtonViewRow);

  var AppConfigTopicRowView = require('ui/appconfig/AppConfigTopicRowView').AppConfigTopicRowView;
  var appConfigTopicRowView = new AppConfigTopicRowView(displayValueUtil);
	appConfigTopicRowView.setSelectedTopic(topicFieldValue);
	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController();
  // This poplulates the the picker with topics, if they are available
	kafkaRestController.listTopics(urlFieldValue, false, updateTopicListPicker, appConfigTopicRowView);
	tableData.push(appConfigTopicRowView.getAppConfigTopicRowView());

  // This is the event listener mentioned in the comment above.
	testURLButton.addEventListener('click', function(e) {
    var urlFieldValue = appConfigURLRowView.getTextFieldValue();
    var kafkaRestController = new KafkaRestController();
    kafkaRestController.listTopics(urlFieldValue, true, updateTopicListPicker, appConfigTopicRowView);
  });

	var testTopicButtonViewRow = Titanium.UI.createTableViewRow();
	var testTopicButton = new ActionButton("Test Topic", buttonHeight, testButtonWidth, buttonBorderWidth, 0);
	testTopicButton.addEventListener('click', function(e) {
		var urlFieldValue = appConfigURLRowView.getTextFieldValue();
		var topicFieldValue = appConfigTopicRowView.getSelectedTopic();
		var kafkaRestController = new KafkaRestController();
		kafkaRestController.listTopics(urlFieldValue, true, checkTopicExists, topicFieldValue);
	});
	testTopicButtonViewRow.add(testTopicButton);
	tableData.push(testTopicButtonViewRow);

  var buttonViewRow = Titanium.UI.createTableViewRow();
	var OKButton = require('ui/common/buttons/OKButton').OKButton;
  var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function(e) {
	  var urlFieldValue = appConfigURLRowView.getTextFieldValue();
	  var topicFieldValue = appConfigTopicRowView.getSelectedTopic();
		executeSaveClickEvent(appConfigSettingsWindow, urlFieldValue, topicFieldValue);
		appConfigSettingsWindow.close();
		appConfigSettingsWindow = null;
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
  var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function(e) {
	  appConfigSettingsWindow.close();
		appConfigSettingsWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
}

function updateTopicListPicker(topicsArray, appConfigTopicRowView) {
  appConfigTopicRowView.setTopicPickerData(topicsArray);
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

function executeSaveClickEvent(appConfigSettingsWindow, urlFieldValue, topicFieldValue) {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	if (!urlFieldValue) {
		urlFieldValue = 'https://<somehost>:<port>'
	}

	settingsDBI.updateSettingValueByName(DBC.KAFKA_REST_URL(), urlFieldValue);
	settingsDBI.updateSettingValueByName(DBC.KAFKA_TOPIC(), topicFieldValue);

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaConfigsCache.setKafkaRestURL(urlFieldValue);
	kafkaConfigsCache.setKafkaTopic(topicFieldValue);
	Ti.App.fireEvent('updateTopicNameLabel');
}


exports.AppConfigSettingsTableData = AppConfigSettingsTableData;
