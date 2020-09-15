<script context="module">
    export async function preload(page,session) {
        return {
            books: await (await this.fetch('/bible/api/references.json')).json()
        }
    }
</script>

<script>
    import VersePicker from "/components/bible/VersePicker.svelte";
    import Header from "/components/Header.svelte";

    import {bookmarks} from "/stores/bible.store.js";

    $: process.browser && localStorage.setItem('bible-bookmarks', JSON.stringify($bookmarks));

    export let books;
</script>

<Header>KJV Bible</Header>
<VersePicker {books}/>

<slot></slot>