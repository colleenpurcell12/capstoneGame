export const initials = (fullPlayerName) => {
  let splitName = fullPlayerName.split(" ");
  return splitName[0][0] + splitName[1][0];
}
