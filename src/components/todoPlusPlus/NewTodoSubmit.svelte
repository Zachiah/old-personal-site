<script>
    import NewTodoSchedule from "./NewTodoSchedule.svelte";
    import Form from "/components/form/Form.svelte";
    import {Zate} from "/util/Zate.js";
    import {User,Collection,Doc} from "/sveltefire.js";
    import {goto} from "@sapper/app";
    import twoListToObj from "/util/twoListToObj.js";
    import Loader from "/components/Loader.svelte";

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

        console.log(practiceDays);

        return twoListToObj(
                chunk(items.map((item) => item.index), Math.ceil(items.length / practiceDays.length))
                    .map((itemIndexes,index) => ([
                            new Date(practiceDays[index].time).toDateString(),
                            itemIndexes
                    ]))
        )
    }

    const addIt = async (todosRef) => {
        if (valid) {
            loading = true;
            let todoRef = todosRef.doc();

            let promises = [];
            promises.push(
                todoRef.set({
                    title: data.title,
                    singular: data.singular,
                    plural: data.plural,
                    items,
                    schedule: schedule()
                })
            );

            await Promise.all(promises);
            goto('/todo-plus-plus');
        }

    }
</script>

<User let:user persist={sessionStorage}>
    <Collection path="users/{user.uid}/todos" let:ref={todosRef}>
        {#if loading}
            <Loader />
        {:else}
            <Form title="Finish adding your {thing}" on:submit={() => addIt(todosRef)}>
                <NewTodoSchedule bind:daysToComplete bind:days bind:valid/>
                <button class="hover:bg-green-300 p-3 bg-green-500" type="button" on:click={() => dispatch('back')}>Back</button>
                <button
                    class="hover:bg-green-300 {valid ? 'p-3 bg-green-500': 'p-3 bg-green-300 text-gray-600'}"
                    disabled={!valid} 
                    type="submit"
                >
                    Add It!
                </button>
            </Form>
        {/if}
    </Collection>
</User>