let tor = 0;
let history = [];
document.getElementById("new-game").onclick = () => newGame();
document.getElementById("change").onclick = () => changeState();
document.getElementById("load").onclick = () => loadGame();
const board = document.getElementById("board");
let counter = 0;
hamburger.onclick = function () {
  counter++;
  this.classList.toggle("change");
  document.getElementById("side-bar").classList.toggle("open-side-bar");
};
let hours = 0,
  minutes = 0,
  seconds = 0;

const setTimer = setInterval(myTimer, 1000);
function myTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10 && Number.isInteger(minutes)) {
    minutes = `0${minutes}`;
  }
  if (hours < 10 && Number.isInteger(hours)) {
    hours = `0${hours}`;
  }
  timer.innerText = `${hours}:${minutes}:${seconds}`;
}
let value = Number(prompt("How many rows in the game?"));
initBoard(value);
function initBoard(value) {
  board.innerHTML = "";
  board.style.width = 110 * value + "px";
  board.style.height = 110 * value + "px";
  list = [];
  const timer = document.getElementById("timer");
  timer.innerText = `0${hours}:0${minutes}:0${seconds}`;
  document.getElementById("save").onclick = () => saveGame(list, value);
  document.getElementById("back").onclick = () => stepback(list);

  document.getElementById("record").onclick = () => showRecord(value);
  for (i = 0; i < value; i++) {
    list[i] = [];
    for (j = 0; j < value; j++) {
      list[i][j] = {
        type: 0,
        key: "".concat(i, j),
      };
      elem = document.createElement("div");
      elem.id = list[i][j].key;
      elem.classList.add("styleE");
      elem.onclick = function () {
        if (list[this.id[0]][this.id[1]].type == 0) {
          if (tor == 0) {
            this.classList.replace("styleE", "styleX");
            list[this.id[0]][this.id[1]].type = "x";
            tor++;
          } else {
            this.classList.replace("styleE", "styleO");
            list[this.id[0]][this.id[1]].type = "o";
            tor = 0;
          }
          history.push(list[this.id[0]][this.id[1]]);
          checkVictory(value, list);
        }
      };
      board.append(elem);
    }
  }
}

function newGame() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  initBoard(value);
  history = [];
  tor = 0;
}
function showRecord(value) {
  const popup = document.getElementById("popup");
  let recordList = JSON.parse(localStorage.getItem(`record list${value}`));
  popup.innerHTML = "";
  popup.classList.toggle("show");
  popup.style.height = 110 * value + "px";
  popup.style.width = 110 * value + "px";
  for (i = 0; i < value; i++) {
    for (j = 0; j < value; j++) {
      let elem = document.createElement("div");
      elem.id = "r".concat(i, j);
      elem.classList.add("styleE");
      popup.appendChild(elem);
    }
  }
  for (n of recordList) {
    if (n.type == "x") {
      document
        .getElementById("r" + n.key)
        .classList.replace("styleE", "styleX");
    } else if (n.type == "o") {
      document
        .getElementById("r" + n.key)
        .classList.replace("styleE", "styleO");
    }
  }
}
function changeState() {
  value = Number(prompt("How many rows in the game?"));
  initBoard(value);
}
function saveGame(list, value) {
  localStorage.setItem("saved list", JSON.stringify(list));
  localStorage.setItem("saved value", value);
  localStorage.setItem("saved history", JSON.stringify(history));
  localStorage.setItem("saved turn", tor);
}
function loadGame() {
  history = JSON.parse(localStorage.getItem("saved history"));
  value = Number(localStorage.getItem("saved value"));
  tor = Number(localStorage.getItem("saved turn"));
  hours = 0;
  minutes = 0;
  seconds = 0;
  initBoard(value);
  list = JSON.parse(localStorage.getItem("saved list"));
  let flatList = list.flat();
  savedx = flatList.filter((v) => v.type == "x");
  savedx.forEach((v) => {
    document.getElementById(v.key).classList.replace("styleE", "styleX");
  });
  savedo = flatList.filter((v) => v.type == "o");
  savedo.forEach((v) => {
    document.getElementById(v.key).classList.replace("styleE", "styleO");
  });
}
function checkVictory(value, list) {
  let TableHistory = [];
  let Res;
  let Res1;
  let Vic;
  for (let i = 0; i < value; i++) {
    Res = "";
    Res1 = "";
    for (let j = 0; j < value; j++) {
      Res = Res + list[i][j].type;
      Res1 = Res1 + list[j][i].type;
    }
    Res = Res.split("");
    Res1 = Res1.split("");
    if (
      Res.every((i) => {
        return i == "x";
      }) == true
    ) {
      alert("victory!!!");
      Vic = true;
      clearInterval(setTimer);
    }
    if (
      Res.every((i) => {
        return i == "o";
      }) == true
    ) {
      alert("victory!!!");
      Vic = true;
      clearInterval(setTimer);
    }
    if (
      Res1.every((i) => {
        return i == "x";
      }) == true
    ) {
      alert("victory!!!");
      Vic = true;
      clearInterval(setTimer);
    }
    if (
      Res1.every((i) => {
        return i == "o";
      }) == true
    ) {
      alert("victory!!!");
      Vic = true;
      clearInterval(setTimer);
    }
  }
  Res = "";
  Res1 = "";
  for (let j = 0; j < value; j++) {
    Res = Res + list[j][j].type;
    Res1 = Res1 + list[j][value - j - 1].type;
  }
  Res = Res.split("");
  Res1 = Res1.split("");
  if (
    Res.every((i) => {
      return i == "x";
    }) == true
  ) {
    alert("victory!!!");
    Vic = true;
    clearInterval(setTimer);
  }
  if (
    Res.every((i) => {
      return i == "o";
    }) == true
  ) {
    alert("victory!!!");
    Vic = true;
    clearInterval(setTimer);
  }
  if (
    Res1.every((i) => {
      return i == "x";
    }) == true
  ) {
    alert("victory!!!");
    Vic = true;
    clearInterval(setTimer);
  }
  if (
    Res1.every((i) => {
      return i == "o";
    }) == true
  ) {
    alert("victory!!!");
    Vic = true;
    clearInterval(setTimer);
  }
  if (Vic == true) {
    let text = history.length;
    if (localStorage.getItem(`record list${value}`)) {
      TableHistory = JSON.parse(localStorage.getItem(`record list${value}`));
      console.log(TableHistory);
      if (text < TableHistory.length) {
        localStorage.setItem(`record list${value}`, JSON.stringify(history));
      }
    } else {
      localStorage.setItem(`record list${value}`, JSON.stringify(history));
    }
  }
}
function stepback(list) {
  if (history.length > 0) {
    let his = history.pop();
    if (his.type == "x") {
      document.getElementById(his.key).classList.replace("styleX", "styleE");
      list[his.key[0]][[his.key[1]]].type = 0;
      tor = 0;
    } else {
      document.getElementById(his.key).classList.replace("styleO", "styleE");
      list[his.key[0]][[his.key[1]]].type = 0;
      tor = 1;
    }
  }
}
