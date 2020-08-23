<svelte:head>
	<title>Math Problems</title>
</svelte:head>

<Header>Math Problems</Header>

<div class="tile is-ancestor" style="flex-wrap: wrap">
    {#each mathProblems as mathProblem, index}
        <div class="tile is-parent is-4">
            <MathProblem tile {mathProblem} />
        </div>
    {/each}
</div>

<script context="module">
	export async function preload(page, session) {
        const mathProblems = await this.fetch("/math-problems.json").then(data => data.json())
		return {mathProblems}
	}
</script>

<script>
    import MathProblem from "../../components/MathProblem.svelte";
    import Header from "../../components/Header.svelte";
    import colors from "../../data/colors.js"

    export let mathProblems;
</script>