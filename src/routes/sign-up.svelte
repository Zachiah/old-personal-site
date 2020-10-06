<script>
    import {User} from "/sveltefire.js";
    import Loader from "/components/Loader.svelte";
    import TextField from "/components/TextField.svelte";
    import Button from "/components/Button.svelte";
    import Header from "/components/Header.svelte";

    import {onMount} from "svelte";

    import {goto} from "@sapper/app";

    let hasMounted = false;
    onMount(() => {
        hasMounted = true;
    });

    let email = "";
    let password = "";
    let passwordConfirmation;
    let loading = false;
    let error;

    const signUp = async auth => {
        if (valid) {
            loading = true;
            
            try {
                await auth.createUserWithEmailAndPassword(email,password);
                await goto('/');
            } catch (e) {
                loading = false;
                console.log(e)
                error = e.message;
            }
        }
    }

    $: valid = password === passwordConfirmation;

</script>

<Header>Sign Up</Header>

{#if hasMounted}
    <User persist={sessionStorage} let:user={user} let:auth={auth}>
        <span>You are already signed in <a href="/">Got to home</a></span>

        <div slot="signed-out">
            <form on:submit|preventDefault={() => {signUp(auth)}}>
                {#if loading}
                    <Loader />
                {:else}
                    {#if error}
                        {error}
                    {/if}
                    {#if !valid}
                        Password and Password Confirmation must match
                    {/if}
                    <TextField bind:value={email}>Email</TextField>

                    <TextField bind:value={password} type="password">Password</TextField>
                    <TextField bind:value={passwordConfirmation} type="password">Password Confirmation</TextField>
                    <Button type="submit" primary disabled={!valid}>Sign Up</Button>
                {/if}

            </form>

        </div>
    </User>
{:else}
    <Loader />
{/if}

