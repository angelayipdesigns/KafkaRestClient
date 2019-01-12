// AppConfigSettingsTableData Component Constructor
function AppConfigSettingsTableData() {
}

AppConfigSettingsTableData.prototype.buildTableData = function(appConfigSettingsWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
  tableData.push(appConfigHeaderRowView);

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	var urlFieldValue = kafkaConfigs.getKafkaRestURL();
	var topicFieldValue = kafkaConfigs.getKafkaTopic();

  var AppConfigURLRowView = require('ui/appconfig/AppConfigURLRowView').AppConfigURLRowView;
  var appConfigURLRowView = new AppConfigURLRowView(displayValueUtil);
	appConfigURLRowView.setTextFieldValue(urlFieldValue);
	tableData.push(appConfigURLRowView.getAppConfigURLRowView());

  var AppConfigTopicRowView = require('ui/appconfig/AppConfigTopicRowView').AppConfigTopicRowView;
  var appConfigTopicRowView = new AppConfigTopicRowView(displayValueUtil);
	appConfigTopicRowView.setTextFieldValue(topicFieldValue);
	tableData.push(appConfigTopicRowView.getAppConfigTopicRowView());

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
  var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function(e) {
	  var urlFieldValue = appConfigURLRowView.getTextFieldValue();
	  var topicFieldValue = appConfigTopicRowView.getTextFieldValue();
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

  var testButtonWidth = displayValueUtil.getProportionalObjectWidth(4, true);
	var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
  var actionButton = new ActionButton("Test", buttonHeight, testButtonWidth, buttonBorderWidth, 0);

	actionButton.addEventListener('click', function(e) {
	  var urlFieldValue = appConfigURLRowView.getTextFieldValue();
	  var topicFieldValue = appConfigTopicRowView.getTextFieldValue();
    executeTestClickEvent(urlFieldValue, topicFieldValue);
	});
	buttonViewRow.add(actionButton);

	tableData.push(buttonViewRow);
	return tableData;
}

function executeTestClickEvent(urlFieldValue, topicFieldValue) {
	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController(urlFieldValue, topicFieldValue);
	kafkaRestController.listTopics(urlFieldValue, topicFieldValue);
}

function executeSaveClickEvent(appConfigSettingsWindow, urlFieldValue, topicFieldValue) {
	var DBC = require('db/DBConstants').DBConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	settingsDBI.updateSettingValueByName(DBC.KAFKA_REST_URL(), urlFieldValue);
	settingsDBI.updateSettingValueByName(DBC.KAFKA_TOPIC(), topicFieldValue);

	var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
	var kafkaConfigs = new KafkaConfigs(urlFieldValue, topicFieldValue);
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaConfigsCache.setKafkaConfigs(kafkaConfigs);
}


exports.AppConfigSettingsTableData = AppConfigSettingsTableData;
