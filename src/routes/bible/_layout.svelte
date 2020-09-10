<script context="module">
    export async function preload(page,session) {
        return {
            books: await (await this.fetch('/bible/books-with-chapters.json')).json()
        }
    }
</script>

<script>
    import VersePicker from "/components/bible/VersePicker.svelte";

    export let books;
</script>

<VersePicker {books}/>

<slot></slot>