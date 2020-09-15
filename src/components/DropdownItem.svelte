<script>
    let className = "";
    export {className as class};

    export let style = "";
</script>

<style>
    div {
        border: 1px solid black;
        padding: 0.5em;
        margin: 0.1em 0;
    }
</style>

<div class={className} {style}><slot></slot></div>