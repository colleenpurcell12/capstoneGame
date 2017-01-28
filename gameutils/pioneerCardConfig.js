export const deck = {
  knights: {
    name: "Knights",
    total: 14
  },
  vp: {
    name: "Victory Point",
    total: 5
  },
  yop: {
    name: "Year of Plenty",
    total: 2
  },
  monopoly: {
    name: "Monopoly",
    total: 2
  },
  rb: {
    name: "Road Building",
    total: 2
  },
}

export const makeDeck = (deckObj) => {  // deck on store
  var deck = []
  for(var type in deckObj){
    for(var i = 0; i < type.total; i ++){
      deck.push(type.name)
    }
  }
  return deck
}
