// setup for hexGrid
const boardConfig = {
  width: '100%', height: '100%',
  layout: { width: 10, height: 10, flat: true, spacing: 1.1 }, // change to
  origin: { x: 0, y: 0 },
  map: 'hexagon',
  mapProps: [ 2 ],
  actions: {}
}

module.exports = {boardConfig}
