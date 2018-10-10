// OperationsTableData Component Constructor

// We may update this after this are persisted. A cache should also be used when
// adding edit for url and topic
//function OperationsTableData () {
function OperationsTableData (urlFieldValue, topicFieldValue) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController(urlFieldValue, topicFieldValue);

	var tableData = [];

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
  tableData.push(appConfigHeaderRowView);

	//var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	//var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);

	var ProduceRowView = require('ui/operations/ProduceRowView').ProduceRowView;
	var ConsumeRowView = require('ui/operations/ConsumeRowView').ConsumeRowView;

  // TODO: delete this, and the associated component
	//var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;

	var buttonWidth = displayValueUtil.getProportionalObjectWidth(4, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//var buttonHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var buttonHeight = displayValueUtil.getRelativeHeight(2*OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());

	var consumeRowView = new ConsumeRowView(displayValueUtil);
  tableData.push(consumeRowView.getConsumeRowView());

	var consumeButtonViewRow = Titanium.UI.createTableViewRow();
  var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
	var createInstButton = new ActionButton("Create Inst", buttonHeight, buttonWidth + 0.3*buttonWidth, buttonBorderWidth, 0);
	createInstButton.addEventListener('click', function(e) {
		executeCreateInstClickEvent(kafkaRestController);
	});
	consumeButtonViewRow.add(createInstButton);

	var receiveButton = new ActionButton("Get It", buttonHeight, buttonWidth, buttonBorderWidth, 2);
	receiveButton.addEventListener('click', function(e) {
		executeConsumeClickEvent(kafkaRestController);
	});
	consumeButtonViewRow.add(receiveButton);

	tableData.push(consumeButtonViewRow);

  var produceRowView = new ProduceRowView(displayValueUtil);
	tableData.push(produceRowView.getProduceRowView());

	var produceButtonViewRow = Titanium.UI.createTableViewRow();
	var sendButton = new ActionButton("Send It", buttonHeight, buttonWidth, buttonBorderWidth, 0);

  // set a default message
	produceRowView.setProduceTextField("This message will be produced");

	sendButton.addEventListener('click', function(e) {
		var topicFieldValue = produceRowView.getProduceTextField();
		executeProduceClickEvent(kafkaRestController, produceRowView.getProduceTextField());
	});
	produceButtonViewRow.add(sendButton);
	tableData.push(produceButtonViewRow);

	return tableData;
}

function executeProduceClickEvent(kafkaRestController, message) {
  // TODO: remove this debug log
	Ti.API.info("executing produce click event, message is " + message);

	kafkaRestController.produce(message);
};

function executeConsumeClickEvent(kafkaRestController) {
	// TODO: remove this debug log
	Ti.API.info("executing consume click event");

	kafkaRestController.consume();
};

function executeCreateInstClickEvent(kafkaRestController) {
  // TODO: remove this debug log
	Ti.API.info("executing create inst click event");

	kafkaRestController.createConsumerInstance();
};


exports.OperationsTableData = OperationsTableData;
