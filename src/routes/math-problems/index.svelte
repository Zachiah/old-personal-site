<script>
    import MathProblem from "../../components/MathProblem.svelte";
    import Header from "../../components/Header.svelte";
    import colors from "../../data/colors.js";

    import {Collection} from "/sveltefire.js";
</script>

<svelte:head>
	<title>Math Problems</title>
</svelte:head>

<Header>Math Problems</Header>

<div class="tile is-ancestor" style="flex-wrap: wrap">
    <Collection path="mathProblems" let:data={mathProblems}>
        {#each mathProblems as mathProblem, index}
            <div class="tile is-parent is-4">
                <MathProblem tile {mathProblem} />
            </div>
        {/each}
    </Collection>
</div>