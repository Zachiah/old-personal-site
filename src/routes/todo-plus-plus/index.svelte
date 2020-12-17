<script>
    import {User,Collection} from "/sveltefire.js";
    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import Loader from "/components/Loader.svelte";
    import Todo from "/util/todo-plus-plus/Todo.js";
    import TodoToolbar from "/components/todoPlusPlus/TodoToolbar.svelte";
    import TodoRow from "/components/todoPlusPlus/TodoRow.svelte";

    let firstData = true;

    
    function handleTodosData(e) {
        if (firstData) {
            console.log("handling data");
            const newTodos = !todos || todos.length !== e.detail.data.length;
            
            todos = e.detail.data ? e.detail.data.map((item) => new Todo(item)) : e.detail.data;
            console.log(todos);
            todos = todos ? todos.map(item => new Todo(item)) : null;
            if (!selectedTodoBools || newTodos) {
                selectedTodoBools = todos ? twoListToObj(todos.map(item => [item.id, false])) : undefined;
            }
            if (e.detail.data) {
                firstData = false;
                console.log("firstData set to false");
            }
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

    let unsavedTodos = {}
    function handleTodoChange(e) {
        const id = e.detail;
        unsavedTodos[id] = true;
    }


    
</script>


<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef} on:data={handleTodosData}>
        <div slot="loading">
            <Loader />
        </div>
        {#if todos} 
            {#if todos.length > 0}
                <TodoToolbar
                    {todosRef}
                    bind:unsavedTodos
                    bind:selectedTodoBools
                    bind:todos
                />

                {#if selectedTodos.length > 0}
                    <table class="block max-w-fit-content my-auto overflow-x-auto whitespace-no-wrap border-black border-2">
                        <tr class="p-2">
                            <th class="" aria-label="Date"><!--EMPTY SPACE--></th>
                            {#each selectedTodos as selectedTodo (selectedTodo.id)}
                                <th class="font-mono pl-4 border-black border-2">{selectedTodo.title}</th>
                            {/each}
                        </tr>

                        {#each allDates as date (date.valueOf())}
                            <TodoRow
                                day={date}
                                bind:todos={selectedTodos}
                                on:change={handleTodoChange}
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