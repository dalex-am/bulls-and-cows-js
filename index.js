function startGame() {
	var randomNumber = []
	document.getElementById("delBtn").setAttribute("disabled", true)
	document.getElementById("num0").setAttribute("disabled", true)

	while (true) {
		for (let index = 0; index < 4; index++) {
			let number = Math.round( -0.5 + Math.random() * 10)
			randomNumber[index] = number.toString()
		}
		if (randomNumber[0] === "0") {
			continue
		}
		let set = new Set(randomNumber)
		if (set.size === randomNumber.length) {
			break
		}
	}	
	console.log(randomNumber)
	setText("Число загадано")
	return randomNumber
}

function setText(text) {
	let elem = document.getElementById("errors-and-results")
	elem.innerHTML = text
}

function correctInput(numbers) {
	let correct = ''
	for (let index = 0; index < numbers.length; index++) {
		correct += numbers[index].toString()
	}
	return correct
}

function disableAll() {
	for (let index = 0; index < 10; index++) {
		document.getElementById(`num${index}`).setAttribute("disabled", true)
	}
	document.getElementById(`delBtn`).setAttribute("disabled", true)
}

function inputNumbers(digit) {
	setText("Введите число")
	if (digit === 10) {
		let lastDigit = INPUT_DEFAULT[COUNT_OF_INPUT-1]
		document.getElementById(`num${lastDigit}`).removeAttribute("disabled")
		COUNT_OF_INPUT--
		INPUT_DEFAULT[COUNT_OF_INPUT] = 'X'
		if (COUNT_OF_INPUT === 0) {
			document.getElementById("delBtn").setAttribute("disabled", true)
			document.getElementById("num0").setAttribute("disabled", true)
		}
	} else {
		INPUT_DEFAULT[COUNT_OF_INPUT] = digit.toString()
		COUNT_OF_INPUT++
			if (COUNT_OF_INPUT === 1) {
				document.getElementById("num0").removeAttribute("disabled")
			}
		document.getElementById(`num${digit}`).setAttribute("disabled", true)
		document.getElementById("delBtn").removeAttribute("disabled")
	}
	document.getElementById("input").innerHTML = correctInput(INPUT_DEFAULT)
	checkNumber()
}

function checkNumber() {
	let cows = 0
	let bulls = 0
	if (COUNT_OF_INPUT < 4) {
		return ''
	}
	if ( COUNT_OF_INPUT === 4 ) {
		for (let index = 0; index < 4; index++) {
			if ( INPUT_DEFAULT[index] === NUMBER[index] ) {bulls++} else {
				if ( NUMBER.indexOf(INPUT_DEFAULT[index]) >= 0 ) {cows++}
			}			
		}
		ATTEMPT++
		document.getElementById("errors-and-results").innerHTML = (`bulls: ${bulls}, cows: ${cows}`)
	}
	for (let index = 1; index < 10; index++) {
		document.getElementById(`num${index}`).removeAttribute("disabled")
	}
	document.getElementById("delBtn").setAttribute("disabled", true)
	document.getElementById("num0").setAttribute("disabled", true)
	document.getElementById("list").
		innerHTML+= (`<p>${ATTEMPT}. ${correctInput(INPUT_DEFAULT)} - bulls: ${bulls}, cows: ${cows}</p>`)
	if (bulls === 4) {
		document.getElementById("list").innerHTML+= (`<p>Победа!</p>`)
		setText("Победа!")
		disableAll()
	}
	INPUT_DEFAULT = ["X", "X", "X", "X"]
	COUNT_OF_INPUT = 0
}

let ATTEMPT = 0
let INPUT_DEFAULT = ["X", "X", "X", "X"]
let COUNT_OF_INPUT = 0
let NUMBER = startGame()

