
var chessBoard = [];
var player = true;
var over = false;

var victory = [];
var playerWin = [];
var computerWin = [];

//create table
for(var i=0; i<15; i++) {
	chessBoard[i] = [];
	for(var j=0; j<15; j++) {
		chessBoard[i][j] = 0;
	}
}

//check win
for(var i=0; i<15; i++) {
	victory[i] = [];
	for(var j=0; j<15; j++) {
		victory[i][j] = [];
	}
}

var victoryCount = 0;
//check win row
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++) {
		for(var k=0; k<5; k++) {
			victory[i][j+k][victoryCount] = true;
		}
		victoryCount++;
	}
}
//check win col
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++) {
		for(var k=0; k<5; k++) {
			victory[j+k][i][victoryCount] = true;
		}
		victoryCount++;
	}
}
//X 0 0 0 0
//0 X 0 0 0
//0 0 X 0 0
//0 0 0 X 0
//0 0 0 0 X

for(var i=0; i<11; i++){
	for(var j=0; j<11; j++) {
		for(var k=0; k<5; k++) {
			victory[i+k][j+k][victoryCount] = true;
		}
		victoryCount++;
	}
}
//0 0 0 0 X
//0 0 0 X 0
//0 0 X 0 0
//0 X 0 0 0
//X 0 0 0 0

for(var i=0; i<11; i++){
	for(var j=14; j>3; j--) {
		for(var k=0; k<5; k++) {
			victory[i+k][j-k][victoryCount] = true;
		}
		victoryCount++;
	}
}


for (var i=0; i<victoryCount; i++) {
	playerWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById("chess");
var HvsH = document.getElementById("HvsH");
var HvsC = document.getElementById("HvsC");
var reloadPlay = document.getElementById("reloadPlay");
var context = chess.getContext("2d");

var playType = 0;

context.strokeStyle = "#black";

var board = new Image();
board.src = "image/woodboard.jpg";
board.onload = function() {
	context.drawImage(board, 0, 0, 450, 450);
	drawChessBoard();
}
//Draw board
var drawChessBoard = function() {
	for( i=0; i<15; i++) {
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30, 435);
		context.stroke();

		context.moveTo(15, 15 + i*30);
		context.lineTo(435, 15 + i*30);
		context.stroke();
	}
}


var CountH = function(x, y, who){
	var runL = true, runR = true;
	var countH = 1;
	var startx = x, starty = y, endx = x, endy = y;
	for (var i = 1; i <= 5; i++){
		//ngang pattern 1
		if (runL){
			if (chessBoard[x][y-i] == who){
				starty--;
				countH++;
			}
			else
				runL = false;
		}
		if (runR){
			if (chessBoard[x][y+i] == who){
				endy++;
				countH++;
			}
			else
				runR = false;
		}
	}
	if(countH >= 5){
		DrawWin(startx, starty, endx, endy);
	}
	return countH;
}
var CountV = function(x, y, who){
	var runU = true, runD = true;
	var countV = 1;
	var startx = x, starty = y, endx = x, endy = y;
	for (var i = 1; i <= 5; i++){
		//doc pattern 2
		if (runU){
			if (chessBoard[x-i][y] == who){
				startx--;
				countV++;
			}
			else
				runU = false;
		}
		if (runD){
			if (chessBoard[x+i][y] == who){
				endx--;
				countV++;
			}
			else
				runD = false;
		}
	}
	if(countV >= 5){
		DrawWin(startx, starty, endx, endy);
	}
	return countV;
}

var CountC1 = function(x, y, who){
	var runUC1 = true, runDC1 = true;
	var countC1 = 1;
	var startx = x, starty = y, endx = x, endy = y;
	for (var i = 1; i <= 5; i++){
		//cheo pattern 3
		if (runUC1){
			if (chessBoard[x - i][y - i] == who){
				startx--;
				starty--;
				countC1++;
			}
			else
				runUC1 = false;
		}
		if (runDC1){
			if (chessBoard[x + i][y + i] == who){
				endx++;
				endy++;
				countC1++;
			}
			else
				runDC1 = false;
		}
	}
	if(countC1 >= 5){
		DrawWin(startx, starty, endx, endy);
	}
	return countC1;
}

var CountC2 = function(x, y, who){
	var runUC2 = true, runDC2 = true;
	var countC2 = 1;
	var startx = x, starty = y, endx = x, endy = y;
	for (var i = 1; i <= 5; i++){
		//cheo pattern 4
		if (runUC2){
			if (chessBoard[x - i][y + i] == who){
				startx--;
				starty++;
				countC2++;
			}
			else
				runUC2 = false;
		}
		if (runDC2){
			if (chessBoard[x + i][y - i] == who){
				endx++;
				endy--;
				countC2++;
			}
			else
				runDC2 = false;
		}
	}
	if(countC2 >= 5){
		DrawWin(startx, starty, endx, endy);
	}
	return countC2;
}

var CheckWin = function(x, y, who){
	//kiem tra
	if (CountH(x, y, who) >= 5 ||CountV(x, y, who) >= 5 ||CountC1(x, y, who) >= 5 ||CountC2(x, y, who) >= 5)
		return who == 1 ? 1:2;
	return 3;
}

//Draw pawn
var DrawWin=function(x1,y1,x2,y2){
	context.beginPath();
	context.strokeStyle = "#ff0000";
	context.moveTo(15 + x1*30, 15+y1*30);
	context.lineTo(15 + x2*30, 15+y2*30);
	context.lineWidth=2;
	context.stroke();
	context.closePath();
}

var oneStep = function(i, j, player) {
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 -2, 13, 15 + i*30 + 2, 15 + j*30 -2, 0);
	if(player) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}
//detect action click
chess.onclick =  function(e) {
	if(over) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(player){
		if(chessBoard[i][j] == 0) {
			oneStep(i, j, player);
			chessBoard[i][j] = 1;
			for(var k=0; k<victoryCount; k++) {
				if(victory[i][j][k]) {
					playerWin[k]++;
					computerWin[k] = 6;
					if(playerWin[k] == 5) {
						document.getElementById("notify").innerHTML="Player 1 Win";
						over = true;
						CheckWin(i,j, 1);
					}
				}
			}
			if(!over) {
				player = !player;
				if(playType == 1){
					computerAI();
				}
			}
		}
	} else{
		if(chessBoard[i][j] == 0) {
			oneStep(i, j, player);
			chessBoard[i][j] = 2;
			for(var k=0; k<victoryCount; k++) {
				if(victory[i][j][k]) {
					computerWin[k]++;
					playerWin[k] = 6;
					if(computerWin[k] == 5) {
						document.getElementById("notify").innerHTML="Player 2 Win";
						over = true;
						CheckWin(i,j, 2);
					}
				}
			}
			if(!over) {
				player = !player;
			}
		}
	}
}

HvsH.onclick = function(e){
	document.getElementById("notify").innerHTML="Player is playing together";
	playType = 0;
}

HvsC.onclick = function(e){

	document.getElementById("notify").innerHTML="Player is playing with Computer";
	playType = 1;
}
reloadPlay.onclick = function(e){
	window.location.reload(true);
}

var computerAI = function() {
	var playerScore = [];
	var computerScore = [];
	var scoreMax = 0;
	var u = 0;
	var v = 0;
	for(var i=0; i<15; i++) {
		playerScore[i] = [];
		computerScore[i] = [];
		for(var j=0; j<15; j++) {
			playerScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i=0; i<15; i++) {
		for(var j=0; j<15; j++) {
			if(chessBoard[i][j] == 0) {
				for(var k=0; k<victoryCount; k++) {
					if(victory[i][j][k]) {
						if(playerWin[k] == 1) {
							playerScore[i][j] += 200;
						} else if(playerWin[k] == 2) {
							playerScore[i][j] += 400;
						} else if(playerWin[k] == 3) {
							playerScore[i][j] += 2000;
						} else if(playerWin[k] == 4) {
							playerScore[i][j] += 10000;
						}
						if(computerWin[k] == 1) {
							computerScore[i][j] += 220;
						} else if(computerWin[k] == 2) {
							computerScore[i][j] += 420;
						} else if(computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						} else if(computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if(playerScore[i][j] > scoreMax) {
					scoreMax = playerScore[i][j];
					u = i;
					v = j;
				} else if(playerScore[i][j] = scoreMax) {
					if(computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > scoreMax) {
					scoreMax = computerScore[i][j];
					u = i;
					v = j;
				} else if(computerScore[i][j] = scoreMax) {
					if(playerScore[i][j] > playerScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for(var k=0; k<victoryCount; k++) {
		if(victory[u][v][k]) {
			computerWin[k]++;
			playerWin[k] = 6;
			if(computerWin[k] == 5) {
				document.getElementById("notify").innerHTML="Computer Win";
				over = true;
				CheckWin(u,v, 2);
			}
		}
	}
	if(!over) {
		player = !player;
	}
}
