<script>
    import Hn from "/components/Hn.svelte";

    export let title;
    export let headerLevel = 2;
    export let maxWidth = "500px";

    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
</script>

<form class="p-4 shadow-2xl" style="max-width: {maxWidth}" on:submit|preventDefault={() => {dispatch('submit')}}>
    <Hn n={headerLevel} class="text-grey-900 test-md font-bold mb-2">{title}</Hn>
    <slot></slot>
</form> 