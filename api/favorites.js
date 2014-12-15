module.exports = function(options, cb) {

	var options = typeof options == "object" ? options : {user_id: options};

	if(!options.user_id) {
		throw new Error('Invalid argument: missing user_id');
	}

	options.limit = options.limit || 10;
	options.sort_order = options.sort_order || "'asc'%2C+'desc'";
	options.sort_by = options.sort_by || "'date'%2C+'id'%2C+'favorites'%2C+'downloads'%2C+'comments'";
	options.start = options.start || 0;
	options.user_id = options.user_id || '';
	options.resolution = options.resolution || '1920x1080';

	// These code snippets use an open-source library. http://unirest.io/nodejs
	this.call("/favorites/"+options.user_id+"/?limit="+options.limit+"&resolution="+options.resolution+"&sort_by="+options.sort_by+"&sort_order="+options.sort_order+"&start="+options.start, cb);
}