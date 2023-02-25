export default function pullItemFromArray(theArray, val) {
  for (var i = 0; i < theArray.length; i++) {
    if (theArray[i] === val) {
      theArray.splice(i, 1);
      i--;
    }
  }
  return theArray;
}
