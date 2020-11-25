<script>
    import {User,Collection,Doc} from "/sveltefire.js";

    import NewTypeSelector from "/components/todoPlusPlus/NewTypeSelector.svelte";
    import twoListToObj from "/util/twoListToObj.js";
    import template from "/util/template.js";
    import Modal from "/components/Modal.svelte";
    //import CheckBox from "/components/form/ "

    let todos;

    let selectedTodoBools;
    $: console.log(selectedTodoBools);
    $: selectedTodos = todos ? todos.filter(todo => selectedTodoBools[todo.id]) : undefined;

    function calcDates(todo) {
        return Object.keys(todo.schedule);
    }

    function pluralData(todoItemIndexes,items) {
        const todoDate = todoItemIndexes.map(item => items[item])
        console.log(todoDate,items)
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

        console.log("completion",day,todo,bools)
        return bools.reduce((a,b) => (a + b), 0) / bools.length;
    }

    function completionColor(day,todo) {
        
        let avg = completion(day,todo);
        console.log(day,todo,avg);
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
        console.log("todosRef", todosRef);
        console.log(selectedTodos[todoIndex])
        await todosRef.doc(selectedTodos[todoIndex].id).set(selectedTodos[todoIndex]);
    }

    $: allDates = selectedTodos ? [...new Set(selectedTodos.flatMap(todo => calcDates(todo)))].sort((a,b) => new Date(a) - new Date(b)) : undefined;
</script>


<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef} on:data={(e) => {todos = e.detail.data; selectedTodoBools = todos ? twoListToObj(todos.map(item => [item.id, false])) : undefined;}}>
        {#if todos}
            {#if todos.length > 0}
                <ul>
                    {#each todos as todo, index}
                        <li>
                            <input type="checkbox" bind:checked={selectedTodoBools[todo.id]} />{todo.title}
                        </li>
                    {/each}
                </ul>

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
                                {date}
                            </td>
                            {#each selectedTodos as selectedTodo, selectedTodoIndex}
                                <td class="pl-4 border-black border-2 bg-{completionColor(date,selectedTodo)}">
                                    {#if selectedTodo.schedule[date]}
                                        {template(selectedTodo.plural,pluralData(selectedTodo.schedule[date],selectedTodo.items))}

                                        <input
                                            type="checkbox"
                                            checked={completion(selectedTodo.schedule[date], selectedTodo) === 1}
                                            on:input={function() {updateCompletion(date, selectedTodoIndex, todosRef,this.value)}}
                                        />
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </table>

            {:else}
                You don't have any todos <a href="/todo-plus-plus/new" class="bg-blue-500 p-2">create one</a>
            {/if}
        {/if}
    </Collection>
</User>

<NewTypeSelector />

<Modal open={true}>
    Hello
</Modal>
 