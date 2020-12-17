<script>
    import IconButton from "/components/todoPlusPlus/IconButton.svelte";
    import Modal from "/components/Modal.svelte";
    import NewTodoSubmit from "/components/todoPlusPlus/NewTodoSubmit.svelte";
    export let todos;
    export let selectedTodoBools;
    export let todosRef;
    export let unsavedTodos;

    let editingTodoIndex = false;

    function arrayWithout(list, index) {
        return [...list.slice(0,index),...list.slice(index+1)]
    }

    async function save(todo,todosRef) {
        unsavedTodos[todo.id] = "loading";
        await todosRef.doc(todo.id).set(todo.toJSON());
        console.log('saved to db');
        unsavedTodos[todo.id] = false
    }

    async function deleteTodo(todo,index,todosRef) {
        todos = arrayWithout(todos,index);
        await todosRef.doc(todo.id).delete();
    }

    async function edit(index) {
        editingTodoIndex = index;
        editing = true;
    }
    $: console.log(unsavedTodos);

    let editing;

    function handleEditingComplete() {
        unsavedTodos[todos[editingTodoIndex].id] = true;
        editing = false;
    }
</script>

{#each todos as todo,index}
    <div class="flex bg-gray-200 p-4 items-center my-4">
        <p class="mr-auto">{todo.title}</p>
        {#if unsavedTodos[todo.id]}
            <IconButton
                icon={unsavedTodos[todo.id] === "loading" ? 'loader' : 'check'}
                on:click={() => save(todo,todosRef)}
                disabled={unsavedTodos[todo.id] === "loading"}
                class="mx-2"
            />
        {/if}
        <IconButton icon="pencil" on:click={() => edit(index)} class="mx-2" />                        

        <IconButton
            icon={selectedTodoBools[todo.id] ? 'eye-off' : 'eye'}
            on:click={() => selectedTodoBools[todo.id] = !selectedTodoBools[todo.id]}
            class="mx-2"
        />

        <IconButton icon="trash" on:click={() => deleteTodo(todo,index,todosRef)} class="mx-2" />
    </div>
{/each}

<Modal bind:open={editing}>
    <NewTodoSubmit bind:todo={todos[editingTodoIndex]} data={todos[editingTodoIndex]} on:complete={handleEditingComplete}/>
</Modal>