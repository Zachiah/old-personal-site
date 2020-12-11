<script>
    import Button from "/components/form/Button.svelte";

    export let visible = false;

    const toggleVisible = () => visible = !visible;
</script>

<div class="relative">
    {#if visible}

        <Button
            theme="orange"
            class="absolute w-full h-full"
            style="z-index:1"
            on:click={toggleVisible}
        >Hide</Button>
    {:else}
        <Button
            class="absolute w-full h-full"
            style="z-index:1"

            on:click={toggleVisible}
        >Show</Button>
    {/if}


    <!--Make sure it doesn't change size MMMM is longer than Show or Hide for sure-->
    <Button disabled tabindex="-1">MMMM</Button>
</div>