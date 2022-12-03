<script lang="ts">
    export let unhideHandler: (x: number, y: number) => void;
    export let flagHandler: (x: number, y: number) => void;
    import type Cell from "../models/cell";
    export let cell: Cell;
    const colors = [
        "text-cyan-700",
        "text-green-700",
        "text-red-700",
        "text-yellow-700",
        "text-orange-700",
        "text-purple-700",
        "text-teal-700",
        "text-indigo-700",
        "text-blue-700",
    ];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class={`border-blue-50 border w-20 h-20 flex justify-center items-center cursor-default hover:bg-blue-300 
    ${cell.isHidden ? "bg-green-200" : ""}`}
    on:click={(event) => unhideHandler(cell.x, cell.y)}
    on:contextmenu|preventDefault={() => flagHandler(cell.x, cell.y)}
>
    <p class="text-xl">
        {#if !cell.isHidden}
            {#if cell.isMine}
                💣
            {:else}
                <span class={colors[cell.value]}>{cell.value}</span>
            {/if}
        {:else if cell.isFlagged}
            🚩
        {/if}
    </p>
</div>
