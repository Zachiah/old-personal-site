<script>
import Error from "../routes/_error.svelte";

    export let primary = false;
    export let secondary = false;
    export let danger = false;
    export let warning = false;

    export let href = undefined;

    export let tag = href ? "a" : "button";

    $: if (tag !== "button" && tag !== "div" && tag !== "span" && tag !== "a") {
        throw new Error("Button.svelte Invalid tag '" + tag + "'");
    }

    const conClass = (value,className) => value ? className : '';

    $: className = `button ${conClass(primary,'is-primary')} ${conClass(secondary,'is-secondary')} ${conClass(danger,'is-danger')} ${conClass(warning,'is-warning')}`;
</script>

{#if tag === "button"}
    <button class={className} on:click>
        <slot></slot>
    </button>
{:else if tag === "span"}
    <span class={className} on:click>
        <slot></slot>
    </span>
{:else if tag === "div"}
    <div class={className} on:click>
        <slot></slot>
    </div>
{:else if tag == "a"}
    <a class={className} {href} on:click>
        <slot></slot>
    </a>
{/if}