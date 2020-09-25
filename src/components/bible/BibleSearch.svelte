<script>
    import TextField from "/components/TextField.svelte";
    import Checkbox from "/components/Checkbox.svelte";
    import Button from "/components/Button.svelte";
    import {goto} from "@sapper/app";
    import getSearchString from "/routes/bible/_getSearchString.js";

    let value = "";
    let caseSensitive = false;
    let exactMatch = false;
    let wholeWords = false;



    function isDisabled(value) {
        console.log(value)
        return value.trim(" ") === "" ? true : null;
    }

    function go() {
        if (!isDisabled(value)) {
            goto(getSearchString(value, exactMatch, caseSensitive,wholeWords));
        }
    }

    $: value = value.replace("'", '’')
</script>

<form on:submit|preventDefault={go} class="mb-4">
<div class="card mt-5">
    <div class="card-header">
        <div class="card-header-title">Search</div>
    </div>

    <div class="card-content">
        <TextField bind:value={value} />
        <Checkbox bind:checked={caseSensitive}>Case Sensitive</Checkbox>
        <Checkbox bind:checked={exactMatch}>Exact Match</Checkbox>
        <Checkbox bind:checked={wholeWords}>Whole Words</Checkbox>
    </div>

    <div class="card-footer">
        <div class="card-footer-item">
            <Button primary  disabled={isDisabled(value)} type="submit">Go</Button>
        </div>
    </div>
</div>
</form>
