export function updateMoveableButtons(rows) {
  rows.forEach((row, index) => {
    const moveUpButton = row.querySelector('.move-up')
    const moveDownButton = row.querySelector('.move-down')
    if (rows.length > 1) {
      if (index === 0) {
        console.log("moveUpButton", moveUpButton)
        if (moveDownButton && moveDownButton.classList.contains("invisible")) {
            moveDownButton.classList.remove("invisible");
          }
        if (moveUpButton && !moveUpButton.classList.contains("invisible")) {
          moveUpButton.classList.add("invisible");
        }
      } else if (index === rows.length - 1) {
        if (moveUpButton && moveUpButton.classList.contains("invisible")) {
          moveUpButton.classList.remove("invisible");
        }
        if (moveDownButton && !moveDownButton.classList.contains("invisible")) {
          moveDownButton.classList.add("invisible");
        }
      } else {
        if (moveUpButton && moveUpButton.classList.contains("invisible")) {
          moveUpButton.classList.remove("invisible");
        }
        if (moveDownButton && moveDownButton.classList.contains("invisible")) {
          moveDownButton.classList.remove("invisible");
        }
      }
    } else {
      if (moveUpButton && !moveUpButton.classList.contains("invisible")) {
        moveUpButton.classList.add("invisible");
      }
      if (moveDownButton && !moveDownButton.classList.contains("invisible")) {
        moveDownButton.classList.add("invisible");
      }
    }
  });
}
