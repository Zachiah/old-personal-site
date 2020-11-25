<script>
    import TextInput from "./TextInput.svelte";

    export let placeholder = "";
    export let inputClass = "";
    export let required = false;
    export let headerLevel = 2;

    export let value;

    let className = "";
    export {className as class}

    let rawValue;

    $: rawValue = `${rawValue}`.replace(/[^0-9]/g, '') || undefined;
    $: value = parseInt(rawValue);
</script>

<TextInput bind:value={rawValue} {placeholder} {inputClass} {required} {headerLevel} class={className}>
    <slot></slot>
</TextInput>