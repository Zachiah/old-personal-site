<h1 class="title is-1 {extraClasses}" style="{style}"><slot></slot></h1>

<script>
    let extraClasses = "";
    export {extraClasses as class};
    export let style = "";
</script>