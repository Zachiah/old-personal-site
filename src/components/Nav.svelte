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
            <a href="/math-problems" class="navbar-item {'math-problems' === segment ? 'is-active' : ''}">Math Problems</a>
            <a href="/spirograph" class="navbar-item {'spirograph' === segment ? 'is-active' : ''}">Spirograph</a>
        </div> 
    </div>
</nav>

<script>
    export let segment;
    let active = false;
</script> 