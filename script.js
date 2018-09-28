function startGame() {
	for(var i = 1; i <= 9; i++) {
		clearBox(i);
	}
	document.turn = "X";
	document.winner = null;
	setMessage("Ready player " + document.turn + "  ?")
}

// messages that appear
function setMessage(msg){
	document.getElementById("message").innerText = msg;
}

// when player makes an invalid move
function nextMove(square) {
	if (document.winner != null) {
		setMessage("Hey " + document.turn + ", you've won. Play again?")
	} else if (square.innerText == '') {
	square.innerText = document.turn;
	switchTurn();
	} else {
		setMessage("Error! Invalid move.")
	}
}

// switching player move
function switchTurn() {
	if (checkForWinner(document.turn)) {
		window.alert("Good job " + document.turn + " ! You won!")
		setMessage("Congratulations " + document.turn + " ! You won!")
		document.winner = document.turn;
	} else if (checkForTie()) {
		window.alert("It's a TIE game!");
		setMessage("It was a TIE. Play again?");
	} else if (document.turn == "X") {
		document.turn = "O";
		setMessage(document.turn + " make a move")
	} else {
		document.turn = "X";
		setMessage(document.turn + " make a move")
	}
}

// winning possibilities
function checkForWinner(move) {
	var result = false;
	if (checkRow(1, 2, 3, move) ||
		checkRow(4, 5, 6, move) ||
		checkRow(7, 8, 9, move) ||
		checkRow(1, 4, 7, move) ||
		checkRow(2, 5, 8, move) ||
		checkRow(3, 6, 9, move) ||
		checkRow(1, 5, 9, move) ||
		checkRow(3, 5, 7, move)) {
		result=true;
	}
	return result;
}

function checkRow(a, b, c, move){
	var result = false;
	if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
		result = true;
	}
	return result;
}

function getBox(number) {
	return document.getElementById("s" + number).innerText;
}

// box clear when restart
function clearBox(number) {
	document.getElementById("s" + number).innerText = "";
}

// if the game is tie
function checkForTie() {
	for (var i = 1; i < 10; i++) {
		if (getBox(i)=="")
			return false
	}
	return true;
}