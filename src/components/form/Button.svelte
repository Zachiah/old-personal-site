<script>
    export let theme = "green";
    export let disabled = false;
    export let href = null;
    let className = "";
    export {className as class}

    $: computedClass = `hover:bg-${theme}-300 ${disabled ? `p-3 bg-${theme}-300 text-gray-600` : `p-3 bg-${theme}-500`} ${className}`;
</script>

{#if href !== null && href !== undefined}
    <a
        class={computedClass}
        on:click
        {href}
        {...$$restProps}
    >
        <slot></slot>
    </a>
{:else}
    <button
        class={computedClass}
        on:click
        {...$$restProps}
    >
        <slot></slot>
    </button>
{/if}