<div class="{tile ? 'tile' : ''} is-child card has-background-{bgColor} has-text-{textColor}">
    <div class="card-header" style="box-shadow: none">
        <h2 class="card-header-title has-text-{textColor}">
            {#if link}
                <a href="/math-problems/{mathProblem.id}" class="has-text-{textColor}">{mathProblem.question}</a>
            {:else}
                {mathProblem.question}
            {/if}
        </h2>
    </div>

    <div class="card-content">
        {#if complete}
            {mathProblem.answer} Is correct
        {:else}
            <div class="field">
                <div class="control"><input class="input" placeholder="Type the answer" bind:value={guess} /></div>
            </div>
        {/if}
    </div>
</div>

<style>
    a:hover {
        opacity: 0.7;
    }
    a {
        border-bottom: 2px solid rgba(80,80,80,0.8);
        font-family: cursive;
        font-size: 1.5rem;
    }
</style>


<script>
    import colors from "../data/colors.js";

    export let mathProblem;
    export let tile = false;
    export let link = true;

    let bgColor = colors[mathProblem.id % colors.length][0];
    let textColor = colors[mathProblem.id % colors.length][1];

    let guess = "";
    $: guess = guess.replace(/[^0-9\.\-]/g, "")
    let complete;
    $: try {
        complete = mathProblem.answer === parseFloat(guess);
    } catch {
        complete = false;
    }
</script>