<script>
    import Button from "/components/Button.svelte";

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
        margin: 0.5em 0;
    }
</style>

<div class="the-buttons">
    <Button
        primary
        href="/bible/{previous.book}/{previous.chapter}"
        bind:button={leftButton}
        style="flex-grow: 1"
        >
        &lt; Previous
    </Button>

    <Button tag="div" disabled style="flex-grow: 3">{book} {chapter}</Button>

    <Button
        primary
        href="/bible/{next.book}/{next.chapter}"
        bind:button={rightButton}
        style="flex-grow: 1"
        >
        Next &gt;
    </Button>
</div>