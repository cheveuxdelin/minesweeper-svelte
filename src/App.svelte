<script lang="ts">
  import Grid from "./models/grid";
  import Cell from "./components/Cell.svelte";
  let n: number = 8;
  let m: number = 8;
  let won: boolean = false;
  let lost: boolean = false;
  let numberOfMines: number = 10;
  let numberOfUnclearedCells: number;
  let score: number = 0;
  let grid: Grid;

  function restartGame() {
    grid = new Grid(n, m, numberOfMines);
    won = false;
    lost = false;
    score = 0;
  }
  function revealCells() {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        grid.cells[x][y].isHidden = false;
      }
    }
  }
  function loseGame() {
    revealCells();
    lost = true;
  }
  function winGame() {
    revealCells();
    won = true;
  }

  function unhideHandler(x: number, y: number) {
    if (grid.cells[x][y].isMine) {
      loseGame();
    } else {
      grid.cells[x][y].isHidden = false;
      score += 100;
      numberOfUnclearedCells--;
      if (numberOfUnclearedCells == numberOfMines) {
        winGame();
      }
    }
  }
  function flagHandler(x: number, y: number) {
    grid.cells[x][y].isFlagged = !grid.cells[x][y].isFlagged;
  }

  function keydownHandler(event: KeyboardEvent) {
    const code = event.code;
    if (code == "Space") {
      restartGame();
    }
  }

  $: grid = new Grid(n, m, numberOfMines);
  $: numberOfUnclearedCells = n * m;
</script>

<svelte:window on:keydown={keydownHandler} />

<div class="w-fit m-auto">
  <div class="border border-blue-100">
    {#each grid.cells as row}
      <div class="flex">
        {#each row as cell}
          <Cell {cell} {unhideHandler} {flagHandler} />
        {/each}
      </div>
    {/each}
  </div>
  <p>Score: {score}</p>
  {#if won || lost}
    <p class={`${won ? "text-green-600" : "text-red-600"} text-3xl`}>
      {won ? "Win" : "Lost"}
    </p>
    <p>press Spacebar to restart the game</p>
  {/if}
</div>
