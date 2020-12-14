<script>
    import {onMount} from "svelte";
    import {User} from "/sveltefire.js";
    import Loader from "/components/Loader.svelte";
    import {fly} from "svelte/transition";
    import active from "/stores/nav.store.js";

    let hasMounted = false;
    onMount(() => {
        hasMounted = true;
    });


    export let segment;

    const links = ['math-problems','spirograph','conway-life', 'bible', 'todo-plus-plus'];

    function pathToHuman(path) {
        return path.split("-").map(item => item[0].toUpperCase() + item.substring(1)).join(" ")
    }

    const signOut = async auth => {
        console.log("logging out");
        await auth.signOut();
    }
</script> 

<style>
    .nvb {
        color: #4a4a4a;
        cursor: pointer;
        display: block;
        height: 3.25rem;
        position: relative;
        width: 3.25rem;
        margin-left: auto;
    }

    .nvb span {
        background-color: currentColor;
        display: block;
        height: 1px;
        left: calc(50% - 8px);
        position: absolute;
        transform-origin: center;
        transition-duration: 86ms;
        transition-property: background-color,opacity,transform;
        transition-timing-function: ease-out;
        width: 16px;
    }
    

    .nvb span:nth-child(1) {
        top: calc(50% - 6px);
    }
    .nvb span:nth-child(2) {
        top: calc(50% - 1px);
    }
    .nvb span:nth-child(3) {
        top: calc(50% + 4px);
    }
</style>

<nav class="navbar bg-green-500 mb-4"> 
    <div class="navbar-brand">
        <a class="navbar-item {undefined === segment ? 'is-active' : ''}" href="/">Home</a>
        
        <button class="nvb button bg-green-500 is-outlined {$active ? 'is-active' : ''}" on:click={() => $active = !$active}>
            {#each [1,2,3] as i}
                <span aria-hidden="true"></span> 
            {/each}
        </button>
    </div>
    {#if $active}
        <div class="navbar-menu is-active" transition:fly={{x:800,duration:500}}>
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
    {/if}
</nav>
