export default function compileDataAndFollowStaus(datas, statusList) {
  if (!statusList) return datas;

  let doesFollow = [];
  for (let item of statusList) {
    doesFollow.push(item.receiverID);
  }

  for (let item of datas) {
    let id = item._id.toString();
    if (doesFollow.includes(id)) item.followStatus = true;
  }

  return datas;
}
