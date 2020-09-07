<script context="module">
    export async function preload(page,session) {
        let {grid} = page.params;

        grid = grid.split("_").map(item => item.split("-").map(item2 => parseInt(item2)));
        console.log("grid",grid);
        function countedToMade(arr) {
            let made = [];
            let cur = 0;
            for (let item of arr) {
                made.push(...new Array(item).fill(cur));
                cur = 1 - cur;
            }
            return made;
        }

        grid = grid.map(row => countedToMade(row));


        return {grid}
    }
</script>

<script>
    import ConwayLife from "/components/conway-life/ConwayLife.svelte";
    export let grid;

    console.log(grid);
</script>

<ConwayLife {grid} />