// dom select function
const $ = (dom) => document.querySelector(dom)
const $$ = (doms) => document.querySelectorAll(doms)

const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = $$('[data-cell]')
const winningMessageText = $('[data-winning-message-text]')
const winningMessageElement = $('#winningMessage')
const board = $('#board')
const restart = $('#restartButton')

const WINNING_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  
  [0,3,6],
  [1,4,7],
  [2,5,8],
  
  [0,4,8],
  [2,4,6]
  ]
  
let circleTurn

startGame()

function startGame() {
  
  circleTurn = false
  cellElements.forEach((cell)=> {
    cell.classList.remove(O_CLASS)
    cell.classList.remove(X_CLASS)
    cell.removeEventListener('click', handleClick)
    // once: true, for event only happens once and not for the second click, except for the other cell
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardClassHover()
  winningMessageElement.classList.remove('show')
  
}

function endGame(draw) {
  if(draw){
    winningMessageText.innerText = `Draw`
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} wins`
  }
  winningMessageElement.classList.add('show')
}

restart.addEventListener('click',startGame)

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
           cell.classList.contains(O_CLASS)
  })
}   
function handleClick (e) {
  const cell = e.target
  const currentClass = circleTurn ? O_CLASS : X_CLASS
  
  // place mark
  placeMark(cell, currentClass)
  
  // check win
  if(checkWin(currentClass)){
    endGame(false)
  } else if(isDraw()){
    // check draw
    endGame(true)
  } else {
    // Switch turn
    swapTurns()
    setBoardClassHover()
  }

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardClassHover() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  circleTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS) 
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some( combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}