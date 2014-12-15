var request = require('request'),
	EventEmitter = require('events').EventEmitter,
	unirest = require('unirest');

function Client(key) {
	EventEmitter.call(this);
	this.key = key;
	this.base_uri = "https://interfacelift-interfacelift-wallpapers.p.mashape.com/v1";
};

Client.prototype = Object.create(EventEmitter.prototype);

Client.prototype.call = function(endpoint, cb){

	this.request(this.base_uri+endpoint, cb);
}

Client.prototype.request = function(url, cb) {
	this.emit('request.start', {url: url});
	var self = this;

	unirest.get(url)
	.header("X-Mashape-Key", this.key)
	.end(function (result) {
		if(result.status != 200) {
			self.emit('request.fail', result);
			return;
		}

		self.emit('request.complete');
		self.emit('request.success', result);
		if(typeof cb == "function")
			cb(result.body);
	});
}

Client.prototype.tag 		= require('./api/tag');
Client.prototype.tags 		= require('./api/tags');
Client.prototype.camera 	= require('./api/camera');
Client.prototype.lens 		= require('./api/lens');
Client.prototype.comment 	= require('./api/comment');
Client.prototype.comments 	= require('./api/comments');
Client.prototype.favorites 	= require('./api/favorites');
Client.prototype.submission = require('./api/submission');
Client.prototype.submission_download 	= require('./api/submission_download');
Client.prototype.submissions= require('./api/submissions');
Client.prototype.user 		= require('./api/user');
Client.prototype.wallpaper 	= require('./api/wallpaper');
Client.prototype.wallpapers = require('./api/wallpapers');
Client.prototype.wallpaper_download = require('./api/wallpaper_download');

exports = module.exports = Client;
