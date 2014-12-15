module.exports = function(id, cb) {

	this.call("/lens/"+id+"/", cb);
}
