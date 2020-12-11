<script>
    import Button from "/components/form/Button.svelte";
    import Modal from "/components/Modal.svelte";
    import dateFormatter from "/util/dateFormatter.js";
    import template from "/util/template.js";

    export let day;
    export let todo;
    export let todosRef;

    async function handleCheckboxInput(e) {
        todo.items = todo
                        .items
                        .map(
                            (item,index) => (
                                (todo.schedule[day].indexOf(index) !== -1) ?
                                    {...item, completed: e.target.checked} :
                                    item
                            )
                        );
    }

    $: {
        todo;
        //todosRef.doc(todo.id).set(todo.toJSON());
    }

    let modalOpen = false;
</script>

<td class="pl-4 border-black border-2 bg-{todo.cellColor(day)}">
    {#if todo.schedule[day]}
        <div class="flex items-center">
            <div>
                {todo.formatDay(day)} 
            </div>

            <input
                class="w-8 h-8 ml-auto"
                type="checkbox"
                checked={todo.completion(day) === 1}
                on:input={handleCheckboxInput}
            />
            <Button theme="gray" on:click={() => {modalOpen = true}}>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </Button>
        </div>
    {/if}
</td>

<Modal bind:open={modalOpen} title="{dateFormatter.format(new Date(day))} for {todo.title}">
    <ul>
        {#each todo.schedule[day] as index}
            <li>
                <label>
                    <input
                        type="checkbox"
                        bind:checked={todo.items[index].completed}
                    />
                    {template(todo.singular,todo.items[index])}
                </label>
            </li>
        {/each}
    </ul>
</Modal> 