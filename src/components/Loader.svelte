<script>
    export let size = 20;
</script>

<div class="w-{size} h-{size} rounded-full border-blue-500 border-t-4 max-w-full max-h-full"></div>

<style>
    @keyframes spinner {
        0% {transform: rotate(0)}
        100% {transform: rotate(360deg)}
    }
    div {
        animation-name: spinner;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>