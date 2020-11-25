<!-- This doesn't replace the <select> tag... only use it if you need a collapsible pain-->

<script>
    import Button from "/components/old/Button.svelte";
    import {fade} from "svelte/transition";

    export let title;

    // It's just the default state even though that is similar to notActive it's not quite the same
    export let active = false;
    export let notActive = false;

    export let hasFooter = true;
</script>

<style>
    .card-header-icon {
        transform: rotate(-90deg);
        margin-left: auto;
        color: blue;
        background: transparent;
        border: 1px solid blue;
    }
    .card-header-icon.active {
        transform: rotate(90deg);
        transition-duration: 1s;
    }
    .card-header-icon.notActive {
        transition-duration: 1s;
    }
</style>


<div class="card">
    <div class="card-header">
        <div class="card-header-title">{title}</div>
        <button class:active class:notActive class="card-header-icon" type="button" on:click|preventDefault={() => {active = !active; notActive = !active}}>&lt;</button>
    </div>

    {#if active}
        <div class="card-content" transition:fade>
            <slot name="content"></slot>
        </div>
        {#if hasFooter}
            <div class="card-footer" transition:fade>
                <slot name="footer"></slot>
            </div>
        {/if}
    {/if}
</div>