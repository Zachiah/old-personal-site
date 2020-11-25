<script>
    import {goto} from "@sapper/app";
    import Button from "/components/old/Button.svelte";

    export let books;
    let selectedBook = null;
    let selectedChapter = null;
    let selectedVerse = null;

    function range(start,stop,step=1) {
        let val = [];
        for (let i = start; i < stop; i += step) {
            val.push(i);
        }
        return val;
    }

    function submit() {
        const whereToGo = selectedVerse ? `/bible/${selectedBook}/${selectedChapter}/${selectedVerse}` : `/bible/${selectedBook}/${selectedChapter}`;
        selectedBook = selectedChapter = selectedVerse = null;
        console.log(whereToGo);
        goto(whereToGo);
    }

    $: selectedBookIndex = books.indexOf(books.find(book => book.name === selectedBook));


    $: {
        selectedBook;
        selectedChapter = null;
    }
    $: {
        selectedChapter;
        selectedVerse = null;
    }

    $: chapters = selectedBook ? books[selectedBookIndex].chapters : [];

    $: verses = selectedChapter ? range(1, chapters[selectedChapter-1].highestVerse+1) : [];
</script>

<style>
    .the-container {
        display: flex;
    }
    .the-container > * {
        align-self: center;
        margin-right: 0.5em;
    }
    @media (max-width: 750px) {
        .the-container {
            flex-direction: column;
        }
        .the-container > * {
            width: 100%;
        }
        .the-container .select select {
            margin: 0;
            width: 100%;
        }
    }
</style>

<div class="the-container">
    <span>Go Somewhere</span>

    <div class="select">
        <select bind:value={selectedBook}>
            <option value={null}>Select a Book</option>
            {#each books as book (book.name)}
                <option value={book.name}>{book.name}</option>
            {/each}
        </select>
    </div>

    {#if selectedBook}
        <div class="select">
            <select bind:value={selectedChapter}>
                <option value={null}>Select a chapter</option>
                {#each chapters as chapter (chapter)}
                    <option value={chapter.chapter}>{chapter.chapter}</option>
                {/each}
            </select>
        </div>
        {#if selectedChapter}
            <div class="select">
                <select bind:value={selectedVerse}>
                    <option value={null}>Whole Chapter</option>
                    {#each verses as verse}
                        <option value={verse}>{verse}</option>
                    {/each}
                </select>
            </div>

            <Button
                primary
                on:click={submit}
                disabled={!(selectedBook && selectedChapter)}
                >
                GO
            </Button>
        {/if}
    {/if}
</div>

