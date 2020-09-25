<script context="module">
    import getSearchString from "/routes/bible/_getSearchString.js";

    export async function preload(page,session) {
        
        const {exactMatch,search,caseSensitive, wholeWords} = page.query;

        const baseUrl = getSearchString(search, exactMatch,caseSensitive,wholeWords) + "&page=";
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
                next: (+pageNum === +data.highestPage) ? null : baseUrl + (+pageNum+1)
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

    export let data;
    export let pageNum;
    export let prev;
    export let next;

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
    {#if prev !== null}
        <Button href={prev}>Prev</Button>
    {/if}
    {#if next !== null}
        <Button href={next}>Next</Button>
    {/if}

    <PrevNextHeader prevHref={prev} nextHref={next} showPrev={prev !== null} showNext={next !== null} bind:prevButton bind:nextButton>
        Page {pageNum}
    </PrevNextHeader>
{:else}
    There ain't not'in that matches you're search criteria. Please try somethin' else.
{/if}
