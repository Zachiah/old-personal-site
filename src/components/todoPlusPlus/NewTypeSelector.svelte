<script>
    import FAB from "/components/FAB.svelte";

    let newTypeSelectorOpen = false;

    let typeSelectorTypes = [
        {
            text: 'A book; Based on chapters or pages',
            href: 'book',
            hover: false
        },
        {
            text: 'Custom; Put whatever you want on your todo list',
            href: 'custom',
            hover: false
        }
    ]
</script>

<div class="fixed bottom-0 right-0 mb-4 mr-4 flex flex-col items-end">
    {#if newTypeSelectorOpen}
        {#each typeSelectorTypes as selectorType, index}
            <section class="flex w-full mb-3" on:mouseout={() => {selectorType.hover = false}} on:mouseover={() => {selectorType.hover = true}}>
                <p class="mr-2 self-center bg-blue-500 p-2 rounded-r-full flex-1 {selectorType.hover ? '' : 'invisible'}">
                    {selectorType.text}
                </p>
                <FAB size="8" href="/todo-plus-plus/new/{selectorType.href}" class="mr-1">
                    {#if index === 0}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    {:else if index === 1}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    {:else}
                        IMPLEMENT!
                    {/if}
                </FAB>
            </section>
        {/each}
    {/if}  

    <FAB size="10" on:click={() => {newTypeSelectorOpen = ! newTypeSelectorOpen}} class="bg-blue-500 text-white">
        {#if newTypeSelectorOpen}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        {/if} 
    </FAB>
</div>