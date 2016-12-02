import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {load} from './chatroom';

describe('Chatroom reducer (messages)', () => {

  it('returns its initial state of an empty object', () => {
    expect(reducer(undefined, {})).to.contain({});
  });

  it('should have a `load` action creator to set the messages on state', () => {

    const messages = {
          1: { name: 'Space Alien',
              text: 'Crop circles are cool!'
              },
          2: { name: 'Elon Musk',
               text: 'LOL'
             }
        }

    const currentMessages = { type: 'LOAD_MESSAGES', messages: messages}
    expect(load(messages)).to.contain(currentMessages);
  });

  it('should handle LOAD_MESSAGES when passed a single message', () => {
    const singleMessage = {1: {name: 'Space Alien', text: 'HI'}};
    const anotherMessage = {name: 'Space Cat', text: 'MEOW'};
    expect(reducer(undefined, {type:'LOAD_MESSAGES', messages: singleMessage})).to.contain(singleMessage);
    expect(reducer(singleMessage, {type:'LOAD_MESSAGES', messages: anotherMessage})).to.contain(anotherMessage);
  });

  it('should handle LOAD_MESSAGES when multiple messages', () => {
    const messageSet1 = {
      1: { name: 'Space Alien',
        text: 'Crop circles are cool!'
      },
      2: {
        name: 'Elon Musk',
        text: 'LOL'
      },
      3: {
        name: 'Space Station',
        text: 'SL sent SC 10 of their crops'
      }
    }
    const messageSet2 = {
      1: { name: 'Not Space Alien',
        text: 'Crop circles are not cool!'
      },
      2: {
        name: 'Not Elon Musk',
        text: ':('
      },
      3: {
        name: 'Not Space Station',
        text: 'SL stole from SC'
      }
    }
    expect(reducer(undefined, {type:'LOAD_MESSAGES', messages: messageSet1})).to.contain(messageSet1);
    expect(reducer(messageSet1, {type:'LOAD_MESSAGES', messages: messageSet2})).to.contain(messageSet2);
  });

});
