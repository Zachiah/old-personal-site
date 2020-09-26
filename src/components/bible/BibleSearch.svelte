<script>
    import TextField from "/components/TextField.svelte";
    import Checkbox from "/components/Checkbox.svelte";
    import Button from "/components/Button.svelte";
    import {goto} from "@sapper/app";
    import getSearchString from "/routes/bible/_getSearchString.js";
    import CollapsibleCard from "/components/CollapsibleCard.svelte";
    import {searchText, storageItems,searchCaseSensitive,searchExactMatch,searchWholeWords} from "/stores/bible.store.js";


    function isDisabled(value) {
        console.log(value)
        return value.trim(" ") === "" ? true : null;
    }

    function go() {
        if (!isDisabled($searchText)) {
            goto(getSearchString($searchText, $searchExactMatch, $searchCaseSensitive,$searchWholeWords));
        }
    }

    $: $searchText = $searchText.replace("'", '’');
</script>

<form on:submit|preventDefault={go} class="mb-4">
    <CollapsibleCard title="Search">
        <div slot="content">
            <TextField bind:value={$searchText} />
            <Checkbox bind:checked={$searchCaseSensitive}>Case Sensitive</Checkbox>
            <Checkbox bind:checked={$searchExactMatch}>Exact Match</Checkbox>
            <Checkbox bind:checked={$searchWholeWords}>Whole Words</Checkbox>
        </div>

        <div slot="footer">
            <div class="card-footer-item">
                <Button primary  disabled={isDisabled($searchText)} type="submit">Go</Button>
            </div>
        </div>
    </CollapsibleCard>
</form>
