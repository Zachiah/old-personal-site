<script context="module">
    export async function preload(page,session) {
        const {book,chapter, verse} = page.params;
        
        // Getting the data
        let text = (await this.fetch(`/bible/api/${book}/${chapter}/${verse}.json`));
        if (text.ok) {
            text = (await text.json()).text;

            // props to out component
            return {
                book,
                chapter: parseInt(chapter),
                verse: parseInt(verse),
                text
            }
        }
        this.error(404, 'Not found');
    }
</script>

<script>
    import Verse from "/components/bible/Verse.svelte";
    import VerseContainer from "/components/bible/VerseContainer.svelte";
    import Button from "/components/Button.svelte";



    export let book;
    export let chapter;
    export let verse;
    export let text;
    
    let leftButton;
    let rightButton;

</script>


<VerseContainer>
    <Button primary class="mb-2" href="/bible/{book}/{chapter}#{book}_{chapter}_{verse}">Full Chapter</Button>
    <Verse {book} {chapter} {verse} {text}/>
</VerseContainer>

