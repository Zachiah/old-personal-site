<script>
    import TextField from "/components/old/TextField.svelte";
    import Checkbox from "/components/Checkbox.svelte";
    import Button from "/components/form/Button.svelte";
    import {goto} from "@sapper/app";
    import getSearchString from "/routes/bible/_getSearchString.js";
    import CollapsibleCard from "/components/CollapsibleCard.svelte";
    import {searchText, storageItems,searchCaseSensitive,searchExactMatch,searchWholeWords,searchRegex} from "/stores/bible.store.js";
    import parseRegex from "/routes/bible/_parseRegex.js";


    function isDisabled(value) {
        console.log(value)
        if (value.trim(" ") === "") {
            return true;
        }
        else if ($searchRegex && !validRegex) {
            return true
        }

        return false;
    }

    function go() {
        if (!isDisabled($searchText)) {
            goto(getSearchString($searchText, $searchExactMatch, $searchCaseSensitive,$searchWholeWords,$searchRegex));
        }
    }

    $: $searchText = $searchText.replace("'", '’');
    $: validRegex = $searchRegex ? parseRegex($searchText) : null;
</script>

<form on:submit|preventDefault={go} class="mb-4">
    <CollapsibleCard title="Search">
        <div slot="content" class="dc">
            <TextField bind:value={$searchText} />
            <Checkbox bind:checked={$searchCaseSensitive} disabled={$searchRegex}>Case Sensitive</Checkbox>
            <Checkbox bind:checked={$searchExactMatch} disabled={$searchRegex}>Exact Match</Checkbox>
            <Checkbox bind:checked={$searchWholeWords} disabled={$searchRegex}>Whole Words</Checkbox>
            <Checkbox bind:checked={$searchRegex}>Regex</Checkbox>

            {#if $searchRegex && !validRegex}
                <p class="notification is-warning">
                    You are using regular expressions and your expression is invalid.<br />
                    Format your regular expression as a javaScript literal ex.<br />
                    /[aeiou][aeiou][aeiou]/g<br />
                </p>
            {/if}
        </div>

        <div slot="footer" class="dc">
            <div class="card-footer-item">
                <Button class="px-5" theme="green"  disabled={isDisabled($searchText)} type="submit">Go</Button>
            </div>
        </div>
    </CollapsibleCard>
</form>
