// AppConfigTableData Component Constructor
function AppConfigTableData(appWindow, appWindowTableView) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
  tableData.push(appConfigHeaderRowView);

  var AppConfigURLRowView = require('ui/appconfig/AppConfigURLRowView').AppConfigURLRowView;
  var appConfigURLRowView = new AppConfigURLRowView(displayValueUtil);
	tableData.push(appConfigURLRowView.getAppConfigURLRowView());

  var AppConfigTopicRowView = require('ui/appconfig/AppConfigTopicRowView').AppConfigTopicRowView;
  var appConfigTopicRowView = new AppConfigTopicRowView(displayValueUtil);
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
		executeSaveClickEvent(appWindowTableView, urlFieldValue, topicFieldValue);
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

function executeSaveClickEvent(appWindowTableView, urlFieldValue, topicFieldValue) {
	var DBC = require('db/DBConstants').DBConstants;
	var Setting = require('db/dbi/settings/Setting').Setting;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	settingsDBI.updateSettingValueByName(DBC.KAFKA_INITIALIZED(), 'true');
  var urlSetting = new Setting(DBC.KAFKA_REST_URL(), urlFieldValue, 'The coordinates of the kafka-rest app');
	settingsDBI.insertSetting(urlSetting);
	var topicSetting =  new Setting(DBC.KAFKA_TOPIC(), topicFieldValue, 'The Kafka topic to use');
  settingsDBI.insertSetting(topicSetting);

	var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
  var kafkaConfigs = new KafkaConfigs(urlFieldValue, topicFieldValue);
  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  kafkaConfigsCache.setKafkaConfigs(kafkaConfigs);

  var OperationsTableData = require('ui/operations/OperationsTableData').OperationsTableData;
  var operationsTableData = new OperationsTableData();

  appWindowTableView.setData(operationsTableData);
}


exports.AppConfigTableData = AppConfigTableData;
