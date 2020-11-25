<script>
    export let href = null;

    let className = "";
    export {className as class};

    export let size = 10;
</script>

{#if href}
    <a
        href={href}
        class="
            block
            w-{size}
            h-{size}
            p-1
            rounded-full
            hover:bg-blue-500
            focus:outline-none
            focus:shadow-outline
            active:bg-blue-700
            rounded-r-full
            {className}"
        on:click
        on:focus
        on:blur
        on:mouseover
        on:mouseout
        {...$$restProps}
    > 
    <slot></slot>
    </a>
{:else}
    <button
        {href}
        class="
            block
            w-{size}
            h-{size}
            p-1
            rounded-full
            hover:bg-blue-500
            focus:outline-none
            focus:shadow-outline
            active:bg-blue-700
            rounded-r-full
            {className}"
        on:click
        on:focus
        on:blur
        on:mouseover
        on:mouseout
        {...$$restProps}
    > 
        <slot></slot>
    </button>
{/if}