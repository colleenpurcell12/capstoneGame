import {portSettlements} from './setup'

// loggedInUnser = this.props.loggedInUser
// currentUser this.props.players[this.props.turnInfo-1]
function maritimeEnabled(loggedInUser, currentUser){
  var canTrade = true;
  // check for current players

  if(!isCurrentUser()){
    canTrade = false;
  }
  // check for settlements on ports
  //
  // if 2:1 port, check for 2 of that resource
  if(resource){
      if(currentUser.cardsResource[res] < 2){
        canTrade = false;
      }
  }
  // if 3:1 port, check for 3 of any resource
  else {
    var hasRes = currentUser.cardsResource.some(res => {
      return currentUser.cardsResource[res] > 2
    })
    if(!hasRes){
      canTrade = false
    }
  }
  return canTrade
}

function isCurrentUser(loggedInUser, currentUser){
  return loggedInUser.displayName === currentUser.name
}

function hasPortSettlement(loggedInUser, everyStructure){
  var userStructures = everyStructure.filter(struc => {
    return struc.player === loggedInUser.displayName;
  })
  var ports = userStructures.filter(struc => {
    
  })
}

// if current turn, activate selection in dropdown
// check if player has settlement on
