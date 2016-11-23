// board grid is set up on game set up
// after init, info on tokens/resources sent to db?
// board state is initialized to results of makeBoard
// board is rendered based on state??
// at least corners are
// takes in hex array with tokens and resources, port array, and corner array (clean)
var hex = {
  id,
  resource,
  tokenNum,
  coords: {x,y} // center
}
// resource and token # assigned by hexid from resource, token# array generated on game gen?
var port = {
  id,
  ratio,
  resource,
  coords: {x,y}
}

var edges = {
  from: corner.id,
  to: corner.id,
  road: Road
}

var corners = {
  id,
  coords: {x,y},
  owner: null,
  type: null,
  neighborHexes: [
    {
      hex.id,
      cornerNumber
    }
  ],
  edges: [
    {}
  ],
  port
}

function pointFor(corner:) {}


// returns grid array with hexes and corners as nodes
// corners have hex connection(s), corner connections, port connection, and empty roads connections
// hexes (necessary?) have corner neighbors
// for each corner:
// - loop through hex array and find hexes who's coordinates are within circle radius
// - add to hex-connections array
// - stop at three
// - same for ports
// - same for other corners
// - should be helper function var ports = findNeighbors(corner, array)

// roads array kept simultaneously??
//

// State??
// cornerGrid: [],
//
const db = {

  games: {
    game: {
      id,
      users:{
        id,
        hand,
        vp,
      },
      boardstate:{
        hexes:{
          0: {
            resource,
            token,
          }
        },
        corners: {
          0: {
            owner,
            hexes,
            roads,
            type,
            port,
          }
        },
        roads:{
          id
        },
      },
    }
  },
  users,
  chats
};
