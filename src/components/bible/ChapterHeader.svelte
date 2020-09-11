<script>
    export let book;
    export let chapter;
    export let previous;
    export let next;

    export let leftButton = undefined;
    export let rightButton = undefined;
</script>

<style>
    .the-buttons {
        display: flex;
    }
    .the-buttons :last-child {
        margin-left: auto;
        flex-grow: 1;
    }
    .the-buttons :first-child {
        flex-grow: 1;
    }
    .the-buttons :nth-child(2) {
        flex-grow: 3;
    }
    .the-buttons {
        margin: 0.5em 0;
    }
</style>

<div class="the-buttons">
    <a class="button is-primary" href="/bible/{previous.book}/{previous.chapter}" bind:this={leftButton}>&lt; Previous</a>
    <div class="button">{book} {chapter}</div>
    <a class="button is-primary" href="/bible/{next.book}/{next.chapter}" bind:this={rightButton}>Next &gt;</a>
</div>