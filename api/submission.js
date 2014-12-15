module.exports = function(id, cb) {

	this.call("/submission/"+id+"/", cb);
}