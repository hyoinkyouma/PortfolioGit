const cell = document.querySelectorAll(".cell");

//Create copy of chess peice into peiceToMove variable
let peiceToMove;

//boolean value script uses to tell if a peice has been selected
let isMovingPeice = false;

//Removes selected peice from board once peice has been copied to selected cell
let peiceToRemove;

//event listner calls anon function to copy selected peice
//one selected peice has been copied to the new cell it is removed from the board
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", () => {
    if (!isMovingPeice) {
      peiceToMove = cell[i].innerHTML;
      cell[i].classList.add("blinking");
      peiceToRemove = cell[i];
      isMovingPeice = true;
    } else if (isMovingPeice) {
      peiceToRemove.innerHTML = "";
      cell[i].innerHTML = peiceToMove;
      isMovingPeice = false;
      cell[i].classList.remove("blinking");
    }
  });
}
