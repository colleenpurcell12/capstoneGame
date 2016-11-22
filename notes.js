

// METHODS NEEDED

// ** TOKEN #s ** //
// token #s are passed in through props? as 'text' property

// THE GRID //
// board grid is set up on game set up
// takes in hex array with tokens and resources, port array, and corner array (clean)
var hex = {
  id,
  resource,
  token,
  coords: {x,y} // center
}

var port = {
  id,
  ratio,
  resource,
  coords: {x,y}
}

var corners = {
  id,
  coords: {x,y}
}
// returns grid array with hexes and corners as nodes
// corners have hex connection(s), corner connections, port connection, and empty roads connections
// hexes (necessary?) have
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
