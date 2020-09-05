<script>
    import Header from "../../components/Header.svelte";
    import {onMount} from "svelte";

    import download from "downloadjs";

    let canvas;
    
    let ctx = {};
    onMount(() => {
        ctx = canvas.getContext('2d');
        window.ctx = ctx;
    });

    let R = 8;
    let r = 1;
    let a = 1;
    let amount = 3600;
    let color = "black";
    
    $: ctx.strokeStyle = color;

    let computing = false;

    const clear = () => ctx.clearRect(0,0,1000,1000);
    const save = () => {
        download(canvas.toDataURL('image/png'), 'spirograph.png', 'image/png')
    }
    const draw = () => {
        computing = true;
        let x = (t,R,r,a) => ((R-r) * Math.cos((r/R)*t)+(a * Math.cos((1-(r/R))*t)))
        let y = (t,R,r,a) => ((R-r) * Math.sin((r/R)*t)-(a * Math.sin((1-(r/R))*t)))
        
        ctx.beginPath();
        
        // get the points as well as the minX minY maxX and maxY
        let curX = 0;
        let curY = 0;

        let minX = 0;
        let minY = 0;
        let maxX = 0;
        let maxY = 0

        let points = []
        for (let t = 0; t < amount*R/r; t = t + R/r) {
            curX = curX + x(t,R,r,a);
            curY = curY + y(t,R,r,a);
            //ctx.lineTo(curX, curY);
            points.push([curX,curY]);
            minX = Math.min(minX,curX);
            minY = Math.min(minY,curY);
            maxX = Math.max(maxX,curX);
            maxY = Math.max(maxY,curY)
        }
        // end

        // get deltas
        let deltaX = maxX - minX;
        let deltaY = maxY - minY;


        // move it to 0,0
        points = points.map((point) => [point[0] - minX, point[1] - minY]);

        // scale it
        let scale = Math.min(1000 / deltaX, 1000 / deltaY);
        points = points.map((point) => [point[0] * scale, point[1] * scale]);
        deltaX = deltaX * scale;
        deltaY = deltaY * scale;

        // center it
        points = points.map((point) => [point[0]  + (1000 - deltaX)/2, point[1] + (1000 - deltaY)/2])

        

        // draw it
        for (let point of points) {
            ctx.lineTo(point[0],point[1]);
        }

        // stroke it
        ctx.stroke();

        computing = false;
    }
</script>

<style>
    canvas {
        width: 100%;
        max-width: 70vh;
        height: auto;
        padding: 5px;
        border: 1px solid black;
        margin: auto;
        display: block;
    }

    .split-pain {
        display: flex;
        height: 100%;
    }

    .second-pain {
        padding: 0.25em;
        margin-left: 0.25em;
    }

    button {
        padding: 0.5em;
    }

    .primary {
        background: #2196F3;
    }

    .secondary {
        background: #00838F;
    }

    h1 {
        margin-bottom: 0.25em;
    }

    @media only screen and (max-width: 30em) {
        .split-pain {
            flex-direction: column;
        }
        canvas {
            max-width: calc(70vh - 17em);
        }
        .second-pain {
            margin-top: auto;
        }
        button {
            display: block;
            width: 80%;
            margin: auto;
            
        }
        .label, .field {
            margin-bottom: 0 !important;
        }
        form {
            font-size: 0.75em;
        }
        .second-pain {
            margin: 0;
        }
    }
</style>

<Header>Spirograph</Header>

<div class="split-pain">
    <div class="first-pain">
        <canvas bind:this={canvas} width="1000" height="1000"></canvas>
        <div class="mt-3">
            <button on:click={draw} class="button is-primary">draw</button>
            <button on:click={clear} class="button is-secondary">clear</button>
            <button on:click={save} class="button is-primary">save</button>
        </div>
    </div>

    <div class="second-pain">
        
        <form>
            <div class="field">
                <label class="label" for="spiro-R">R</label>


                <div class="control">
                    <input class="input" id="spiro-R" bind:value={R} disabled={computing} type="number"/>
                </div>
            </div>

            <div class="field">
                <label for="spiro_r" class="label">r</label>
                <div class="control">
                    <input class="input" id="spiro_r" bind:value={r} disabled={computing} type="number" />
                </div>
            </div>
                
            <div class="field">
                <label for="spiro-a" class="label">a</label>
                <div class="control"><input type="number" bind:value={a} disabled={computing} id="spiro-a" class="input" /></div>
            </div>

            <div class="field">
                <label for="spiro-amount" class="label">Amount</label>
                <div class="control"><input type="number" class="input" id="spiro-amount" disabled={computing} bind:value={amount}></div>
            </div>

            <div class="field">
                <label for="spiro-color" class="label">Color</label>
                <div class="control"><input type="text" class="input" id="spiro-color" disabled={computing} bind:value={color} /></div>
            </div>
        </form>
    </div>
</div>

