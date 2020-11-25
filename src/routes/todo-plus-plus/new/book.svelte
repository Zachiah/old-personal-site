<script>
    import TextInput from "/components/form/TextInput.svelte";
    import IntegerInput from "/components/form/IntegerInput.svelte";
    import NewTodoSubmit from "/components/todoPlusPlus/NewTodoSubmit.svelte";
    import Form from "/components/form/Form.svelte"; 
    import Loader from "/components/Loader.svelte";

    let amount;
    let title = "";
    let chaptersOrPages = "pages";
    let loading = false;
    let secondPage = false;

    //$: daysString = days ? ((days.length < 2) ? days[0] : (days ? days.slice(0,days.length-1).join(", ") + " and " + days[days.length-1] : '')) : '';

    $: valid = (amount && title) ? true : null;

    $: data = {
        title: `Read ${amount} ${chaptersOrPages} of ${title}`,
        singular: "Read page {n}",
        plural: "Read pages {start.n} - {end.n}",
        items: new Array(amount || 0).fill(true).map(item => ({}))
    } 
</script>

{#if loading}
    <Loader />
{:else if secondPage}
    <NewTodoSubmit thing="book" {data} on:back={() => {secondPage = false}} />
{:else}
    <Form on:submit={() => {secondPage = true}} title="New Todo Book">
        <TextInput required bind:value={title} placeholder="e.g. War and Peace">Book Title</TextInput>

        <label>
            <h2 class="block text-gray-700 text-sm font-bold mb-2">Keep track based on</h2>
            <select bind:value={chaptersOrPages}>
                <option value="pages">Pages</option>
                <option value="chapters">Chapters</option>
            </select>
        </label>

        <IntegerInput required bind:value={amount} placeholder="e.g. 500">How many {chaptersOrPages}</IntegerInput>

        <button
            class="hover:bg-green-300 ml-auto {valid ? 'p-3 bg-green-500': 'p-3 bg-green-300 text-gray-600'}"
            disabled={!valid} 
            type="submit"
        >next &gt;</button>
    </Form>
{/if}
 


