<script>
    import IntegerInput from "/components/form/IntegerInput.svelte";
    import WeeklySelector from "/components/form/WeeklySelector.svelte";

    export let daysToComplete = undefined;
    export let days = undefined;
    export let valid = undefined;
    $: valid = days && days.length && daysToComplete;
</script>

<IntegerInput required bind:value={daysToComplete} placeholder="e.g. 25">How many days do you have to complete it?</IntegerInput>
            
<h2 class="block text-gray-700 text-sm font-bold mb-2">Read on</h2>
<WeeklySelector bind:days />