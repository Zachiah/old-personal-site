<script context="module">
    import getSearchString from "/routes/bible/_getSearchString.js";

    export async function preload(page,session) {
        
        const {exactMatch,search,caseSensitive, wholeWords, regex} = page.query;

        const baseUrl = getSearchString(search, exactMatch,caseSensitive,wholeWords,regex) + "&page=";
        const baseApiUrl = baseUrl.replace("/bible/search", "/bible/api/search.json");

        let pageNum = page.query.page;

        pageNum = pageNum ? pageNum : 1;

        let data = await this
            .fetch(baseApiUrl + pageNum);
        
        if (data.ok) {
            data = await (data).json()
            return {
                data,
                pageNum,
                prev: (+pageNum === 1) ? null : baseUrl + (pageNum-1),
                next: (+pageNum === +data.highestPage) ? null : baseUrl + (+pageNum+1),
                exactMatch,
                search,
                caseSensitive,
                wholeWords,
                regex
            }
        } else {
            this.error(404,'not found')
        }
        

    }
</script>

<script>
    import Verse from "/components/bible/Verse.svelte";
    import Button from "/components/Button.svelte";
    import PrevNextHeader from "/components/bible/PrevNextHeader.svelte";
    import {searchText, searchExactMatch,searchCaseSensitive,searchWholeWords,searchRegex} from "/stores/bible.store.js";

    export let data;
    export let pageNum;
    export let prev;
    export let next;
    export let search;
    export let exactMatch;
    export let caseSensitive;
    export let wholeWords;
    export let regex;

    $: $searchText = search;
    $: $searchExactMatch = exactMatch;
    $: $searchCaseSensitive = caseSensitive;
    $: $searchWholeWords = wholeWords;
    $: $searchRegex = regex;

    let prevButton;
    let nextButton;

    function handleKeyup(event) {
        if (event.target.nodeName !== "INPUT") {
            switch (event.keyCode) {
                case 37: // LEFT
                    prevButton.click();
                    break
                case 39: // RIGHT
                    nextButton.click();
                    break
            }
        }
    }
</script>

<svelte:body on:keyup={handleKeyup} />


{#if data.results.length > 0}
    {#each data.results as verse}
        <Verse book={verse.book} chapter={verse.chapter} verse={verse.verse} individual>
            {@html verse.anotatedText}
        </Verse>
    {/each}
    
    <PrevNextHeader prevHref={prev} nextHref={next} showPrev={prev !== null} showNext={next !== null} bind:prevButton bind:nextButton>
        Page {pageNum} of {data.highestPage}
    </PrevNextHeader>
{:else}
    There ain't not'in that matches you're search criteria. Please try somethin' else.
{/if}
