<!-- This doesn't replace the <select> tag... only use it if you need a collapsible pain-->

<script>
    import Button from "/components/Button.svelte";
    import {fade} from "svelte/transition";

    export let title;

    // It's just the default state even though that is similar to notActive it's not quite the same
    export let active = false;
    export let notActive = false;
</script>

<style>
    .dropdown {
        display: flex;
        flex-direction: column;
    }

    .content {
        display: flex;
        flex-direction: column;
        z-index: 10;
        background: white;
        width: 100%;
    }
    span {
        transform: rotate(-90deg);
        margin-left: auto;
    }
    span.active {
        transform: rotate(90deg);
        transition-duration: 1s;
    }
    span.notActive {
        transition-duration: 1s;
    }
</style>


<div class="dropdown">
    <Button primary on:click={() => {active = !active; notActive = !active}} >{title} <span class:active class:notActive>&lt;</span></Button>

    {#if active}
        <div class="content" transition:fade>
            <slot></slot>
        </div>
    {/if}
</div>