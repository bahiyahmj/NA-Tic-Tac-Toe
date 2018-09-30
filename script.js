function startGame() {
	for (var i = 1; i <= 9; i++) {
		clearBox(i);
	}
	initScore();
	document.turn = "X";
	document.winner = null;
	setMessage("Ready player " + document.turn + "  ?");
}

// messages that appear
function setMessage(msg) {
	document.getElementById("message").innerText = msg;
}

// when player makes an invalid move
function nextMove(square) {
	if (document.winner != null) {
		setMessage("Hey " + document.turn + ", you've won. Play again?");
	} else if (square.innerText == '') {
		square.innerText = document.turn;
		switchTurn();
	} else {
		setMessage("Error! Invalid move.");
	}
}

// switching player move
function switchTurn() {
	if (checkForWinner(document.turn)) {
		// save data and don't forget to add with int and not string. it will be concatenate if it is string.
		if (document.turn == "X") {
			localStorage.setItem("X",  parseInt(localStorage.getItem("X")) + 1);
		}
		else if (document.turn == "O") {
			localStorage.setItem("O",  parseInt(localStorage.getItem("O")) + 1);
		}
		// change score after save value
		initScore();

		window.alert("Good job " + document.turn + " ! You won!");
		setMessage("Congratulations " + document.turn + " ! You won!");
		document.winner = document.turn;
	} else if (checkForTie()) {
		// save data
		localStorage.setItem("Tied",  parseInt(localStorage.getItem("Tied")) + 1);
		// change score after save value
		initScore();

		window.alert("It's a TIE game!");
		setMessage("It was a TIE. Play again?");
	} else if (document.turn == "X") {
		document.turn = "O";
		setMessage(document.turn + " make a move");
	} else {
		document.turn = "X";
		setMessage(document.turn + " make a move");
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
		result = true;
	}
	return result;
}

function checkRow(a, b, c, move) {
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
		if (getBox(i) == "")
			return false
	}
	return true;
}

function initScore() {
	// load data
	var x_score = localStorage.getItem("X");
	var tied = localStorage.getItem("Tied");
	var o_score = localStorage.getItem("O");

	// get storage for x if available and reset if unavailable
	if (x_score != null) {
		document.getElementById("playerXScore").innerHTML = "Player X : " + x_score;
	}
	else {
		localStorage.setItem("X", 0);
	}
	// get storage for tied if available and reset if unavailable
	if (tied != null) {
		document.getElementById("tiedScore").innerHTML = "Tied : " + tied;
	}
	else {
		localStorage.setItem("Tied", 0);
	}
	// get storage for o if available and reset if unavailable
	if (o_score != null) {
		document.getElementById("playerOScore").innerHTML = "Player O : " + o_score;
	}
	else {
		localStorage.setItem("O", 0);
	}
}

// you can create button to reset the score
function reset () {
	localStorage.setItem("X", 0);
	localStorage.setItem("Tied", 0);
	localStorage.setItem("O", 0);
	console.log("Score reset! Please reload your page");
};