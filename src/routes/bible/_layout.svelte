<script context="module">
    export async function preload(page,session) {
        return {
            books: await (await this.fetch('/bible/api/books-with-chapters.json')).json()
        }
    }
</script>

<script>
    import VersePicker from "/components/bible/VersePicker.svelte";
    import Header from "/components/Header.svelte";

    export let books;
</script>

<Header>KJV Bible</Header>
<VersePicker {books}/>

<slot></slot>