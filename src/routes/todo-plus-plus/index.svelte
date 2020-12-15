<script>
    import {User,Collection,Doc} from "/sveltefire.js";
    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import IconButton from "/components/todoPlusPlus/IconButton.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import Button from "/components/form/Button.svelte";
    import Loader from "/components/Loader.svelte";
    import Todo from "/util/todo-plus-plus/Todo.js";
    import TodoCell from "/components/todoPlusPlus/TodoCell.svelte";
    import TodoRow from "/components/todoPlusPlus/TodoRow.svelte";
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
            if (e.detail.data.length) {
                firstData = false;
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

    function arrayWithout(list, index) {
        return [...list.slice(0,index),...list.slice(index+1)]
    }

    async function save(todo,index,todosRef) {
        unsavedTodos[todo.id] = "loading";
        await todosRef.doc(todo.id).set(todo.toJSON());
        dbTodos[index] = new Todo(JSON.parse(JSON.stringify(todo)));
    }

    async function deleteTodo(todo,index,todosRef) {
        todos = arrayWithout(todos,index);
        dbTodos = arrayWithout(dbTodos,index);
        await todosRef.doc(todo.id).delete();
    }
    
</script>


<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef} on:data={handleTodosData}>
        <div slot="loading">
            <Loader />
        </div>
        {#if todos} 
            {#if todos.length > 0}
                {#each todos as todo,index}
                    <div class="flex bg-gray-200 p-4 items-center my-4">
                        <p class="mr-auto">{todo.title}</p>
                        <!--<ShowHideToggle bind:visible={selectedTodoBools[todo.id]}/>-->
                        <!-- <button class="w-10 h-10 bg-gray-400 mx-2 p-2 hover:bg-gray-500 active:bg-gray-600" on:click={() => selectedTodoBools[todo.id] = !selectedTodoBools[todo.id]}>
                            {#if selectedTodoBools[todo.id]}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            {/if}
                        </button> -->


                        {#if unsavedTodos[todo.id]}
                            <!-- <Button on:click={() => save(todo,index,todosRef)} disabled={unsavedTodos[todo.id] === "loading"}>
                                {#if unsavedTodos[todo.id] === "loading"}
                                    <Loader size={4}/>
                                {:else}
                                    Save
                                {/if}
                            </Button> -->
                            <IconButton
                                icon={unsavedTodos[todo.id] === "loading" ? 'loader' : 'check'}
                                on:click={() => save(todo,index,todosRef)}
                                disabled={unsavedTodos[todo.id] === "loading"}
                            />
                        {/if}


                        <IconButton
                            icon={selectedTodoBools[todo.id] ? 'eye-off' : 'eye'}
                            on:click={() => selectedTodoBools[todo.id] = !selectedTodoBools[todo.id]}
                            class="mx-2"
                        />


                        <!-- <button class="w-10 h-10 bg-gray-400 mx-2 p-2 hover:bg-gray-500 active:bg-gray-600" on:click={() => deleteTodo(todo,index,todosRef)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                        </button> -->
                        <IconButton icon="trash" on:click={() => deleteTodo(todo,index,todosRef)} class="mx-2" />
                    </div>
                {/each}

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