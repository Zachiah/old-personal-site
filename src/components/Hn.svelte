<script>
    export let n;

    let className = "";
    export {className as class}
</script>

<!--Intentional double = not triple = incase they pass a string-->
{#if n == 1}
    <h1 class={className}><slot></slot></h1>
{:else if n == 2}
    <h2 class={className}><slot></slot></h2>
{:else if n == 3}
    <h3 class={className}><slot></slot></h3>
{:else if n == 4}
    <h4 class={className}><slot></slot></h4>
{:else if n == 5}
    <h5 class={className}><slot></slot></h5>
{:else if n == 6}
    <h6 class={className}><slot></slot></h6>
{:else}
    Invalid header nana nana boo boo
{/if}