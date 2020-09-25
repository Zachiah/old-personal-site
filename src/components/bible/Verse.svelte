<script>
    import highlightWithHash from "/actions/highlightWithHash.js";

    export let book;
    export let chapter;
    export let verse;
    export let text = null;
    export let hasId = true;
    export let individual = false;

    $: id = hasId ? `${book}_${chapter}_${verse}` : null;
</script>

<style lang="scss">
    .verse {
        border-top: 0.5px solid black;
        clear: both;
    }
    .verse:first-of-type {
        border-top: 0;
    }
    .verse-ref {
        float: left;
        margin-right: 0.5em;
        padding: 0.1em;
        font-weight: bold;
        background-color: #00d1b2;
        font-size: 0.9em;
    }
</style>

<div class="verse" use:highlightWithHash={{color: "#00d1b2", dur: 2000}} {id}>
    <div class="verse-ref">
        {#if individual}
            {book} {chapter}:{verse}
        {:else}
            {verse}
        {/if}
    </div>
    <article>
        {#if text}
            {text}
        {:else}
            <slot></slot>
        {/if}
    </article>
</div>