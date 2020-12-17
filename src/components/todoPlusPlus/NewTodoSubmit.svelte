<script>
    import NewTodoSchedule from "./NewTodoSchedule.svelte";
    import Form from "/components/form/Form.svelte";
    import {Zate} from "/util/Zate.js";
    import {User,Collection,Doc} from "/sveltefire.js";
    import {goto} from "@sapper/app";
    import twoListToObj from "/util/twoListToObj.js";
    import Loader from "/components/Loader.svelte";
    import Todo from "/util/todo-plus-plus/Todo.js";

    export let thing = "todo";

    export let data; /* example
                        {
                            title: "Eat 1000 pizzas",
                            singular: "Eat the {index}th pizza",
                            plural: "Eat {amount} pizzas",
                            items: new Array(1000).fill(1).map(i => ({}))
                         }

                         you can have attributes in the items obj which can be accessed from singular by
                         attr and from plural by start.attr and end.attr
                     */
    export let todo = null;

    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let daysToComplete;
    let days;
    let valid;
    let loading = false;

    $: items = data.items.map((item, index) => ({completed: false, index, n: index+1, ...item}));

    const chunk = (array,amount) => {
        let result = []
        array.forEach((item,index) => {
            let resultIndex = Math.floor(index / amount);
            result[resultIndex] ? result[resultIndex].push(item) : (result[resultIndex] = [item])
        })

        return result;
    }

    const schedule = () => {
        let theSchedule = [];
        let practiceDays = [];
        let previousPracticeDay = new Zate().minusDays(1);
        let lastPossiblePracticeDay = new Zate().plusDays(daysToComplete);
        let index = 0;

        while (previousPracticeDay.time < lastPossiblePracticeDay.time) {
            previousPracticeDay = previousPracticeDay.next(days[index % days.length]);
            practiceDays.push(previousPracticeDay);
            index = (index+1) % days.length;
        }


        let unfinishedItems = items.filter(item => !item.completed);
        let finishedItems = items.filter(item => item.completed);
    

        let result = twoListToObj(
                chunk(unfinishedItems.map((item) => item.index), Math.ceil(unfinishedItems.length / practiceDays.length))
                    .map((itemIndexes,index) => ([
                            new Date(new Date(practiceDays[index].time).toDateString()).valueOf(),
                            itemIndexes
                    ]))
        );
        if (finishedItems.length) result[new Date(new Zate().minusDays(4).toDate().toDateString()).valueOf()] = finishedItems.map(item => item.index);

        return result;
    }

    const addIt = async (todosRef) => {
        dispatch('complete');
        if (todo) {
            // If todo we are editing not making a new one
            todo = new Todo(getTodoObj());
        }
        else {
            if (valid) {
                loading = true;
                let todoRef = todosRef.doc();

                let promises = [];
                promises.push(
                    todoRef.set(getTodoObj())
                );

                await Promise.all(promises);
                goto('/todo-plus-plus');
            }
        }

    }

    const getTodoObj = () => ({
                        title: data.title,
                        singular: data.singular,
                        plural: data.plural,
                        items,
                        schedule: schedule()
                    });

    $: formTitle = todo ? `Updating ${todo.title}` : `Finish adding your ${thing}`;
</script>

<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef}>
        {#if loading}
            <Loader />
        {:else}
            <Form title={formTitle} on:submit={() => addIt(todosRef)}>
                <NewTodoSchedule bind:daysToComplete bind:days bind:valid/>
                {#if !todo}
                    <button class="hover:bg-green-300 p-3 bg-green-500" type="button" on:click={() => dispatch('back')}>Back</button>
                {/if}
                <button
                    class="hover:bg-green-300 {valid ? 'p-3 bg-green-500': 'p-3 bg-green-300 text-gray-600'}"
                    disabled={!valid} 
                    type="submit"
                >
                    {#if todo}
                        Submit
                    {:else}
                        Add It!
                    {/if}
                </button>
            </Form>
        {/if}
    </Collection>
</User>