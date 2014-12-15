module.exports = function(id, cb) {

	this.call("/wallpaper/"+id+"/", cb);
}
