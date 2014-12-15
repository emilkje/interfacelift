var moment = require('moment');

module.exports = function(options, cb) {

	var options = options || {};

	if(typeof options == "function") {
		cb = options;
		options = {};
	}

	options.limit = options.limit || 10;
	options.resolution = options.resolution || '1920x1080';
	options.sort_by = options.sort_by || 'date';
	options.sort_order = options.sort_order || 'desc';
	options.start = options.start || 0;
	var tag = options.tag || false;
	options.tag = tag ? '&tag_id='+tag : '';

	if(!options.time) {
		this.call("/wallpapers/?limit="+options.limit+"&resolution="+options.resolution+"&sort_by="+options.sort_by+"&sort_order="+options.sort_order+"&start="+options.start+options.tag, cb);
		return;
	}

	options.timestamp = moment(new Date(options.time)) + "";
	options.direction = options.direction || 'newer';

	this.call("/wallpapersByTimestamp/?direction="+options.direction+"&limit="+options.limit+"&resolution="+options.resolution+"&timestamp="+options.timestamp.substring(0,10)+options.tag, cb);
	
}