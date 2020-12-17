<script>
    import TextInput from "/components/form/TextInput.svelte";
    import NewTodoSubmit from "/components/todoPlusPlus/NewTodoSubmit.svelte";
    import Form from "/components/form/Form.svelte"; 
    import Loader from "/components/Loader.svelte";
    import Button from "/components/form/Button.svelte";
    
    let loading = false;
    let secondPage = false;

    let title;
    let singular;
    let plural;

    let selectedColumnIndex = 0;
    let selectedRowIndex = 0;

    $: if (selectedColumnIndex > table[0].length-1) selectedColumnIndex = table[0].length - 1;
    $: if (selectedRowIndex > table.length -2) selectedRowIndex = table.length - 2;

    let table = [[""],[""],[""]];

    $: data = {
        title,
        singular,
        plural,
        // Convert the table to a more firebase like datastructure
        items: table.slice(1).map(row => Object.fromEntries(row.map((item,index) => [table[0][index], item])))
    }
     
    $: valid = title && singular && plural && table[0].reduce((a,b) => a && b, true);

    const removeRow = (index) => {
        table = [...table.slice(0,index+1),...table.slice(index+2)];
    }
    const removeColumn = (index) => {
        table = table.map(row => [...row.slice(0,index), ...row.slice(index+1)]);
    }
</script>


{#if loading}
    <Loader />
{:else if secondPage}
    <NewTodoSubmit {data}  on:back={() => secondPage = false}/>
{:else}


    <Button type="button" on:click={() => table = table.map(row => [...row, ""])}>New Column</Button>
    <Button type="button" on:click={() => table = [...table, table[0].map(() => "")]}>New Row</Button>

    <div class="shadow-xl border-black border-2 mb-8">
        <table class="block max-w-fit-content my-auto overflow-x-auto whitespace-no-wrap resize-y">
            <thead>
                <tr>
                    <!--Prevents things from changing size this doesn't show because opacity:0-->
                    <!--Add a tabindex to make this button not accessible-->
                    <td style="opacity: 0"><Button disabled style="cursor: default" tabindex="-1">Delete Row</Button></td>
                    <td></td>

                    {#each table[0] as _, index}
                        <td>
                            {#if index === selectedColumnIndex}
                                <Button theme="red" on:click={() => removeColumn(index)}>Delete Column</Button>
                            {/if}
                        </td>
                    {/each}
                </tr>
                <tr>
                    <td></td>
                    <th><!--empty--></th>
                    

                    {#each table[0] as header, index}
                        <th class="border-black border-2">
                            <TextInput
                                bind:value={header}
                                placeholder="property name"
                                style="min-width: 9em"
                                on:focus={() => {selectedColumnIndex = index}}
                            />
                        </th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each table.slice(1) as row,rowIndex}
                    <tr>
                        <td>
                            {#if rowIndex === selectedRowIndex}
                                <Button theme="red" on:click={() => removeRow(rowIndex)} disabled={table.length < 3}>Delete Row</Button>
                            {/if}
                        </td>
                        <td class="p-2 border-black border-2">{rowIndex}</td>

                        {#each row as item, columnIndex}
                            <td class="border-black border-2">
                                <TextInput bind:value={item} placeholder="property value" on:focus={() => {selectedColumnIndex = columnIndex;selectedRowIndex = rowIndex;}} />
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <Form on:submit={() => {secondPage = true}} title="New Custom Todo">
        <TextInput required bind:value={title} >Todo Title</TextInput>
        <TextInput required bind:value={singular} >Singular</TextInput>
        <TextInput required bind:value={plural} >Plural</TextInput>

        <Button
            class="ml-auto"
            disabled={!valid} 
            type="submit"
        >next &gt;</Button>
    </Form>
{/if}