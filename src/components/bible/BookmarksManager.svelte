<script>
    // Component Imports
    import CollapsibleCard from "/components/CollapsibleCard.svelte";
    import DropdownItem from "/components/DropdownItem.svelte";
    import Button from "/components/form/Button.svelte";
    import TextField from "/components/old/TextField.svelte";

    // Store Imports
    import {bookmarks} from "/stores/bible.store.js";
    
    // Props
    export let book;
    export let chapter;

    // State
    let newName = "";

    // Handlers
    const handleDelete = (index) => {
        $bookmarks = [...$bookmarks.slice(0,index), ...$bookmarks.slice(index+1)];
    }

    const handleSetToCurrent = (index) => {
        $bookmarks[index] = {...$bookmarks[index], book, chapter};
    }

    const handleBookmarkCurrent = () => {
        $bookmarks = [...$bookmarks, {name: newName, book,chapter}];
        newName = ""
    }
</script>

<style>
    span {
        align-self: center;
    }
</style>

<CollapsibleCard title="Bookmarks">
    <div slot="content">
        {#each $bookmarks as bookmark, index}
            <DropdownItem style="display: flex;">
                <span class="mr-2"><TextField bind:value={$bookmarks[index].name} inline>{bookmark.book} {bookmark.chapter}</TextField></span>

                <Button
                    style="margin-left: auto"
                    class="mr-2"
                    disabled={book === bookmark.book && chapter === bookmark.chapter}
                    on:click={() => handleSetToCurrent(index)}
                    >
                    Set to current
                </Button>

                <Button theme="green" class="mr-2" href="/bible/{bookmark.book}/{bookmark.chapter}">Go</Button>

                <Button theme="red" on:click={() => handleDelete(index)}>Delete</Button>
            </DropdownItem>
        {/each}
    </div>

    <div slot="footer" class="card-footer-item">
        <DropdownItem>
            <h3 class="title is-3">New Bookmark</h3>
            <TextField placeholder="ex. Where I am" bind:value={newName}>Name</TextField>
            <Button disabled={!newName.trim()} on:click={handleBookmarkCurrent}>Bookmark current</Button>
        </DropdownItem>
    </div>
</CollapsibleCard>