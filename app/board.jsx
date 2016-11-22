export default function makeBoard(levels=3, origin=[0, 0, 0], nextHexId=0, nextCornerId=0) {
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
