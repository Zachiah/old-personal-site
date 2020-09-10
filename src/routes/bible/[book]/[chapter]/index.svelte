<script context="module">
    export async function preload(page,session) {
        const {book,chapter} = page.params;
        
        
        const verses = await (await this.fetch(`/bible/${book}/${chapter}.json`)).json();

        return {
            book,
            chapter: parseInt(chapter),
            verses,
        }
    }
</script>

<script>
    import Header from "/components/Header.svelte";

    import {tick} from "svelte";

    import {selectedBook, selectedChapter} from "/stores/bible-store.js";

    export let book;
    export let chapter;
    export let verses;

    $: {$selectedBook = book;};
    $: {$selectedChapter = chapter;};
</script>

<style>
    .verse-ref {
        float: left;
        margin-right: 0.5em;
        padding: 0.1em;
        font-weight: bold;
        background-color: #00d1b2;
        font-size: 0.9em;
    }
    .verses-wrapper {
        text-align: justify;
        width: 100%;
        max-width: 35.5em;
        margin: auto;
    }
    .verse {
        border-top: 0.5px solid black;
        clear: both;
    }
    .verse:first-of-type {
        border-top: 0;
    }
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

<Header style="text-align: center;">{book} {chapter}</Header>


<div class="verses-wrapper">
    <div class="verses">
        {#each verses as verse}
            <div class="verse">
                <div class="verse-ref">{verse.verse}</div>
                <article>{verse.text}</article>
            </div>
        {/each}
    </div>
    <div class="the-buttons">
        <a class="button is-primary" href="/bible/{book}/{chapter-1}">&lt; Previous</a>
        <div class="button">{book} {chapter}</div>
        <a class="button is-primary" href="/bible/{book}/{chapter+1}">Next &gt;</a>
    </div>
</div>

