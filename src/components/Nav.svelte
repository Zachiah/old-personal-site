<nav class="navbar is-primary mb-4"> 
    <div class="navbar-brand">
        <a class="navbar-item {undefined === segment ? 'is-active' : ''}" href="/">Home</a>
        
        <button class="navbar-burger button is-primary is-outlined {active ? 'is-active' : ''}" on:click={() => active = !active}>
            {#each [1,2,3] as i}
                <span aria-hidden="true"></span> 
            {/each}
        </button>
    </div>
    <div class="navbar-menu {active ? 'is-active' : ''}">
        <div class="navbar-end">
            {#each links as link}
                <a href="/{link}" class="navbar-item {link === segment ? 'is-active' : ''}">{pathToHuman(link)}</a>
            {/each}
        </div> 
    </div>
</nav>

<script>
    export let segment;
    let active = false;

    const links = ['math-problems','spirograph','conway-life'];

    function pathToHuman(path) {
        return path.split("-").map(item => item[0].toUpperCase() + item.substring(1)).join(" ")
    }
</script> 