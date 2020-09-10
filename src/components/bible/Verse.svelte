<script>
    export let verse;
</script>

<style>
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

<div class="verse">
    <div class="verse-ref">{verse.verse}</div>
    <article>{verse.text}</article>
</div>