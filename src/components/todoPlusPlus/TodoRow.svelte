<script>
    import dateFormatter from "/util/dateFormatter.js";
    import TodoCell from "./TodoCell.svelte";

    export let todos;
    export let day;
    export let todosRef;
</script>

<tr class="p-2 ">
    <td class="font-mono font-bold border-black border-2">
        {dateFormatter.format(new Date(day))}
    </td>
    {#each todos as todo}
        <TodoCell
            bind:todo={todo}
            {day}
            {todosRef}
        />
    {/each}
</tr>