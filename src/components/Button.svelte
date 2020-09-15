<script>
    let _className = "";
    export {_className as class};

    export let button = null;
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

    $: className = `button ${conClass(primary,'is-primary')} ${conClass(secondary,'is-secondary')} ${conClass(danger,'is-danger')} ${conClass(warning,'is-warning')} ${_className}`.trim();
</script>

{#if tag === "button"}
    <button class={className} bind:this={button} on:click on:blur on:focus {...$$restProps}>
        <slot></slot>
    </button>
{:else if tag === "span"}
    <span class={className} bind:this={button} on:click on:blur on:focus {...$$restProps}>
        <slot></slot>
    </span>
{:else if tag === "div"}
    <div class={className} bind:this={button} on:click on:blur on:focus {...$$restProps}>
        <slot></slot>
    </div>
{:else if tag == "a"}
    <a class={className} {href}  bind:this={button} on:click on:blur on:focus {...$$restProps}>
        <slot></slot>
    </a>
{/if}