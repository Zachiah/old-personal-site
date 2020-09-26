<script>
    export let checked;
    export let disabled;
</script>

<label class="checkbox">
    <input type="checkbox" bind:checked {disabled}>
    <slot></slot>
</label>