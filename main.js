// consts =======================================
let run;
let screen;
let ctx;
let frame;
let frameInterval;

window.onload = function() {
  run = true;
  frame = 0;
  frameInterval = 10;

  initGame();

  screen = document.getElementById("screen");
  ctx = screen.getContext("2d");

  // イベントの登録
  window.addEventListener("keydown", keyDown, true);
  window.addEventListener("keyup", keyUp, true);

  (function() {

    if (frame % frameInterval == 0) {
      render(ctx);
      fall();
      eraseBlock();
    }

    frame++;
    if (run) setTimeout(arguments.callee, 50);
  })();
}

function keyDown(event) {
  const ck = event.keyCode;;
  if (ck == 37) {
    if (validMove(currentX - 1, currentY))
      currentX--;
  } else if (ck == 39) {
    if (validMove(currentX + 1, currentY))
      currentX++;
  } else if (ck == 32) {
    rotate();
  } else if (ck == 40) {
    frameInterval = 3;
  }
}

function keyUp(event) {
  const ck = event.keyCode;
  if (ck == 40) {
    frameInterval = 10;
  }
}
