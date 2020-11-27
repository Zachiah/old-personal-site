<script>
    import {User,Collection,Doc} from "/sveltefire.js";

    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import template from "/util/template.js";
    import Modal from "/components/Modal.svelte";
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
        
        let avg = completion(day,todo);
        if (avg === 1) {
            return "green-500";
        } else if (avg === 0) {
            return "white";
        } else {
            return "orange-500";
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

    let todos;

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
                                            {cellText(selectedTodo,date)}

                                            <input
                                                type="checkbox"
                                                checked={completion(date, selectedTodo) === 1}
                                                on:input={e => handleCheckboxInput(e,date,selectedTodoIndex,todosRef)}
                                            />
                                        {/if}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </table>
                {/if}

            {:else}
                You don't have any todos <a href="/todo-plus-plus/new" class="bg-blue-500 p-2">create one</a>
            {/if}
        {/if}
    </Collection>
</User>

<NewTypeSelector />


<!-- <Modal open={true}>
    Hello
</Modal> -->
 