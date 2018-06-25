// consts =======================================
const cols = 10;
const rows = 20;
const blocks = [
  [[1, 1, 1, 1],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[1, 1, 1, 0],
   [1, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[1, 1, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[1, 1, 0, 0],
   [1, 1, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[1, 1, 0, 0],
   [0, 1, 1, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[0, 1, 1, 0],
   [1, 1, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],

  [[0, 1, 0, 0],
   [1, 1, 1, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],
];

let board;
let currentX, currentY;
let currentBlock;

// functions ====================================
function initGame() {
  board = new Array(rows);
  for (let y = 0; y < rows; y++)
    board[y] = new Array(cols).fill(0);
  genNewBlock();
}

function genNewBlock() {
  currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  currentY = 0;
  currentX = 3;
}

function fixCurrentBlock() {
  for (let i = currentY; i < currentY + 4; i++) {
    for (let j = currentX; j < currentX + 4; j++) {
      if (i < 0 || 20 <= i || j < 0 || 10 <= j)
        continue;
      if (currentBlock[i-currentY][j-currentX] == 0)
        continue;
      board[i][j] = currentBlock[i-currentY][j-currentX];
    }
  }
}

function rotate() {
  const block = currentBlock;
  let newBlock = new Array(4).fill([]);
  for (let i = 0; i < 4; i++)
    newBlock[i] = new Array(4).fill(0);

  const rotationMatrix = [
    12,  8, 4, 0,
    13,  9, 5, 1,
    14, 10, 6, 2,
    15, 11, 7, 3
  ];

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const newPos = rotationMatrix[y * 4 + x];
      newBlock[Math.floor(newPos / 4)][newPos % 4] = block[y][x];
    }
  }
  
  while (true) {
    const topRowSum = newBlock[0].reduce((a, b) => a + b, 0);

    if (topRowSum != 0)
      break;

    for (let i = 1; i < 4; i++) {
      newBlock[i - 1][0] = newBlock[i][0];
      newBlock[i - 1][1] = newBlock[i][1];
      newBlock[i - 1][2] = newBlock[i][2];
      newBlock[i - 1][3] = newBlock[i][3];
    }

    newBlock[3][0] = 0;
    newBlock[3][1] = 0;
    newBlock[3][2] = 0;
    newBlock[3][3] = 0;
  }

  let backupBlock = currentBlock;
  currentBlock = newBlock;
  if (!validMove(currentX, currentY))
    currentBlock = backupBlock;
}

function validMove(x, y) {
  for (let i = y; i < y + 4; i++) {
    for (let j = x; j < x + 4; j++) {
      if (0 <= i && i < 20 && 0 <= j && j < 10) {
        if (currentBlock[i-y][j-x] + board[i][j] == 2)
          return false;
      } else {
        if (currentBlock[i-y][j-x] == 1)
          return false;
      }
    }
  }
  return true;
}

function fall() {
  const nextY = currentY + 1;
  if (validMove(currentX, nextY))
    currentY = nextY;
  else {
    fixCurrentBlock();
    genNewBlock();
  }
}

function eraseBlock() {
  while (board[board.length-1].reduce((a, b) => a + b, 0) == cols)
    board.pop();

  let erased;
  do {
    erased = false;
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i].reduce((a, b) => a + b, 0) != cols)
        continue;
      board.splice(i, 1);
      erased = true;
      break;
    }
  } while (erased);

  while (board.length < rows)
    board.unshift(new Array(cols).fill(0));
}

function showBoard(block) {
  let boardStr = [];
  for (let i = 0; i < 20; i++)
    boardStr.push(board[i].join(""));
  console.clear();
  console.log(boardStr.join("\n"));
}
