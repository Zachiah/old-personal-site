<script>
    import {onMount, tick} from "svelte";
    import {selectedBook, selectedChapter} from "/stores/bible-store.js";

    export let books;
    $: selectedBookIndex = books.indexOf(books.find(book => book.name === $selectedBook));
    $: console.log("selectedChapter",$selectedChapter, typeof $selectedChapter);
</script>

<form>
    <select bind:value={$selectedBook}>
        {#each books as book (book.name)}
            <option value={book.name}>{book.name}</option>
        {/each}
    </select>

    <select bind:value={$selectedChapter}>
        {#each books[selectedBookIndex].chapters as chapter (chapter)}
            <option value={chapter}>{chapter}</option>
        {/each}
    </select>

    <a class="button is-primary" href="/bible/{$selectedBook}/{$selectedChapter}" type="submit">GO</a>
</form>