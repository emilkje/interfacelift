module.exports = function(id, cb) {

	this.call("/tag/"+id+"/", cb);
}
