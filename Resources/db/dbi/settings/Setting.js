//Setting Component Constructor
function Setting (name, value, description) {
    this.name = name;
    this.value = value;
    this.description = description;
}

Setting.prototype.getName = function(){
	return this.name;
};

Setting.prototype.setName = function(name) {
    this.name = name;
};

Setting.prototype.getValue = function(){
	return this.value;
};

Setting.prototype.setValue = function(value) {
    this.value = value;
};

Setting.prototype.getDescription = function(){
	return this.description;
};

Setting.prototype.setDescription = function(description) {
    this.description = description;
};


exports.Setting = Setting;