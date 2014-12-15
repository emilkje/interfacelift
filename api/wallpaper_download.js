var request = require('request'),
	fs 		= require('fs'),
	progress = require('progress-stream'),
	_ 		= require('underscore');

module.exports = function(idOrOptions, cb) {
	
	var options = {};
	var self = this;
	
	if(typeof idOrOptions == "object")
		options = idOrOptions;
	else
		options.id = idOrOptions;

	options.resolution = options.resolution || '1920x1080';

	if(!options.id)
		throw new Error("Missing parameter/option wallpaper 'id'");

	this.call("/wallpaper_download/"+options.id+"/"+options.resolution+"/", function(res){

		// Merge stream object targeting download_url for easy download

		var options = {
			url: res.download_url,
			headers: {'X-Mashape-Key': self.key}
		};

		var stream = request(options);
		stream = _.extend(stream, res);

		// Pause the stream to prevent automatic download
		stream.pause();

		// Helper method to simplify file download
		stream.download = function(path, fn) {
			var writer = fs.createWriteStream(path);
			var reader = fs.createReadStream(path);
			
			//prepare progress
			var str = progress({});

			var me = this;

			//Attach the stream to the writer and progress emitter
			this.pipe(str).pipe(writer);

			this.on('conviction', function(length){
				str.setLength(length);
			});

			str.on('progress', function(p){
				me.emit('progress', p);
			});
			
			//Return the read-stream when finished downloading
			this.on('end', function(){
				fn(reader);
			});
			
			//Initiate the download
			this.resume();
		}

		// Return the extended stream object to the user
		if(typeof cb == "function")
			cb(stream);
	});
}
