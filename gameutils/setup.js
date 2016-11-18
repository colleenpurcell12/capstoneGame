//Create coordinate array
var coords = [], columns = 12, x = -43.75;
var ppc = [3,4,4,5,5,6,6,5,5,4,4,3]
for (var i = 0; i < columns; i ++){
  var y = (ppc[i]-1)* 9.41;
  for(var j = 0; j < ppc[i]; j ++){
    coords.push({x,y})
    y -= 18.82;
  }
  // increment x
  if (i%2){  x += 10.9375; }
  else { x += 5.46875; }
}

function createCorners(){
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var clicked = function(){
    console.log('clicked')
  }
  coords.forEach(function(circle, index){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle', {}); //Create a path in SVG's namespace
    newElement.setAttribute("cx", circle.x);
    newElement.setAttribute("cy", circle.y);
    newElement.setAttribute("r", "2");
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

module.exports = {createCorners, assignTokens}
