<script>
    import {onMount, tick} from "svelte";

    export let books;
    let selectedBook = "genesis";
    let selectedChapter = 1;

    $: selectedBookIndex = books.indexOf(books.find(book => book.name === selectedBook));


    $: {
        selectedBook;
        selectedChapter = 1;
    }
</script>

<form>
    <select bind:value={selectedBook}>
        {#each books as book (book.name)}
            <option value={book.name}>{book.name}</option>
        {/each}
    </select>

    <select bind:value={selectedChapter}>
        {#each books[selectedBookIndex].chapters as chapter (chapter)}
            <option value={chapter}>{chapter}</option>
        {/each}
    </select>

    <a class="button is-primary" href="/bible/{selectedBook}/{selectedChapter}" type="submit">GO</a>
</form>