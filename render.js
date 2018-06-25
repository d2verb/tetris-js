function render(ctx) {
  ctx.clearRect(0, 0, screen.width, screen.height);

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] == 0)
        continue;
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
      ctx.fillRect(j * 30, i * 30, 30, 30);
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (currentBlock[i][j] == 0)
        continue;
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
      ctx.fillRect((currentX + j) * 30, (currentY + i) * 30, 30, 30);
    }
  }
}
