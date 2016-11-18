// circle layout

// 1. make the cirle react element
//   - is an svg
//   - calc x y % for translate
//   - give circle props
//   - props include action object with click
//   - on mousenter: changes class
//   - eventually: 'submit' button prevents actions

// 2. place svg element

// calculate coordinates by column
// columns all have the same x
// y's change by 1 then sqrt 3
// next column x + %


var coords = [], columns = 12
var x = -43;

var ppc = [3,4,4,5,5,6,6,5,5,4,4,3]

for (var i = 0; i < columns; i ++){
  var y = (ppc[i]-1)* 9.35;
  for(var j = 0; j < points; j ++){
    coords.push({x,y})
    y -= 19;
  }
  // increment x
  if (i%2){  x += 10.75; }
  else { x += 5.375; }
}

console.log(coords)

//
