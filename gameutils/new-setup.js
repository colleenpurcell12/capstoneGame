
export function assignHexData (board) {
  // assing one of each to each hex in board.hexes
var resources = ['solar', 'ice', 'seeds', 'hematite', 'silica']
var resourcesArray = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,'Desert']
var tokenArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]

board.hexes.map((hex) => {
  var resourceCardCount = resourcesArray.length
  var resourceIndex = Math.floor(Math.random()*resourceCardCount)
  var pickedHexResource = resourcesArray[resourceIndex]

  var tokenCount = tokenArray.length
  var tokenIndex = Math.floor(Math.random()*tokenCount)
  var pickedHexToken = tokenArray[tokenIndex]

  hex.resource = resourcesArray.splice(resources[resourceIndex], 1)
  hex.token = tokenArray.splice(resourceIndex, 1)
})

return board;
}
