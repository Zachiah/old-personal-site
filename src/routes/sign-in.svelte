<script>
    import {User} from "/sveltefire.js";
    import Loader from "/components/Loader.svelte";
    import TextField from "/components/old/TextField.svelte";
    import Button from "/components/old/Button.svelte";
    import Header from "/components/Header.svelte";

    import {onMount} from "svelte";

    import {goto} from "@sapper/app";

    import {lastPath} from "/stores/auth.store.js";

    let hasMounted = false;
    onMount(() => {
        hasMounted = true;
    });

    let email = "";
    let password = "";
    let loading = false;
    let error;

    const signIn = async auth => {
        loading = true;
        
        try {
            await auth.signInWithEmailAndPassword(email,password);
            await goto($lastPath);
        } catch (e) {
            loading = false;
            console.log(e)
            error = e.message;
        }
        
    }

</script>

<Header>Sign In</Header>

{#if hasMounted}
    <User persist={sessionStorage} let:user={user} let:auth={auth}>
        <span>You are already signed in <a href="/">Got to home</a></span>

        <div slot="signed-out">
            <form on:submit|preventDefault={() => {signIn(auth)}}>
                {#if loading}
                    <Loader />
                {:else}
                    {#if error}
                        {error}
                    {/if}
                    <TextField bind:value={email}>Email</TextField>

                    <TextField bind:value={password} type="password">Password</TextField>
                    <Button type="submit" primary>Sign In</Button>
                {/if}

            </form>

        </div>
    </User>
{:else}
    <Loader />
{/if}

