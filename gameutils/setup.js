//Create coordinate array
var corners = [], columns = 12, x = -43.75;
var ppc = [3,4,4,5,5,6,6,5,5,4,4,3]
for (var i = 0; i < columns; i ++){
  var y = (ppc[i]-1)* 9.41;
  for(var j = 0; j < ppc[i]; j ++){
    corners.push({x,y, r:2})
    y -= 18.82;
  }
  // increment x
  if (i%2){  x += 10.9375; }
  else { x += 5.46875; }
}

var ports = [
  {type: 'port', x: -45, y: -26, ratio: '1:2', res: 1},
  {type: 'port', x: -45, y: 7, ratio: '1:2', res: 2},
  {type: 'port', x: -29, y: 35, ratio: '1:3', res: null},
  {type: 'port', x: -16, y: -43, ratio: '1:3', res: null},
  {type: 'port', x: 0, y: 52, ratio: '1:2', res: 3},
  {type: 'port', x: 16, y: -43, ratio: '1:2', res: 4},
  {type: 'port', x: 29, y: 35, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: -26, ratio: '1:2', res: 5},
  {type: 'port', x: 45, y: 7, ratio: '1:3', res: null},
]

function renderPorts(){
  var clicked = function(e, c){
    console.log('clicked port:', e.target.id)
  }
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  ports.forEach(function (port, index){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle', {}); //Create a path in SVG's namespace
    newElement.setAttribute("cx", port.x);
    newElement.setAttribute("cy", port.y);
    newElement.setAttribute("r", 4);
    newElement.setAttribute('id', "p" +index)
    newElement.addEventListener('click', (e) => clicked(e))
    newElement.style.fill = "#493737";
    svg.appendChild(newElement);
  })
}

function createCorners(select){

  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var clicked = function(e, c){
    console.log('clicked', e.target);

    select(e);
    // e.target.setAttribute('class', 'corner-select');
    // add to db
    //IMPORT clicked function and call set it to the add event listener
  }
  corners.forEach(function(circle, index){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle', {}); //Create a path in SVG's namespace
    newElement.setAttribute("cx", circle.x);
    newElement.setAttribute("cy", circle.y);
    newElement.setAttribute("r", circle.r);
    newElement.setAttribute('id', "c" +index)
    newElement.addEventListener('click', clicked)
    newElement.style.fill = "#ccbdbd";
    svg.appendChild(newElement);
  })
}

function assignTokens(tokens = [ 2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12, null]){
  // this gets the permanent token order from somehwere
  // this is a dummy array, might be passed in
  for (var i = 0; i < 19; i ++){
    var hexText = document.getElementsByTagName('text')[i];
    hexText.textContent = tokens[i];
  }

}

// should dry up by creating a wrapper funciton for editing the svg
// could pass in element type and attribute array/object of pairs
function addToSvg(name, attributes){
  var svg = document.getElementsByTagName('svg')[0];
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", name)
  attributes.forEach(function(attribute){
    newElement.setAttribute(attribute[0], attribute[1])
  })
  svg.appendChild(newElement)
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

}


module.exports = {corners, createCorners, assignTokens, renderPorts, addRoad}
