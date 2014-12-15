module.exports = function(q, cbOrType, cb) {

	var type = "Scene";
	var callback = function(){};

	if(typeof cbOrType == "function") {
		callback = cbOrType;
	} else {
		type = cbOrType ? cbOrType : type;
		callback = typeof cb == "function" ? cb : callback;
	}


	this.call("/tags/?search="+q+"&type="+type, cb);
}
