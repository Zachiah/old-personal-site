<script>
    import highlightWithHash from "/actions/highlightWithHash.js";

    export let book;
    export let chapter;
    export let verse;
    export let text;
    export let hasId = true;

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
    <div class="verse-ref">{verse}</div>
    <article>{text}</article>
</div>