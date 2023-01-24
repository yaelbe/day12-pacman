'use strict'

const CHERRY = '🍒'
var gCherryInterval

function craeteCherry() {
  gCherryInterval = setInterval(addCherry, 15000)
}

function addCherry() {
  let emptyPos = getEmptyPos(gBoard)
  if (!emptyPos) return
  //Model
  gBoard[emptyPos.i][emptyPos.j] = CHERRY
  //DOM
  renderCell(emptyPos, CHERRY)
}
