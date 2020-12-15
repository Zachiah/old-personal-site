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
    span {
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
    

    span:nth-child(1) {
        top: calc(50% - 6px);
    }
    span:nth-child(2) {
        top: calc(50% - 1px);
    }
    span:nth-child(3) {
        top: calc(50% + 4px);
    }


.z-navbar-item {
  color: #4a4a4a;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
}


a.z-navbar-item:focus, a.z-navbar-item:focus-within, a.z-navbar-item:hover, a.z-navbar-item.is-active {
  background-color: #fafafa;
  color: #3273dc;
}


</style>

<nav class=" bg-gray-500 h-16 relative z-20"> 
    <div class="items-center flex flex-shrink-0 min-h-4 w-full">
        <a class=" p-4 hover:text-blue-500 flex-grow-0 flex-shrink-0 cursor-pointer" class:is-active={segment === undefined} href="/">Home</a>
        
        <button
            class="button cursor-pointer border-0 block outline-none
                   h-16 w-16 ml-auto relative text-gray-800"
            class:bg-gray-300={$active}
            class:bg-gray-500={!$active}
            on:click={() => $active = !$active}
        >
            {#each [1,2,3] as _}
                <span></span>
            {/each}
        </button>
    </div>
    {#if $active}
        <div class="bg-white px-4 block absolute w-full" style="box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);" transition:fly={{x:800,duration:500}}>
            <div>
                {#if hasMounted}
                    <User persist={sessionStorage} let:user={user} let:auth={auth}>
                        <button class="z-navbar-item flex-grow-0 flex-shrink-0 cursor-pointer {'sign-out' === segment ? 'is-active' : ''}" on:click={() => {signOut(auth)}}>Sign Out</button>

                        <div slot="signed-out" class="dc">
                            <a href="/sign-in" class="z-navbar-item flex-grow-0 flex-shrink-0 cursor-pointer {'sign-in' === segment ? 'is-active' : ''}">Sign In</a>
                            <a href="/sign-up" class="z-navbar-item flex-grow-0 flex-shrink-0 cursor-pointer {'sign-up' === segment ? 'is-active' : ''}">Sign Up</a>
                        </div>
                    </User>
                {:else}
                    <Loader />
                {/if}

                {#each links as link}
                    <a
                        href="/{link}"
                        class="z-navbar-item flex-grow-0 flex-shrink-0 cursor-pointer"
                        class:is-active={link === segment}
                    >
                        {pathToHuman(link)}
                    </a>
                {/each}
            </div> 
        </div>
    {/if}
</nav>
