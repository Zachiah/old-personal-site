<script context="module">
    let total = 0;
</script>

<script>
    export let value = "";
    export let disabled = false;
    export let inline = false;

    let className = "";
    export {className as class}

    export let style = "";

    export let type = "text";

    total++;
</script>


<div class="field {className}" style="{inline ? 'display: inline-block' : ''} {style}">
    <label for="text-field-{total}" class="label" style={inline ? 'display: block' : ''}>
        <slot></slot>
    </label>

    <div class="control">
        {#if type === "text"}
            <input type="text" class="input" id="text-field-{total}" {disabled} bind:value />
        {:else if type === "number"}
            <input type="number" class="input" id="text-field-{total}" {disabled} bind:value />
        {:else}
            That input type isn't supported sorry
        {/if}
    </div>
</div>