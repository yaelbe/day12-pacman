'use strict'

const GHOST = '&#9781'
var gGhosts
var gDieingGhost = []

var gIntervalGhosts

function createGhosts(board) {
  // TODO: 3 ghosts and an interval
  clearInterval(gIntervalGhosts)
  gGhosts = []
  for (var i = 0; i < 3; i++) {
    createGhost(board)
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
  // TODO: set arbitrary start pos & currCellContent
  var ghost = {
    location: { i: 3, j: 3 },
    currCellContent: FOOD,
    color: getRandomColor(),
  }
  gGhosts.push(ghost)
  board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
  // TODO: loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(i)
  }
}

function moveGhost(idx) {
  let ghost = gGhosts[idx]
  // TODO: figure out moveDiff, nextLocation, nextCell

  const nextLocation = { i: ghost.location.i, j: ghost.location.j }
  // const nextLocation = ghost.location // This is Wrong!
  const diff = getMoveDiff()

  nextLocation.i += diff.i
  nextLocation.j += diff.j

  var nextCellContent = gBoard[nextLocation.i][nextLocation.j]
  // TODO: return if cannot move

  if (nextCellContent === WALL || nextCellContent === GHOST) return
  // TODO: hitting a pacman? call gameOver

  if (nextCellContent === PACMAN) {
    if (gPacman.isSuper) {
      gDieingGhost.push(...gGhosts.splice(idx, 1))
      return
      // if (ghost.currCellContent === FOOD) {
      //   gGame.foodCount--
      //   console.log(`Kill Ghost and take the food food count ${gGame.foodCount}`)
      // }
    } else {
      gameOver()
      return
    }
  }

  // TODO: moving from current location:
  // TODO: update the model (restore prev cell contents)

  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

  // TODO: update the DOM

  renderCell(ghost.location, ghost.currCellContent)

  // TODO: Move the ghost to new location:
  // TODO: update the model (save cell contents so we can restore later)

  ghost.location = nextLocation
  ghost.currCellContent = nextCellContent
  gBoard[ghost.location.i][ghost.location.j] = GHOST

  // TODO: update the DOM

  renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4)

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }
    case 2:
      return { i: 1, j: 0 }
    case 3:
      return { i: 0, j: -1 }
    case 4:
      return { i: -1, j: 0 }
  }
}
function reviveGhosts() {
  gGhosts = gGhosts.concat(gDieingGhost)
}

function getGhostHTML(ghost) {
  let color = gPacman.isSuper ? 'blue' : ghost.color
  return `<span style="color:${color}">${GHOST}</span>`
}
