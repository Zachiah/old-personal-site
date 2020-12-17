<script>
    import dateFormatter from "/util/dateFormatter.js";
    import TodoCell from "./TodoCell.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let todos;
    export let day;
</script>

<tr class="p-2 ">
    <td class="font-mono font-bold border-black border-2">
        {dateFormatter.format(new Date(day))}
    </td>
    {#each todos as todo (todo.id)}
        <TodoCell
            bind:todo={todo}
            {day}
            on:change={() => dispatch('change',todo.id)}
        />
    {/each}
</tr>