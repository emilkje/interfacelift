var request = require('request'),
	fs 		= require('fs'),
	progress = require('progress-stream'),
	_ 		= require('underscore');

module.exports = function(submission_id, cb) {

	var self = this;
	
	this.call("/submission_download/"+submission_id+"/", function(res){

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