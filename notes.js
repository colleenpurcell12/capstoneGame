

// METHODS NEEDED

// ** TOKEN #s ** //
// token #s are passed in through props? as 'text' property


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
