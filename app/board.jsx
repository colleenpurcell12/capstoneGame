//Create coordinate array
// these aren't used anymore
const DEFAULT_CORNERS = (() => {
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
  return corners
})()

const DEFAULT_PORTS = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: '1:2', res: 1},
  {type: 'port', x: -45, y: 7,r: 3, ratio: '1:2', res: 2},
  {type: 'port', x: -29, y: 35, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: -16, y: -43, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 0, y: 52, r: 3, ratio: '1:2', res: 3},
  {type: 'port', x: 16, y: -43, r: 3, ratio: '1:2', res: 4},
  {type: 'port', x: 29, y: 35, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: -26, r: 3, ratio: '1:2', res: 5},
  {type: 'port', x: 45, y: 7, r: 3, ratio: '1:3', res: null},
]

export default function makeBoard(corners=DEFAULT_CORNERS, ports=DEFAULT_PORTS) {

}

export  function __makeBoard(levels=3, origin=[0, 0, 0], nextHexId=0, nextCornerId=0) {
  const hex =
    {
      id: nextHexId++,
      coords: origin,
      corners: [],
    }
  const corners = []
  for (let corner = 0; corner != 6; ++corner) {
    corners.push({hex, corner})
  }
  hex.corners = corners

  return {hexes: [hex], corners}
}
