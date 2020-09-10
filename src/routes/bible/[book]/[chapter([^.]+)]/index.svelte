<script context="module">
    export async function preload(page,session) {
        const {book,chapter} = page.params;
        
        // Getting the data
        let verses = (await this.fetch(`/bible/${book}/${chapter}.json`));
        if (verses.ok) {
            verses = await verses.json()
            const next = await (await this.fetch(`/bible/${book}/${chapter}/next.json`)).json();
            const previous = await (await this.fetch(`/bible/${book}/${chapter}/previous.json`)).json();

            // props to out component
            return {
                book,
                chapter: parseInt(chapter),
                verses,
                next,
                previous,
            }
        }
        this.error(404, 'Not found');
    }
</script>

<script>
    import ChapterHeader from "/components/bible/ChapterHeader.svelte";
    import Verse from "/components/bible/Verse.svelte";



    export let book;
    export let chapter;
    export let verses;
    export let next;
    export let previous;

</script>

<style>
    .verses-wrapper {
        text-align: justify;
        width: 100%;
        max-width: 35.5em;
        margin: auto;
    }
</style>


<div class="verses-wrapper">
    <ChapterHeader {book} {chapter} {next} {previous} />
    <div class="verses">
        {#each verses as verse}
            <Verse {verse} />
        {/each}
    </div>
    <ChapterHeader {book} {chapter} {next} {previous} />
</div>

