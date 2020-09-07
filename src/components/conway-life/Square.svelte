<script>
    export let alive;
</script>

<style>
    button {
        flex-grow: 1;
        position: relative;
        box-sizing: border-box;
        padding: 0;
        display: block;
        box-shadow: none;
        border: 1px solid black;
    }
    button::after {
        padding-bottom: 100%;
        content: "";
        display: block;
    }
</style>

<button on:click={() => alive = 1-alive} style="background: {alive ? 'black' : 'white'}"></button>