module.exports = function(id, cb) {

	this.call("/comment/"+id+"/", cb);
}
