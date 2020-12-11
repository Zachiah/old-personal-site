<script>
    import {User,Collection,Doc} from "/sveltefire.js";
    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import Button from "/components/form/Button.svelte";
    import Loader from "/components/Loader.svelte";
    import Todo from "/util/todo-plus-plus/Todo.js";
    import TodoCell from "/components/todoPlusPlus/TodoCell.svelte";
    import TodoRow from "/components/todoPlusPlus/TodoRow.svelte";
    import ShowHideToggle from "/components/form/ShowHideToggle.svelte";
    import {dequal} from "dequal";

    let firstData = true;
    let dbTodos;
    function handleTodosData(e) {
        if (firstData) {
            const newTodos = !todos || todos.length !== e.detail.data.length;
            
            todos = e.detail.data ? e.detail.data.map((item) => new Todo(item)) : e.detail.data;
            console.log(todos);
            dbTodos = todos ? JSON.parse(JSON.stringify(Array.from(todos))) : null;
            todos = todos ? todos.map(item => new Todo(item)) : null;
            dbTodos = todos ? dbTodos.map(item => new Todo(item)) : null;
            if (!selectedTodoBools || newTodos) {
                selectedTodoBools = todos ? twoListToObj(todos.map(item => [item.id, false])) : undefined;
            }
            firstData = false;
        }
    }

    let todos;

    let selectedTodoBools;
    $: selectedTodos = todos ? todos.filter(todo => selectedTodoBools[todo.id]) : undefined;

    let allDates;
    $: {
        if (selectedTodos) {
            let intermediate = [...new Set(selectedTodos.flatMap(todo => todo.calcDays()))]
            intermediate = intermediate.map(item => new Date(parseInt(item)))
            intermediate = intermediate.sort((a,b) => a-b)
            intermediate = intermediate.map(item => item.valueOf());
            allDates = intermediate;
        }
    }

    $: unsavedTodos = todos ?
                            Object
                                .fromEntries(
                                    Object
                                        .entries(todos)
                                        .filter(
                                            (item) => {console.log(dbTodos[item[0]],item[1]);return !dequal(dbTodos[item[0]].toJSON(),item[1].toJSON())}
                                        )
                                        .map(item => [(item[1].id),true])
                                    )
                            : null;
    $: console.log(unsavedTodos);

    async function save(todo,index,todosRef) {
        unsavedTodos[todo.id] = "loading";
        await todosRef.doc(todo.id).set(todo.toJSON());
        dbTodos[index] = new Todo(JSON.parse(JSON.stringify(todo)));
    }
    
</script>


<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef} on:data={handleTodosData}>
        <div slot="loading">
            <Loader />
        </div>
        {#if todos}
            {#if todos.length > 0}
                <div class="grid grid-cols-3 items-center">
                    {#each todos as todo,index}
                            <p>{todo.title}</p>
                            <ShowHideToggle bind:visible={selectedTodoBools[todo.id]}/>
                            <div>
                                {#if unsavedTodos[todo.id]}
                                    <Button on:click={() => save(todo,index,todosRef)} disabled={unsavedTodos[todo.id] === "loading"}>
                                        {#if unsavedTodos[todo.id] === "loading"}
                                            <Loader size={4}/>
                                        {:else}
                                            Save
                                        {/if}
                                    </Button>
                                {/if}
                            </div>
                    {/each}
                </div>

                {#if selectedTodos.length > 0}
                    <table class="block max-w-fit-content my-auto overflow-x-auto whitespace-no-wrap border-black border-2">
                        <tr class="p-2">
                            <th class="" aria-label="Date"><!--EMPTY SPACE--></th>
                            {#each selectedTodos as selectedTodo}
                                <th class="font-mono pl-4 border-black border-2">{selectedTodo.title}</th>
                            {/each}
                        </tr>

                        {#each allDates as date}
                            <TodoRow
                                day={date}
                                bind:todos={selectedTodos}
                                {todosRef}
                            />
                        {/each}
                    </table>
                {/if}

            {:else}
                You don't have any todos use the plus to create one
            {/if}
        
        {:else}
            <Loader />
        {/if}
    </Collection>
</User>

<NewTypeSelector />