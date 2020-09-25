<script>
    export let checked;
</script>

<label class="checkbox">
    <input type="checkbox" bind:checked>
    <slot></slot>
</label>