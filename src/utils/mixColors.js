/**
 * Blends two colors together based on the percentage parameter.
 * @param {number[]} color1 [r,g,b]
 * @param {number[]}  color2 [r,g,b]
 * @param {number} percentOfColor1 A number in the set [0,1]
 * @returns {number[]}
 */
export default function mixColors(color1, color2, percentOfColor1) {
  var percentOfColor2 = 1 - percentOfColor1;

  if (percentOfColor1 == 1) {
    return color1;
  }
  if (percentOfColor2 == 1) {
    return color2;
  }

  return color1.map(
    (v, i) => v * percentOfColor1 + color2[i] * percentOfColor2
  );
}
