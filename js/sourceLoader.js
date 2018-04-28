var sourceLoader = {
	source:{},
	sourceNum:0,
	loadedNum:0,
	load: function(type, src, id){
		sourceLoader.sourceNum ++;
		 function loadedEnd(){
		 	sourceLoader.loadedNum ++;

		 }
		 if (type == "img"){
		 	var img = new Image();
		 	img.src = src;
		 	img.onload = loadedEnd;
		 	sourceLoader.source[id] = img

		 }
		 else if(type == "js"){
		 	var script = document.createElement("script");
		 	script.src = src;
		 	var head = document.querySelector("head");
		 	head.appendChild(script);
		 	script.onload = loadedEnd;
		 }
	},
	loadingEnd: function(callback){
		if (sourceLoader.sourceNum != sourceLoader.loadedNum){
			setTimeout(function(){
				sourceLoader.loadingEnd(callback);
			},30);
			return;
		} else {
			callback();
			return;
		}
	}

}