let monsters = [[]];

A.map((item, index) => {
  for (let i = item[0]; i <= item[1]; i++) {
    if (!monsters[i]) monsters[i] = [];
    monsters[i].push(item[2]);
  }
});

let monstersLeft = [];

B.map((item, index) => {
  let i = item[0];

  for (let j = 0; j < monsters[i].length; j++) {
    let monster = monsters[i][j];

    if (monster) {
      if (monster < item[1]) {
        monsters[i][j] = 0;
      }
    }
  }

  monstersLeft.push(countMonsters());
});

return monstersLeft;

function countMonsters() {
  let count = 0;
  for (let i = 0; i < monsters.length; i++) {
    for (let j = 0; j < monsters[i].length; j++) {
      let item = monsters[i][j];

      if (item > 0) count++;
    }
  }
  return count;
}
