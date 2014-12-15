module.exports = function(optionsOrCb, cb) {
	
	if(typeof optionsOrCb == "function")
		var cb = optionsOrCb;
	else
		var options = optionsOrCb;

	var options = options || {};
	options.limit = options.limit || 10;
	options.start = options.start || 0;
	options.user_id = options.user_id ? "&user_id="+options.user_id : '';
	console.log(options);
	this.call("/submissions/?limit="+options.limit+"&start="+options.start+options.user_id, cb);
}