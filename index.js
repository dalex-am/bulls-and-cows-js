function startGame() {
	var randomNumber = []
	document.getElementById("delete").setAttribute("disabled", true)
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
	document.getElementById(`delete`).setAttribute("disabled", true)
}

function inputNumbers(digit) {
	setText("Введите число")
	if ( INPUT_DEFAULT.indexOf(digit.toString()) >= 0 ) {
		return ''
	}
	if (digit === 10) {
		let lastDigit = INPUT_DEFAULT[COUNT_OF_INPUT-1]
		document.getElementById(`num${lastDigit}`).removeAttribute("disabled")
		COUNT_OF_INPUT--
		INPUT_DEFAULT[COUNT_OF_INPUT] = 'X'
		if (COUNT_OF_INPUT === 0) {
			document.getElementById("delete").setAttribute("disabled", true)
			document.getElementById("num0").setAttribute("disabled", true)
		}
	} else {
		INPUT_DEFAULT[COUNT_OF_INPUT] = digit.toString()
		COUNT_OF_INPUT++
			if (COUNT_OF_INPUT === 1) {
				document.getElementById("num0").removeAttribute("disabled")
			}
		document.getElementById(`num${digit}`).setAttribute("disabled", true)
		document.getElementById("delete").removeAttribute("disabled")
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
		document.getElementById("errors-and-results").innerHTML = (`Быков: ${bulls}, коров: ${cows}`)
	}
	for (let index = 1; index < 10; index++) {
		document.getElementById(`num${index}`).removeAttribute("disabled")
	}
	document.getElementById("delete").setAttribute("disabled", true)
	document.getElementById("num0").setAttribute("disabled", true)
	let list = document.getElementById("list")
	list.innerHTML+= (`<p>${ATTEMPT}. ${correctInput(INPUT_DEFAULT)} - быков: ${bulls}, коров: ${cows}</p>`)
	list.scrollTop = list.scrollHeight
		if (bulls === 4) {
		list.innerHTML+= (`<p>Победа!</p>`)
		setText("Победа!")
		list.scrollTop = list.scrollHeight
		disableAll()
	}
	INPUT_DEFAULT = ["X", "X", "X", "X"]
	COUNT_OF_INPUT = 0
}

function quit() {
	disableAll()
	setText(`${correctInput(NUMBER)}`)
	document.getElementById("quitBtn").setAttribute("disabled", true)
	let list = document.getElementById("list")
	list.innerHTML+= (`<p>Ответ: ${correctInput(NUMBER)}</p>`)
	list.scrollTop = list.scrollHeight

}

let ATTEMPT = 0
let INPUT_DEFAULT = ["X", "X", "X", "X"]
let COUNT_OF_INPUT = 0
let NUMBER = startGame()

addEventListener("keydown", function(event) {
    if (event.keyCode === 49) {inputNumbers(1)}
    if (event.keyCode === 50) {inputNumbers(2)}
    if (event.keyCode === 51) {inputNumbers(3)}
    if (event.keyCode === 52) {inputNumbers(4)}
    if (event.keyCode === 53) {inputNumbers(5)}
    if (event.keyCode === 54) {inputNumbers(6)}
    if (event.keyCode === 55) {inputNumbers(7)}
    if (event.keyCode === 56) {inputNumbers(8)}
    if (event.keyCode === 57) {inputNumbers(9)}
    if (event.keyCode === 48) {inputNumbers(0)}
    if (event.keyCode === 8) {inputNumbers(10)}
    if (event.keyCode === 27) {quit()}
  });