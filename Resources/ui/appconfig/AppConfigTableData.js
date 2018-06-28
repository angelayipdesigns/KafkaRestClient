// AppConfigTableData Component Constructor
function AppConfigTableData (appWindow, appWindowntableView) {
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
		executeSaveClickEvent(appWindowntableView, urlFieldValue, topicFieldValue);
	});

	buttonViewRow.add(okButton);

	// AndroidSpecific:  Only show the cancel button on Android, iOS doesn't let you exit the app
	if (Titanium.Platform.name == 'android') {
		var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

		cancelButton.addEventListener('click', function(e) {
	    //Ti.API.info("execute some kind of cancel op");
		  appWindow.close();
		});

		buttonViewRow.add(cancelButton);
	}

  // New
	var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
  var actionButton = new ActionButton("Test", buttonHeight, buttonWidth, buttonBorderWidth, 0);

	// remove these dev hardcoded values
	appConfigURLRowView.setTextFieldValue("http://10.0.0.23:8082");
	//appConfigURLRowView.setTextFieldValue("http://10.209.33.128:8082");
	appConfigTopicRowView.setTextFieldValue("myTopic");

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
	kafkaRestController.listTopics();
}

function executeSaveClickEvent(appWindowntableView, urlFieldValue, topicFieldValue) {
	Ti.API.info("savint to db urlFieldValue of " + urlFieldValue);
	Ti.API.info("topicFieldValue is " + topicFieldValue);

  var OperationsTableData = require('ui/operations/OperationsTableData').OperationsTableData;
  var operationsTableData = new OperationsTableData(urlFieldValue, topicFieldValue);

  appWindowntableView.setData(operationsTableData);
}


exports.AppConfigTableData = AppConfigTableData;
