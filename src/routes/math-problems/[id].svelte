<Header>Math Problem {mathProblem.id}</Header>
<p class="mb-4">
    <a href="/math-problems" class="button is-primary">Back to Math Problems</a>
</p>
<MathProblem {mathProblem} link={false} />

<script context="module">
    export async function preload(page,session) {
        const {id} = page.params;

        const mathProblem = await this.fetch(`/math-problems/${id}.json`).then(data => data.json());
        return {mathProblem}
    }
</script>

<script>
    import MathProblem from "../../components/MathProblem.svelte";
    import Header from "../../components/Header.svelte";

    export let mathProblem;
</script>