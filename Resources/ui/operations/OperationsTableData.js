// OperationsTableData Component Constructor

function OperationsTableData (operationsWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController();

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, true);
  tableData.push(appConfigHeaderRowView);

	var ProduceRowView = require('ui/operations/ProduceRowView').ProduceRowView;
	var ConsumeRowView = require('ui/operations/ConsumeRowView').ConsumeRowView;
	var ConsumerGroupRowView = require('ui/operations/ConsumerGroupRowView').ConsumerGroupRowView;

	var buttonWidth = displayValueUtil.getProportionalObjectWidth(3, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//var buttonHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var buttonHeight = displayValueUtil.getRelativeHeight(2*OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());

	var consumeRowView = new ConsumeRowView(displayValueUtil);
  tableData.push(consumeRowView.getConsumeRowView());

  var consumerGroupRowView = new ConsumerGroupRowView(displayValueUtil);
	tableData.push(consumerGroupRowView.getConsumerGroupRowView());

	var consumeButtonViewRow = Titanium.UI.createTableViewRow();
  var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
	var createInstButton = new ActionButton("Create Inst", buttonHeight, buttonWidth + 0.3*buttonWidth, buttonBorderWidth, 0);
	createInstButton.addEventListener('click', function(e) {
		var consumerGroupPrefix = consumerGroupRowView.getConsumerGroupPrefixTextField();
		executeCreateInstClickEvent(kafkaRestController, consumerGroupPrefix);
	});
	consumeButtonViewRow.add(createInstButton);

	var receiveButton = new ActionButton("Get It", buttonHeight, buttonWidth, buttonBorderWidth, 2);
	receiveButton.addEventListener('click', function(e) {
		var consumerGroupPrefix = consumerGroupRowView.getConsumerGroupPrefixTextField();
		executeConsumeClickEvent(kafkaRestController, consumerGroupPrefix);
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

  var buttonViewRow = Titanium.UI.createTableViewRow();

  var cancelButtonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var cancelButtonHeight = cancelButtonWidth;
	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
  var cancelButton = new CancelButton(cancelButtonHeight, cancelButtonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function(e) {
	  operationsWindow.close();
		operationsWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);

	return tableData;
}

function executeProduceClickEvent(kafkaRestController, message) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaRestController.produce(kafkaConfigsCache.getKafkaRestURL(), kafkaConfigsCache.getKafkaTopic(), message);
};

function executeConsumeClickEvent(kafkaRestController, consumerGroupPrefix) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaRestController.consume(kafkaConfigsCache.getKafkaRestURL(), kafkaConfigsCache.getKafkaTopic(), consumerGroupPrefix);
};

function executeCreateInstClickEvent(kafkaRestController, consumerGroupPrefix) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	kafkaRestController.createConsumerInstance(kafkaConfigsCache.getKafkaRestURL(), kafkaConfigsCache.getKafkaTopic(), consumerGroupPrefix);
};


exports.OperationsTableData = OperationsTableData;
