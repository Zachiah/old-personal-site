<script>
    import Hn from "/components/Hn.svelte";

    export let placeholder = "";
    export let inputClass = "";
    export let required = false;
    export let headerLevel = 2;

    export let value = "";

    let className = "";
    export {className as class}
    export let style = "";
</script>
{#if $$slots.default}
    <div class="mb-4">
        
            <label>
                <Hn n={headerLevel} class="block text-gray-700 text-sm font-bold mb-2 {className}">
                    <slot></slot>
                </Hn>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline {inputClass}"
                    type="text"
                    {placeholder}
                    {required}
                    bind:value
                    {style}
                    on:blur
                    on:focus
                />
            </label>

    </div>
{:else}
    <input 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline {inputClass}"
        type="text"
        {placeholder}
        {required}
        bind:value
        {style}
        on:blur
        on:focus
    />
{/if}