<script>
    export let theme = "green";
    export let disabled = false;
    export let type = null;
    let className = "";
    export {className as class}
    export let style = "";
    export let tabindex = null
</script>

<button
    class="hover:bg-{theme}-300 {disabled ? `p-3 bg-${theme}-300 text-gray-600` : `p-3 bg-${theme}-500`} {className}"
    {type}
    on:click
    {style}
    {tabindex}
>
    <slot></slot>
</button>