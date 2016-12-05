import { moveRobber } from 'APP/app/reducers/robber';
import { addAction } from 'APP/app/reducers/action-creators';
import { incrementResource } from 'APP/app/reducers/players';
import Layout from './react-hexgrid/src/Layout';
import GridGenerator from './react-hexgrid/src/GridGenerator';
import HexUtils from './react-hexgrid/src/HexUtils';
import Point from './react-hexgrid/src/Point';

/* -----------------   STATIC GAME VARIABLES   ------------------ */

var ports = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: 3, res: null, xOffset: 0, yOffset: -9},
  {type: 'port', x: -45, y: 7,r: 3, ratio: 2, res: 'iron', xOffset: 0, yOffset: 4},
  {type: 'port', x: -29, y: 35, r: 3, ratio: 2, res: 'solar', xOffset: 0, yOffset: 4},
  {type: 'port', x: -16, y: -43, r: 3, ratio: 2, res: 'ice',xOffset: -9, yOffset: -2.5},
  {type: 'port', x: 0, y: 52, r: 3, ratio: 3, res: null, xOffset: 9, yOffset: -2.5},
  {type: 'port', x: 16, y: -43, r: 3, ratio: 3, res: null,xOffset: 9, yOffset: -2.5},
  {type: 'port', x: 29, y: 35, r: 3, ratio: 2, res: 'crops', xOffset: 0, yOffset: 4},
  {type: 'port', x: 45, y: -26, r: 3, ratio: 3, res: null, xOffset: 0, yOffset: -9},
  {type: 'port', x: 45, y: 7, r: 3, ratio: 2, res: 'fuel', xOffset: 0, yOffset: 4},
];

const neighborDirections = [
    {q: 0, r: -1,s: +1},
    {q: 1, r: -1,s: 0},
    {q: 1, r: 0, s:-1},
    {q: 0, r: 1, s:-1},
    {q: -1,r:  1,s: 0},
    {q: -1,r:  0,s: 1},
];

var resources = ['solar', 'ice', 'crops', 'iron', 'fuel'];
var resourcesArray = [0, 0, 0, 0, 1,1,1,1,2,2,2,2,3,3,3,4,4,4];
var tokenArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];

/* -----------------    BOARD GENERATOR     ------------------ */

function generate(config){
    // create layout object
    let layout = new Layout(config.layout, config.origin);
    let generator = GridGenerator.getGenerator(config.map);

    // make hexagon array
    let hexagons = generator.apply(this, config.mapProps);

    // make hexagon object
    let map = hexagons.reduce((all, one) => Object.assign({},
      all,
      {[[one.q, one.r, one.s]]: one}
    ), {});

    // create corners object from hexes
    const allCorners = {};
    hexagons.forEach((hex, i) => {
      hex.id = i;
      makeCorners(hex, corner => {
        const hexes = corner.hexes.map(hex => map[coord(hex)] || coord(hex));
        allCorners[cornerCoord(...corner.hexes)] = {hexes, id: null};
      });
    });
    var n = 0;

    // assign id to all corners
    for(var corner in allCorners){
      allCorners[corner].id = n++;
    }

    // assign neighbors to all corners
    for(var c in allCorners){
      allCorners[c].neighbors = findNeighbors(allCorners[c], allCorners);
      var coords = setCoords(c, layout);
      allCorners[c].x = coords.x;
      allCorners[c].y = coords.y;
    }

    //debugging
    console.log('hexagons', hexagons);
    console.log('corners', allCorners);
    console.log(`found ${Object.keys(allCorners).length} corners`);

    return { hexagons, layout, corners: allCorners };
  }

/* -----------------    BOARD UTILITIES     ------------------ */

// shuffle resources or tokens
function shuffle(arr){
  var shuffled = [];
  var len = arr.length;
  for(var i = 0; i < len; i ++){
    var arrIndex = Math.floor(Math.random()*arr.length);
    shuffled.push(arr.splice(arrIndex, 1)[0]);
  }
  return shuffled;
}

// create hexData array of token/resource assignments
function assignHexInfo (tokens, resources) {
  var tshuff = shuffle(tokens);
  var rshuff = shuffle(resources);
  var d = Math.floor(Math.random()*19);
  tshuff.splice(d, 0, '');
  rshuff.splice(d, 0, 'desert');
  addAction(moveRobber(d));
  var hexData = [];
  for(var i = 0; i < 19; i ++){
    hexData.push({
      token : tshuff[i],
      resource : rshuff[i]
    });
  }
 return hexData;
}

// generate corner coordinates based on surrounding hexes
function setCoords(corner , layout){
  var hexCoords = corner.split(':'), x, y;
  var a = HexUtils.hexToPixel(hexCoords[0], layout);
  var b = HexUtils.hexToPixel(hexCoords[1], layout);
  var c = HexUtils.hexToPixel(hexCoords[2], layout);

  if (a.x === b.x){
    x = (a.x + c.x + b.x)/3;
    y = (c.y);
  }
  else if (a.x === c.x){
    x = (a.x + c.x + b.x)/3;
    y = (b.y);
  } else {
    x = (a.x + c.x + b.x)/3;
    y = (a.y);
  }
  return new Point(x, y);
}

// neighbor corners array generated from checking shared hexes
function findNeighbors(a, cObj){
  var neighbors = [];
  for(var corner in cObj){
    var common = 0;
    a.hexes.forEach(hex => {
      if(cObj[corner].hexes.indexOf(hex) >= 0){
        common++;
      }
    });
    if(common === 2){
      neighbors.push(cObj[corner].id);
    }
  }
  return neighbors;
}

// Add the hex coordinate lhs to the hex coordinate rhs
function plus(lhs, rhs) {
  return {
    q: lhs.q + rhs.q,
    r: lhs.r + rhs.r,
    s: lhs.s + rhs.s,
  };
}

// generate corners for each point on a hex
function makeCorners(hex, visitor) {
  const dirs = neighborDirections;
  dirs.forEach((vec, i) => {
    // come up with a corner based on my coordinate, my ith
    // neighbor's coordinate, and my i + 1th neighbor's coordinate
    const hexes = [hex, plus(hex, vec), plus(hex, dirs[(i + 1) % dirs.length])];
    visitor({hexes});
  });
}

// Return normalized hex coords
function coord(hex) {
  return [hex.q, hex.r, hex.s].join(',');
}

// Return the normalized corner coords between hexes A, B, and C.
const cornerCoord = (a, b, c) =>
  [coord(a), coord(b), coord(c)].sort().join(':');


module.exports = {
  // shuffle,
  ports,
  resources,
  resourcesArray,
  tokenArray,
  assignHexInfo,
  // neighborDirections,
  // findNeighbors,
  // makeCorners,
  // cornerCoord,
  // coord,
  // setCoords,
  generate,
};
