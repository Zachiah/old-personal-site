<script>
    import {Zate} from "/util/Zate.js";

    let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    days = days.map(day => ({name: day, selected: true}));
    days[0].selected = false;

    let externalDays;
    $: externalDays = days.filter(day => day.selected).map(day => day.name).sort((a,b) => 
        new Zate().next(a).time - new Zate().next(b).time
    );
    $: console.log(externalDays);
    export {externalDays as days}
</script>

<div class="flex mb-2">
    {#each days as day}
        <button on:click={() => {day.selected = !day.selected}} type="button" class="w-8 h-8 mr-2 hover:bg-blue-300 {day.selected ? 'bg-blue-500 shadow-md' : 'bg-gray-300 text-gray-500'}"> {day.name[0].toUpperCase()}</button>
    {/each}
</div>