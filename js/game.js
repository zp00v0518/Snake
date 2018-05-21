sourceLoader.load("js","js/Canvas.js");
sourceLoader.load("js","js/Keys.js");

window.addEventListener("keydown", changeWay);
// window.addEventListener("keypress", changeWay);

let canvas,
	Snake = [],
	Food = [],
	timerId = 0,
	widthBody = 15,
	heightBody = 15,
	speed = 100,
	startBodySnake = 1,
	sumWidthFeild = 50,
	sumHeightFeild = 25;

sourceLoader.loadingEnd(function(){
	canvas = new Canvas("canvas");
	canvas.setSize(widthBody*sumWidthFeild, heightBody*sumHeightFeild);
	canvas.canvas.style.border = "1px solid";
	createStartSnake(startBodySnake)
	
});

function SectionSnake(x,y,color){
	this.width = widthBody;
	this.height = heightBody;
	this.posX = (x == 0)? 0 : x || 0;
	this.posY = (y == 0)? 0: y || 0;
	this.color = color || "blue"
}

function createStartSnake(sumSection, startX, startY){
	let sum = sumSection || 1,
		snakeSection = new SectionSnake();
		Snake.push(snakeSection);
	let x = Snake[0].posX;
	let	y = Snake[0].posY;
		for (let i=1; i<=sum; i++){
			x +=Snake[0].width;
			var section = new SectionSnake(x,y);
			Snake.push(section);
		}
	drawSnakeSection();
	getRandomPosition();
};

function changeWay(event){
	let code = event.keyCode;
	let key = event.key;
	if (key == "ArrowRight"){
		if (Keys.nowPressName == "ArrowLeft" || Keys.nowPressName == "ArrowRight"){
			return;
		}
		Keys.nowPressCode = code;
		Keys.nowPressName = key;
		moveSnake("right");
	}
	else if (key == "ArrowLeft"){
		if (Keys.nowPressName == "ArrowRight"|| Keys.nowPressName == "ArrowLeft"){
			return;
		}
		Keys.nowPressCode = code;
		Keys.nowPressName = key;
		moveSnake("left");
	}
	else if (key == "ArrowDown"){
		if (Keys.nowPressName == "ArrowUp" || Keys.nowPressName == "ArrowDown"){
			return;
		}
		Keys.nowPressCode = code;
		Keys.nowPressName = key;
		moveSnake("down");
	}
	else if (key == "ArrowUp"){
			if (Keys.nowPressName == "ArrowDown" || Keys.nowPressName == "ArrowUp"){
			return;
		}
		Keys.nowPressCode = code;
		Keys.nowPressName = key;
		moveSnake("up");
	}
	else if (key == "Control"){
		clearInterval(timerId);
	}

}

function moveSnake(way){
	clearInterval(timerId);
	timerId= setInterval(function(){
	addSnakeSection(way,function(){
		drawSnakeSection()
			});
	},speed)
}

function addSnakeSection(way,callback){ 
	let thisCallback = callback || function(){};
	let i = Snake.length-1;
	let section = Snake[i];
	let posX = section.posX;
	let posY = section.posY;
	if (way == "right"){
		posX = posX+section.width;
		if (posX >= canvas.width){
			posX = 0;
		}
	}
	else if (way == "left"){
		posX = posX-section.width;
			if (posX < 0){
				posX = canvas.width;
		}
	}
	else if (way == "down"){
		posY = posY+section.height;

			if (posY >= canvas.height){
			posY = 0;
		}
	}
	else if (way == "up"){
		posY = posY-section.height;
			if (posY < 0){
			posY = canvas.height;
		}
	}

	var snakeSection = new SectionSnake(posX, posY);
	checkCrash(snakeSection, function(){
		checkEatFood(snakeSection);
		Snake.push(snakeSection);
		return thisCallback();
	})

}
function drawSnakeSection(){
	let i = Snake.length-1;
	let section = Snake[i];
	canvas.ctx.fillStyle = section.color;
	canvas.ctx.fillRect(section.posX, section.posY, section.width, section.height);

	clearSnakeSection();
}
function clearSnakeSection(){
	let section = Snake[0];
	canvas.ctx.fillStyle = "white";
	canvas.ctx.fillRect(section.posX, section.posY, section.width, section.height);
	Snake.shift();
}

function checkCrash(snakeSection, callback){
	var x = snakeSection.posX;
	var y = snakeSection.posY;
	for (let i=0; i<Snake.length; i++){
		var startX = Snake[i].posX;
		var startY = Snake[i].posY;
		if (x == startX && y == startY ){
			gameOver();
			return;
			break;
		}

	}
	return callback();
}
function checkEatFood(snakeSection){
	var x = snakeSection.posX;
	var y = snakeSection.posY;
	if(x == Food.posX && y == Food.posY){
		Food.posX == Snake[0].posX;
		Food.posY == Snake[0].posY;
		Snake.push(Food);
		getRandomPosition();
		return;
	}
}

function getRandomPosition(){
	var x = Math.floor(Math.random()*sumWidthFeild)*widthBody;
	var y = Math.floor(Math.random()*sumHeightFeild)*heightBody;
	for (let i=0; i<Snake.length; i++){
		var startX = Snake[i].posX;
		var startY = Snake[i].posY;
		if (x == startX && y == startY ){
			getRandomPosition();
			return;
			break;
		}
	}

	drawFood(x,y);
}

function drawFood(x,y){
	Food = new SectionSnake(x,y,"red");
	canvas.ctx.fillStyle = Food.color;
	canvas.ctx.fillRect(Food.posX, Food.posY, Food.width, Food.height);
	
}

function gameOver(){
	clearInterval(timerId);
	alert("Вы проиграли");
	canvas.clear();
	Keys.nowPressName = "";
	Snake = [];
	createStartSnake();
}

