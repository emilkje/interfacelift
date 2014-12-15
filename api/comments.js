module.exports = function(options, cb) {

	var options = options || {};

	if(!options.user_id && !options.wallpaper_id) {
		throw new Error('Invalid argument: missing user_id and/or wallpaper_id');
	}

	options.limit = options.limit || 10;
	options.sort_order = options.sort_order || "asc";
	options.start = options.start || 0;
	options.user_id = options.user_id || '';
	options.wallpaper_id = options.wallpaper_id || '';

	// These code snippets use an open-source library. http://unirest.io/nodejs
	this.call("/comments/?limit="+options.limit+"&sort_order="+options.sort_order+"&start="+options.start+"&user_id="+options.user_id+"&wallpaper_id="+options.wallpaper_id, cb);
}