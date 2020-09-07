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
    let lastY = 1;
    let lastX = 1;

    let gridHeight = 20;
    let gridWidth = 0;


    let setGrid = false;

    
    $: {
        if (!setGrid) gridWidth = Math.min(Math.floor(gridWidthPixels / 23), 50);
        grid = emptyGrid(gridHeight,gridWidth);
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
            return num - maxIndex;
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

    function superimpose(y,x,thing,grid) {
        const sn = serializeNum;
        grid = grid.map(row => row.map(item => item));

        thing.forEach((row,rowIndex) => row.forEach((item,itemIndex) => {
            grid[sn(y+rowIndex, grid.length)][sn(x+itemIndex,grid[0].length)] = item;
        }));

        return grid;
    }
    function addShape(shape) {
        grid = superimpose(lastY,lastX,shape,grid)
    }

    const SHAPES = {
        "glider": [
            [1,0,0],
            [0,1,1],
            [1,1,0]
        ],
        "spaceship": [
            [0,1,1,1,1],
            [1,0,0,0,1],
            [0,0,0,0,1],
            [1,0,0,1,0]
        ],
        "gosper-glider-gun": [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]
    }


</script>

<style>
    .row {
        display: flex;
    }
    .grid-wrapper {
        flex-grow: 1;
    }
    .grid {
        max-width: 1150px;
        margin: auto;
    }
    .parent {
        display: flex;
    }
    .the-buttons {
        width: 20em;
    }
    .the-buttons * {
        display: block;
        width: 100%;
    }

    @media only screen and (max-width: 700px) {
        .parent {
            flex-direction:column;
        }
        .grid-wrapper {
            order: 0;
        }
        .the-buttons {
            order: 1;
            width: 100%;
            padding: 2em;
        }
    }
</style>

<Header>Conway's Game of life</Header>

<div class="parent">
    <div class="the-buttons mr-2">
        <button class="button is-primary" on:click={() => {grid = nextGrid(grid)}} disabled={active}>Next</button>
        <button class="button is-secondary" on:click={() => {grid = emptyGrid(gridHeight,gridWidth)}} disabled={active}>Clear</button>
        <button class="button is-primary" on:click={run} disabled={active}>Run</button>
        <button class="button is-danger" on:click={() => {clearTimeout(timeout); active = false}} disabled={!active}>Stop</button>
        <button class="button is-primary" on:click={seedRandom} disabled={active}>Seed Random</button>
        <TextField bind:value={waitTime} inline type="number">wait time between iterations (ms)</TextField>
        <TextField bind:value={gridWidth} inline type="number">Grid Width</TextField>
        <TextField bind:value={gridHeight} inline type="number">Grid Height</TextField>

        <h2 class="title is-4 mt-4">Add Objects</h2>
        <p class="title is-6">objects are added from the square you last clicked on</p>
        <button class="button is-primary" on:click={() => addShape(SHAPES['glider'])} disabled={active} title="add glider to where you last pressed">Glider</button>
        <button class="button is-primary" on:click={() => addShape(SHAPES['spaceship'])} disabled={active} title="add spaceship to where you last pressed">Spaceship</button>
        <button class="button is-primary" on:click={() => addShape(SHAPES['gosper-glider-gun'])} disabled={active} title="add gosper glider gun to where you last pressed">Gosper Glider Gun</button>
        
    </div>

    <div class="grid-wrapper">
        <div class="grid" bind:clientWidth={gridWidthPixels}>
            {#each grid as row, rowIndex}
                <div class="row">
                    {#each row as square, squareIndex}
                        <Square bind:alive={square} onclick={() => {row[squareIndex] = 1-row[squareIndex]; lastY = rowIndex; lastX = squareIndex}}/>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>
