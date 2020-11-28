<script>
    import {User,Collection,Doc} from "/sveltefire.js";

    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import template from "/util/template.js";
    import Modal from "/components/Modal.svelte";
    import Button from "/components/form/Button.svelte";
    import Loader from "/components/Loader.svelte";
    //import CheckBox from "/components/form/ "

    const dateFormatter = Intl.DateTimeFormat()

    function calcDates(todo) {
        return Object.keys(todo.schedule);
    }

    function pluralData(todoItemIndexes,items) {
        const todoDate = todoItemIndexes.map(item => items[item])
        return {
            amount: todoDate.length,
            start: todoDate[0],
            end: todoDate[todoDate.length-1]
        }
    }

    function completion(day,todo) {
        let bools = todo.schedule[day] ? todo.schedule[day]
                        .map((item) => todo.items[item])
                        .map(item => item.completed) : [false];

        
        let result = bools.reduce((a,b) => (a + b), 0) / bools.length;
        return result;
    }

    function completionColor(day,todo) {
        if (!todo.schedule[day]) return "white";

        let past = new Date() > day;
        let avg = completion(day,todo);
        if (avg === 1) {
            return "green-500";
        } else if (avg === 0) {
            if (past) {
                return "red-500";
            } else {
                return "white";
            }
        } else {
            if (past) {
                return "orange-500";
            } else {
                return "blue-500";
            }
        }
    }


    async function updateCompletion(date,todoIndex,todosRef,value) {
        selectedTodos[todoIndex].items = selectedTodos[todoIndex]
                                    .items
                                    .map(
                                        (item,index) => (
                                            (selectedTodos[todoIndex].schedule[date].indexOf(index) !== -1) ?
                                                {...item, completed: value} :
                                                item
                                        )
                                    );
        await todosRef.doc(selectedTodos[todoIndex].id).set(selectedTodos[todoIndex]);
    }

    function handleTodosData(e) {
        const newTodos = !todos || todos.length !== e.detail.data.length;
        todos = e.detail.data;
        if (!selectedTodoBools || newTodos) {
            selectedTodoBools = todos ? twoListToObj(todos.map(item => [item.id, false])) : undefined;
        }
    }

    function handleCheckboxInput(e,date,selectedTodoIndex,todosRef) {
        updateCompletion(date, selectedTodoIndex, todosRef,e.target.checked);
    }

    function cellText(selectedTodo,date) {
        const data = selectedTodo.items.length > 1 ? pluralData(selectedTodo.schedule[date],selectedTodo.items) : selectedTodo.items[selectedTodo.schedule[date][0]];
        return template(selectedTodo.plural,data);
    }

    function openDialog(date,selectedTodo,index) {
        modalOpen = true;
        modalTodo = selectedTodo;
        modalTodoDate = date;
        modalTodoIndex = index;
    }

    async function handleTodoItemCheckboxInput(e,todoItemIndex,todosRef) {
        selectedTodos[modalTodoIndex].items[todoItemIndex].completed = e.target.checked;
        await todosRef.doc(selectedTodos[modalTodoIndex].id).set(selectedTodos[modalTodoIndex])
    }

    let todos;
    let modalOpen;
    let modalTodo;
    let modalTodoDate;
    let modalTodoIndex;

    let selectedTodoBools;
    $: selectedTodos = todos ? todos.filter(todo => selectedTodoBools[todo.id]) : undefined;

    let allDates;
    $: {
        if (selectedTodos) {
            let intermediate = [...new Set(selectedTodos.flatMap(todo => calcDates(todo)))]
            intermediate = intermediate.map(item => new Date(parseInt(item)))
            intermediate = intermediate.sort((a,b) => a-b)
            intermediate = intermediate.map(item => item.valueOf());
            allDates = intermediate;
        }
    }
    $: console.log(allDates);
</script>


<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef} on:data={handleTodosData}>
        <div slot="loading">
            <Loader />
        </div>
        {#if todos}
            {#if todos.length > 0}
                <ul>
                    {#each todos as todo, index}
                        <li>
                            <input type="checkbox" bind:checked={selectedTodoBools[todo.id]} />{todo.title}
                        </li>
                    {/each}
                </ul>

                {#if selectedTodos.length > 0}
                    <table class="block max-w-fit-content my-auto overflow-x-auto whitespace-no-wrap border-black border-2">
                        <tr class="p-2">
                            <th class="" aria-label="Date"><!--EMPTY SPACE--></th>
                            {#each selectedTodos as selectedTodo}
                                <th class="font-mono pl-4 border-black border-2">{selectedTodo.title}</th>
                            {/each}
                        </tr>

                        {#each allDates as date}
                            <tr class="p-2 ">
                                <td class="font-mono font-bold border-black border-2">
                                    {dateFormatter.format(new Date(date))}
                                </td>
                                {#each selectedTodos as selectedTodo, selectedTodoIndex}
                                    <td class="pl-4 border-black border-2 bg-{completionColor(date,selectedTodo)}">
                                        {#if selectedTodo.schedule[date]}
                                            <div class="flex items-center">
                                                <div>
                                                    {cellText(selectedTodo,date)} 
                                                </div>

                                                <input
                                                    class="w-8 h-8 ml-auto"
                                                    type="checkbox"
                                                    checked={completion(date, selectedTodo) === 1}
                                                    on:input={e => handleCheckboxInput(e,date,selectedTodoIndex,todosRef)}
                                                />
                                                <Button theme="gray" on:click={() => {openDialog(date,selectedTodo,selectedTodoIndex)}}>
                                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        {/if}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </table>
                {/if}

            {:else}
                You don't have any todos use the plus to create one
            {/if}
        
        {:else}
            <Loader />
        {/if}

        <Modal bind:open={modalOpen} title="{modalTodoDate && dateFormatter.format(new Date(modalTodoDate))} for {modalTodo && modalTodo.title}">
            <ul>
                {#each modalTodo.schedule[modalTodoDate] as todoItemIndex}
                    <li>
                        <label>
                            <input type="checkbox" checked={selectedTodos[modalTodoIndex].items[todoItemIndex].completed} on:input={(e) => handleTodoItemCheckboxInput(e,todoItemIndex,todosRef)}/>{template(modalTodo.singular,modalTodo.items[todoItemIndex])}
                        </label>
                    </li>
                {/each}
            </ul>
        </Modal> 
    </Collection>
</User>

<NewTypeSelector />



 