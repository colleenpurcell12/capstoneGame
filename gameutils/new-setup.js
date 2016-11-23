var resources = ['solar', 'ice', 'seeds', 'hematite', 'silica']
var resourcesArray = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,'Desert']
var tokenArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]

function shuffle(arr){
  var shuffled = [];
  var len = arr.length
  for(var i = 0; i < len; i ++){
    var arrIndex = Math.floor(Math.random()*arr.length)
    shuffled.push(arr.splice(arrIndex, 1)[0])
  }
  return shuffled;
}

export function assignHexData (board, tokens, resources) {
  // assing one of each to each hex in board.hexes
  var shuffledTokens = shuffle(tokens),
      shuffledResources = shuffle(resources);

  board.hexes.map((hex, index) => {(
    hex.token = shuffledTokens[index];
    hex.resource = shuffledResources[index];
  )})

return board;
}
