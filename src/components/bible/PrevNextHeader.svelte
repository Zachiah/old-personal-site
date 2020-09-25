<script>
    import Button from "/components/Button.svelte";

    export let prevHref;
    export let nextHref;

    export let floating = false;

    export let prevButton = undefined;
    export let nextButton = undefined;

    export let showPrev = true;
    export let showNext = true;
</script>

<style lang="scss">
    .the-buttons {
        display: flex;
        margin: 0.5em 0;
    }

    .the-buttons-wrapper.floating {
        display: flex;
        margin: 0.5em 0;
        position: sticky;
        top: 0;
        background: white;
        margin-bottom: 25px;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid black;
        justify-items: center;
        
        .the-buttons {
            margin: 0;
            width: 100%;
        }
    }
</style>

<div class="the-buttons-wrapper {floating ? 'floating' : ''}">
    <div class="the-buttons">
        {#if showPrev}
            <Button
                primary
                href={prevHref}
                bind:button={prevButton}
                style="flex-grow: 1"
                >
                &lt; Previous
            </Button>
        {/if}

        <Button tag="div" disabled style="flex-grow: 3"><slot></slot></Button>

        {#if showNext}
            <Button
                primary
                href={nextHref}
                bind:button={nextButton}
                style="flex-grow: 1"
                >
                Next &gt;
            </Button>
        {/if}
    </div>
</div>