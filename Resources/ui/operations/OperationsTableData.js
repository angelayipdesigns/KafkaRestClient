// OperationsTableData Component Constructor

// We may update this after this are persisted. A cache should also be used when
// adding edit for url and topic
//function OperationsTableData () {
function OperationsTableData () {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var OC = require('ui/operations/OperationsConstants').OperationsConstants;

	var KafkaRestController = require('controllers/kafkarest/KafkaRestController').KafkaRestController;
	var kafkaRestController = new KafkaRestController();

	var tableData = [];

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var appConfigHeaderRowView =
        appHeaderRowView.getBasicHeaderRowView(UIC.KAFKA_REST_CLIENT(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, true);
  tableData.push(appConfigHeaderRowView);

	//var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	//var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);

	var ProduceRowView = require('ui/operations/ProduceRowView').ProduceRowView;
	var ConsumeRowView = require('ui/operations/ConsumeRowView').ConsumeRowView;
	var ConsumerGroupRowView = require('ui/operations/ConsumerGroupRowView').ConsumerGroupRowView;

	var buttonWidth = displayValueUtil.getProportionalObjectWidth(4, true);
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

	return tableData;
}

function executeProduceClickEvent(kafkaRestController, message) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	kafkaRestController.produce(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic(), message);
};

function executeConsumeClickEvent(kafkaRestController, consumerGroupPrefix) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	kafkaRestController.consume(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic(), consumerGroupPrefix);
};

function executeCreateInstClickEvent(kafkaRestController, consumerGroupPrefix) {
	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	kafkaRestController.createConsumerInstance(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic(), consumerGroupPrefix);
};


exports.OperationsTableData = OperationsTableData;
