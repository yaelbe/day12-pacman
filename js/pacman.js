'use strict'

const PACMAN = '😷'
var TRANSFORM = 0
// const PACKMAN_IMAGE = '<img class="pacman" src="img/packman.png">'
var PACKMAN_IMAGE =
`<img src="img/packman.png" style="transform: rotate(${TRANSFORM}deg);"`

var gPacman

function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    location: { i: 3, j: 5 },
    isSuper: false,
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
  // TODO: use getNextLocation(), nextCell

  const nextLocation = getNextLocation(ev)

  // TODO: return if cannot move
  if (!nextLocation) return

  const nextCell = gBoard[nextLocation.i][nextLocation.j]
  if (nextCell === WALL) return

  // TODO: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      killGhost(nextLocation)
    } else {
      gameOver()
      return
    }
  }
  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    updateScore(1)
    gGame.foodCount--
  }

  if (nextCell === SUPER_FOOD) {
    gPacman.isSuper = true
    gGame.foodCount--

    setTimeout(() => {
      gPacman.isSuper = false
      reviveGhosts()
    }, 5000)
  }

  if (nextCell === CHERRY) {
    console.log('CHERRY')
    updateScore(10)
  }

  // TODO: moving from current location:
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY)

  // TODO: Move the pacman to new location:
  // TODO: update the model
  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

  // TODO: update the DOM
  renderCell(gPacman.location, getPackmanHTML())

  if (gGame.foodCount === 0) {
    gameOver(true)
  }
}
function killGhost(pos) {
  for (let i = 0; i < gGhosts.length; i++) {
    var currentGoust = gGhosts[i]
    if (currentGoust.location.i === pos.i && currentGoust.location.j === pos.j) {
      gGhosts.splice(i, 1)
      if (currentGoust.currCellContent === FOOD) {
        gGame.foodCount--
      }
      gDieingGhost.push(currentGoust)
    }
  }
}

function getNextLocation(eventKeyboard) {
  if (gGame.isOn === false) return

  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }
  // TODO: figure out nextLocation
  const elPacman = document.querySelector('.pacman')
  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--
      elPacman.style.transform = 'rorate(-90)'
      break
    case 'ArrowDown':
      nextLocation.i++
      TRANSFORM = 90
      break
    case 'ArrowLeft':
      nextLocation.j--
      TRANSFORM = 180
      break
    case 'ArrowRight':
      nextLocation.j++
      TRANSFORM = 0
      break

    default:
      return null
  }
  return nextLocation
}

function getPackmanHTML(ghost) {
  return `<img src="img/packman.png" style="transform: rotate(${TRANSFORM}deg);">`
}
