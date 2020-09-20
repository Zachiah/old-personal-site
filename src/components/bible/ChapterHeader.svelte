<script>
    import Button from "/components/Button.svelte";

    export let book;
    export let chapter;
    export let previous;
    export let next;
    export let floating = false;

    export let leftButton = undefined;
    export let rightButton = undefined;
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
</div>