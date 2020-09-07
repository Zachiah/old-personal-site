<script>
    import Square from "/components/conway-life/Square.svelte";
    import TextField from "/components/TextField.svelte";
    import Header from "/components/Header.svelte"
    import {onMount} from "svelte";

    let grid = [];
    let timeout = null;
    let active = false;
    let waitTime = 500;
    let gridWidthPixels = 0;

    let setGrid = false;
    $: gridWidth = Math.min(Math.floor(gridWidthPixels / 23), 20);
    $: if (!setGrid) {
        grid = emptyGrid(20,gridWidth);
        if (gridWidth !== 0) {
            setGrid = true
        }
    }


    function serializeNum(num,maxIndex) {
        if (num >= 0 && num < maxIndex) {
            return num
        }
        else if (num < 0) {
            return maxIndex + num;
        }
        else {
            return maxIndex - num;
        }
    }

    function getCell(y,x,grid) {
        return grid[serializeNum(y, grid.length)][serializeNum(x,grid[0].length)];
    }

    function liveNeighbors(y,x,grid) {
        const answer = getCell(y-1,x-1,grid) + 
               getCell(y-1,x,grid)   +
               getCell(y-1,x+1,grid) +
               getCell(y,x-1,grid)   +
               getCell(y,x+1,grid)   +
               getCell(y+1,x-1,grid) +
               getCell(y+1,x,grid)   +
               getCell(y+1,x+1,grid);
        return answer;
    }

    function nextCell(y,x,grid) {
        const n = liveNeighbors(y,x,grid);
        const v = getCell(y,x,grid);

        let result;
        if (n < 2 && v) {
            result =  0;
        }
        else if ((n == 2 || n == 3) && v) {
            result =  1;
        }
        else if (n > 3 && v) {
            result =  0;
        }
        else if (n === 3 && !v) {
            result = 1;
        }
        else {
            result = v;
        }
        return result;
    }

    function nextGrid(grid) {
        return grid.map((row, rowIndex) => row.map((item, itemIndex) => nextCell(rowIndex,itemIndex,grid)));
    }

    function emptyGrid(y,x) {
        return (new Array(y).fill((new Array(x).fill(0)))).map(item => item.map(item2 => item2));
    }

    function run() {
        active = true;
        grid = nextGrid(grid);
        timeout = setTimeout(run, waitTime);
    }

    function seedRandom() {
        grid = grid.map(row => row.map(item => Math.floor(Math.random()*2)));
    }


</script>

<style>
    .row {
        display: flex;
    }
    .grid {
        max-width: 460px;
        margin: auto;
    }
</style>

<Header>Conway's Game of life</Header>

<button class="button is-primary" on:click={() => {grid = nextGrid(grid)}} disabled={active}>Next</button>
<button class="button is-secondary" on:click={() => {grid = emptyGrid(20,gridWidth)}} disabled={active}>Clear</button>
<button class="button is-primary" on:click={run} disabled={active}>Run</button>
<button class="button is-danger" on:click={() => {clearTimeout(timeout); active = false}} disabled={!active}>Stop</button>
<button class="button is-primary" on:click={seedRandom} disabled={active}>Seed Random</button>
<TextField bind:value={waitTime} inline class="ml-2" type="number">wait time between iterations (ms)</TextField>

<div class="grid" bind:clientWidth={gridWidthPixels}>
    {#each grid as row}
        <div class="row">
            {#each row as square}
                <Square bind:alive={square} />
            {/each}
        </div>
    {/each}
</div>
