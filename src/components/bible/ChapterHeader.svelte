<script>
    import PrevNextHeader from "/components/bible/PrevNextHeader.svelte";

    export let book;
    export let chapter;
    export let previous;
    export let next;
    export let floating = false;

    export let leftButton = undefined;
    export let rightButton = undefined;
</script>


<PrevNextHeader {floating} prevHref="/bible/{previous.book}/{previous.chapter}" nextHref="/bible/{next.book}/{next.chapter}" bind:prevButton={leftButton} bind:nextButton={rightButton}>
    {book} {chapter}
</PrevNextHeader>