module.exports = function(id, cb) {

	this.call("/user/"+id+"/", cb);
}
