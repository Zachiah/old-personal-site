
<script context="module">
    export async function preload(page,session) {
        const {id} = page.params;

        return {id}
    }
</script>

<script>
    import MathProblem from "../../components/MathProblem.svelte";
    import Header from "../../components/Header.svelte";
    import {Doc} from "/sveltefire.js";

    export let id;
</script>

<Doc path="mathProblems/{id}" let:data={mathProblem}>
    <Header>Math Problem {id}</Header>
    <p class="mb-4">
        <a href="/math-problems" class="button is-primary">Back to Math Problems</a>
    </p>
    <MathProblem mathProblem={{...mathProblem,id}} link={false} />
</Doc>
