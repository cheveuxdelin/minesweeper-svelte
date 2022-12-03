<script lang="ts">
  import Grid from "./models/grid";
  import Cell from "./components/Cell.svelte";
  let n: number = 10;
  let m: number = 10;
  let won: boolean = false;
  let lost: boolean = false;
  let numberOfMines: number = 100;
  let numberOfUnclearedCells: number;
  let grid: Grid;

  function restartGame() {
    grid = new Grid(n, m, numberOfMines);
    won = false;
    lost = false;
  }
  function loseGame() {
    grid.revealCells();
    lost = true;
  }
  function winGame() {
    grid.revealCells();
    won = true;
  }

  function unhideHandler(x: number, y: number) {
    if (grid.cells[x][y].isMine) {
      loseGame();
    } else {
      grid.cells[x][y].isHidden = false;
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
  {#if won || lost}
    <p class={`${won ? "text-green-600" : "text-red-600"} text-3xl`}>
      {won ? "Win" : "Lost"}
    </p>
    <p>press R to restart the game</p>
  {/if}
</div>
