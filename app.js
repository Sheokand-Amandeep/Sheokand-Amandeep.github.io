const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const boxes = $$('.box');
const msg = $('#msg');
const msgContainer = $('.msg-container');
const [resetBtn, newGameBtn] = ['#reset-btn', '#new-btn'].map($);

let turnO = true, gameOn = true, moveCount = 0;
const winPatterns = [
  [0,1,2], [0,3,6], [0,4,8], [1,4,7],
  [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

const checkWinner = () => {
  // Return true if we found a winner and update UI/state
  const hasWinner = winPatterns.some(([a, b, c]) => {
    const value = boxes[a].innerText;
    if (value && value === boxes[b].innerText && value === boxes[c].innerText) {
      msg.innerText = `Congratulations, Winner is ${value} after ${moveCount} moves!`;
      msgContainer.classList.remove('hide');
      resetBtn.classList.add('hide');
      gameOn = false;
      return true;
    }
    return false;
  });

  return hasWinner;
};

const handleClick = box => {
  if (!box.innerText && gameOn) {
    box.innerText = turnO ? 'O' : 'X';
    box.style.color = turnO ? '#4d79ff' : '#ff4d6d';
    moveCount++; // increment immediately after placing the mark

    const winner = checkWinner();
    if (!winner && moveCount === 9) {
      // Board full & no winner -> draw
      msg.innerText = `It's a Draw!`;
      msgContainer.classList.remove('hide');
      resetBtn.classList.add('hide');
      gameOn = false;
    }

    turnO = !turnO;
  }
};

const resetGame = () => {
  boxes.forEach(box => box.innerText = '');
  turnO = true;
  gameOn = true;
  moveCount = 0;
  msgContainer.classList.add('hide');
  resetBtn.classList.remove('hide');
};

boxes.forEach(box => box.addEventListener('click', () => handleClick(box)));
[resetBtn, newGameBtn].forEach(btn => btn.addEventListener('click', resetGame));
