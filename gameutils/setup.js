//Create ports array

var ports = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: -45, y: 7,r: 3, ratio: '1:2', res: 'hematite'},
  {type: 'port', x: -29, y: 35, r: 3, ratio: '1:2', res: 'solar'},
  {type: 'port', x: -16, y: -43, r: 3, ratio: '1:2', res: 'ice'},
  {type: 'port', x: 0, y: 52, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 16, y: -43, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 29, y: 35, r: 3, ratio: '1:2', res: 'seeds'},
  {type: 'port', x: 45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: 7, r: 3, ratio: '1:2', res: 'other'},
]

var resources = ['solar', 'ice', 'seeds', 'hematite', 'other']
var resourcesArray = [0, 0, 0, 0, 1,1,1,1,2,2,2,2,3,3,3,4,4,4, 'desert']
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

function assignHexData (hexes, tokens, resources) {
  hexes.map(function(hex, index){
    hex.token = tokens[index];
    hex.resource = resources[index];
    return hex;
  })
return hexes;
}

// takes two svg circle elements a, and b and the current user, c
// state could save the last two clicked on ccorner nodes as well as the current player
function addRoad(a, b, c){
  console.log('in add road')
  var svg = document.getElementsByTagName('svg')[0];
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line', {}); //Create a path in SVG's namespace
  newElement.setAttribute("x1", a.attributes.cx.value)
  newElement.setAttribute("y1", a.attributes.cy.value)
  newElement.setAttribute("x2", b.attributes.cx.value)
  newElement.setAttribute("y2", b.attributes.cy.value)
  newElement.setAttribute("style", "stroke-width:1; stroke:" + c.color)
  svg.insertBefore(newElement, svg.childNodes[0])
  // Add road to db roads object
  // add road to state

}


module.exports = {shuffle, ports, resources, resourcesArray, tokenArray, assignHexData, addRoad}
