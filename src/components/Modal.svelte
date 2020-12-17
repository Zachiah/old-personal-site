<script>
    import Button from "/components/form/Button.svelte";

    export let open;
    export let title = null;

    const handleClick = (e) => {
        if (e.target === e.currentTarget) closeIt();
    }

    const closeIt = () => open = false;
</script>

{#if open}
    <div class="p-16 fixed top-0 right-0 left-0 bottom-0 overflow-auto" style="z-index: 1000; background-color: rgba(80,80,80,0.4)" on:click={handleClick}>
        <div class="bg-white h-full p-4">
            {#if title}
                <h1 class="text-xl">{title}</h1>
            {/if}
            <Button class="absolute top-0 right-0 mt-2 mr-2" theme="red" on:click={closeIt}>Close</Button>
            <slot></slot>
        </div>
    </div>
{/if}