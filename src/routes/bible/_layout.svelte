<script context="module">
    export async function preload(page,session) {
        return {
            books: await (await this.fetch('/bible/api/references.json')).json()
        }
    }
</script>

<script>
    import VersePicker from "/components/bible/VersePicker.svelte";
    import VerseContainer from "/components/bible/VerseContainer.svelte";
    import Header from "/components/Header.svelte";
    import BibleSearch from "/components/bible/BibleSearch.svelte";

    import {bookmarks,searchText,searchExactMatch,searchWholeWords,searchCaseSensitive,searchRegex,storageItems} from "/stores/bible.store.js";

    $: process.browser && localStorage.setItem(storageItems.bookmarks, JSON.stringify($bookmarks));
    $: process.browser && localStorage.setItem(storageItems.searchText, JSON.stringify($searchText));
    $: process.browser && localStorage.setItem(storageItems.searchExactMatch, JSON.stringify($searchExactMatch));
    $: process.browser && localStorage.setItem(storageItems.searchWholeWords, JSON.stringify($searchWholeWords));
    $: process.browser && localStorage.setItem(storageItems.searchCaseSensitive, JSON.stringify($searchCaseSensitive));
    $: process.browser && localStorage.setItem(storageItems.searchRegex,JSON.stringify($searchRegex));

    export let books;
</script>


<Header>KJV Bible</Header>
<VersePicker {books}/>

<VerseContainer>
    <BibleSearch/>
    <slot></slot>
</VerseContainer>