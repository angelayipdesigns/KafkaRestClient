// AppConfigTableData Component Constructor
function AppConfigTableData(appWindow, appWindowTableView, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
  tableData.push(appConfigHeaderRowView);

	var AppConfigURLRowView = require('ui/appconfig/AppConfigURLRowView').AppConfigURLRowView;
  var appConfigURLRowView = new AppConfigURLRowView(displayValueUtil);
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
	tableData.push(appConfigTopicRowView.getAppConfigTopicRowView());

  // This is the event listener mentioned in the comment above.
	testURLButton.addEventListener('click', function(e) {
    var urlFieldValue = appConfigURLRowView.getTextFieldValue();
    var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
    var kafkaRestController = new KafkaRestController();
    kafkaRestController.listTopics(urlFieldValue, true, updateTopicListPicker, appConfigTopicRowView);
  });

	var testTopicButtonViewRow = Titanium.UI.createTableViewRow();
	var testTopicButton = new ActionButton("Test Topic", buttonHeight, testButtonWidth, buttonBorderWidth, 0);
	testTopicButton.addEventListener('click', function(e) {
		var urlFieldValue = appConfigURLRowView.getTextFieldValue();
		var topicFieldValue = appConfigTopicRowView.getSelectedTopic();
		var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
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
		executeSaveClickEvent(appWindowTableView, displayValueUtil, urlFieldValue, topicFieldValue);
	});

	buttonViewRow.add(okButton);

	// AndroidSpecific:  Only show the cancel button on Android, iOS doesn't let you exit the app
	if (Titanium.Platform.name == 'android') {
		var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

		cancelButton.addEventListener('click', function(e) {
		  appWindow.close();
		});

		buttonViewRow.add(cancelButton);
	}

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

function executeSaveClickEvent(appWindowTableView, displayValueUtil, urlFieldValue, topicFieldValue) {
	var DBC = require('db/DBConstants').DBConstants;
	var Setting = require('db/dbi/settings/Setting').Setting;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	settingsDBI.updateSettingValueByName(DBC.KAFKA_INITIALIZED(), 'true');

	if (!urlFieldValue) {
		urlFieldValue = 'https://<somehost>:<port>'
	}

  var urlSetting = new Setting(DBC.KAFKA_REST_URL(), urlFieldValue, 'The coordinates of the kafka-rest app');
	settingsDBI.insertSetting(urlSetting);
	var topicSetting =  new Setting(DBC.KAFKA_TOPIC(), topicFieldValue, 'The Kafka topic to use');
  settingsDBI.insertSetting(topicSetting);

  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaConfigsCache.setKafkaRestURL(urlFieldValue);
	kafkaConfigsCache.setKafkaTopic(topicFieldValue);

  var TopicMainTableData = require('ui/topicmain/TopicMainTableData').TopicMainTableData;
  var topicMainTableData = new TopicMainTableData(displayValueUtil, topicFieldValue);

  appWindowTableView.setData(topicMainTableData);
}


exports.AppConfigTableData = AppConfigTableData;
