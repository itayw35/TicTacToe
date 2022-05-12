
function initBoard(value){
  board=document.getElementById("board")
  list=[];
    for (i=0;i<value;i++)
    {
    list[i]=[]
    for (j=0;j<value;j++)
    {
    list[i][j] = {
        type: 0,
        key: "".concat(i,j)
               
      };
      console.log(list);
      elem=document.createElement("div")
      elem.id=list[i][j].key
      elem.innerText="dsfsd"
      elem.classList.add("styleE")
      board.append(elem)

    }
  }

}
function initPlayers(value){//itai elizur


}
function chekVictory(){//yishai


}
function changeTurn(){



}
initBoard(3)