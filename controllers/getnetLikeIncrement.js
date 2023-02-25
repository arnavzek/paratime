export default function getNetLikeIncrement(type, status, prevIncrement) {
  let newIncrement = 0;
  if (status) {
    newIncrement++;
  } else {
    newIncrement--;
  }

  if (type == "dislike") newIncrement *= -1;

  return prevIncrement + newIncrement;
  //no matter what
}
