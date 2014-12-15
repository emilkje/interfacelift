module.exports = function(id, cb) {

	// These code snippets use an open-source library. http://unirest.io/nodejs
	this.call("/camera/"+id+"/", cb);
}
