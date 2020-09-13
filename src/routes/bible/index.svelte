<script>
    import {goto} from "@sapper/app";

    if (process.browser) {
        let lastChapter = localStorage.getItem('bible-lastChapter');

        const [book, chapter] = lastChapter ? lastChapter.split(" ") : ["genesis", 1];
        goto(`/bible/${book}/${chapter}`);
    }
</script>