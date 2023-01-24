'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🌀'

const gGame = {
  score: 0,
  isOn: false,
  foodCount: 0,
}
var gBoard

function init() {
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  craeteCherry()

  renderBoard(gBoard, '.board-container')
  gGame.isOn = true
  updateScore(-1 * gGame.score)

  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD
      gGame.foodCount++

      if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
        board[i][j] = WALL
        gGame.foodCount--
      }
    }
  }

  //Super Food
  board[1][1] = SUPER_FOOD
  board[1][board[1].length - 2] = SUPER_FOOD
  board[board.length - 2][1] = SUPER_FOOD
  board[board.length - 2][board.length - 2] = SUPER_FOOD

  //Remove Packman location from food count
  gGame.foodCount--
  console.log(`food count set to:  ${gGame.foodCount}`)

  return board
}

function updateScore(diff) {
  // TODO: update model and dom
  // Model
  gGame.score += diff

  // DOM
  const elScore = document.querySelector('span')
  elScore.innerText = gGame.score
}

function gameOver(isVictory = false) {
  console.log(`Game Over isVictory ${isVictory}`)
  var elUserMsg = document.querySelector('.user-msg')
  elUserMsg.innerText = isVictory ? 'Great Job, You won!' : "Lost this round, but the game isn't over yet."

  // TODO
  gGame.isOn = false

  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
}
