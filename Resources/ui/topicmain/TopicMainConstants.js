//TopicMainConstants Singleton Constructor
var TopicMainConstants = (function() {

  function TEXT_FIELD_LABEL_HEIGHT_PERCENT() {
		return 10;
	};

	function NUM_SIMILAR_ROW_ELEMENTS_ON_PAGE() {
		return 2;
	};

	return {
    TEXT_FIELD_LABEL_HEIGHT_PERCENT:TEXT_FIELD_LABEL_HEIGHT_PERCENT,
		NUM_SIMILAR_ROW_ELEMENTS_ON_PAGE:NUM_SIMILAR_ROW_ELEMENTS_ON_PAGE,
	};
})();

exports.TopicMainConstants = TopicMainConstants;
