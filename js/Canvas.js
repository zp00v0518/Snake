function Canvas (id){
	this[id] = document.getElementById(id);
	this.ctx = this[id].getContext("2d");
	this.setSize = function(width, height){
		this[id].width = width;
		this[id].height = height;
		this.width = width;
		this.height = height;
	}
	this.width = 0;
	this.height = 0;
	this.clear = function(){
		this.ctx.clearRect(0,0,this.width, this.height);
	}
}