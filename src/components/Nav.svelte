<script>
    import {onMount} from "svelte";
    import {User} from "/sveltefire.js";
    import Loader from "/components/Loader.svelte"

    let hasMounted = false;
    onMount(() => {
        hasMounted = true;
    });


    export let segment;
    let active = false;

    const links = ['math-problems','spirograph','conway-life', 'bible'];

    function pathToHuman(path) {
        return path.split("-").map(item => item[0].toUpperCase() + item.substring(1)).join(" ")
    }

    const signOut = async auth => {
        console.log("logging out");
        await auth.signOut();
    }
</script> 

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
            {#if hasMounted}
                <User persist={sessionStorage} let:user={user} let:auth={auth}>
                    <button class="navbar-item {'sign-out' === segment ? 'is-active' : ''}" on:click={() => {signOut(auth)}}>Sign Out</button>

                    <div slot="signed-out" class="dc">
                        <a href="/sign-in" class="navbar-item {'sign-in' === segment ? 'is-active' : ''}">Sign In</a>
                        <a href="/sign-up" class="navbar-item {'sign-up' === segment ? 'is-active' : ''}">Sign Up</a>
                    </div>
                </User>
            {:else}
                <Loader />
            {/if}

            {#each links as link}
                <a href="/{link}" class="navbar-item {link === segment ? 'is-active' : ''}">{pathToHuman(link)}</a>
            {/each}
        </div> 
    </div>
</nav>
