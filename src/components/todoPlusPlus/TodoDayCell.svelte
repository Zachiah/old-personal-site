<script>
    import dateFormatter from "/util/dateFormatter.js";
    export let day;
</script>

<td class="font-mono font-bold border-black border-2">
    {dateFormatter.format(new Date(day))}
</td>