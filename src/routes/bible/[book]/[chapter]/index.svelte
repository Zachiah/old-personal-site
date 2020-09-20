<!--TODO: add hammer js and support swiping-->

<script context="module">
    export async function preload(page,session) {
        const {book,chapter} = page.params;
        
        // Getting the data
        let verses = (await this.fetch(`/bible/api/${book}/${chapter}.json`));
        if (verses.ok) {
            verses = await verses.json()
            const next = await (await this.fetch(`/bible/api/${book}/${chapter}/next.json`)).json();
            const previous = await (await this.fetch(`/bible/api/${book}/${chapter}/previous.json`)).json();

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
    import VerseContainer from "/components/bible/VerseContainer.svelte";
    import BookmarksManager from "/components/bible/BookmarksManager.svelte";

    export let book;
    export let chapter;
    export let verses;
    export let next;
    export let previous;
    
    let leftButton;
    let rightButton;
    
    function handleKeyup(event) {
        if (event.target.nodeName !== "INPUT") {
            switch (event.keyCode) {
                case 37: // LEFT
                    leftButton.click();
                    break
                case 39: // RIGHT
                    rightButton.click();
                    break
            }
        }
    }

    $: if (process.browser) localStorage.setItem('bible-lastChapter', `${book} ${chapter}`);
</script>



<svelte:body on:keyup={handleKeyup} />

<VerseContainer>
    <BookmarksManager {book} {chapter}/>

    <ChapterHeader {book} {chapter} {next} {previous} bind:leftButton={leftButton} bind:rightButton={rightButton} floating />
    <div class="verses">
        {#each verses as verse}
            <Verse {book} {chapter} {...verse}/>
        {/each}
    </div>
    <ChapterHeader {book} {chapter} {next} {previous} />
</VerseContainer>

