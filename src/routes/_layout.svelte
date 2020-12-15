<script>
    import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";
	
	import "bulma/css/bulma.min.css";
	import "/custom.css";
	import Nav from "../components/Nav.svelte";
	import TailwindCss from "/components/TailwindCss.svelte";
	import Loader from "/components/Loader.svelte";

	import firebase from "firebase/app";
	import { FirebaseApp, User, Doc, Collection } from "/sveltefire.js";

	import {lastPath} from "/stores/auth.store.js";
	import {loading} from "/stores/loading.store.js";
	import navOpen from "/stores/nav.store.js";

	import {stores} from "@sapper/app";
	const {page,preloading} = stores();

	page.subscribe((v) => {
		if (v.path !== '/sign-in' && v.path !== '/sign-up') {
			$lastPath = v.path;
			$loading = false;
			console.log(v.path);
			$navOpen = false;
		}
	});

	export let segment;

</script>

<PageLoadingBar {preloading}/>
 
<TailwindCss />

<FirebaseApp {firebase}>
	<Nav {segment} />

	<main class="container is-fluid pt-4">
		{#if $loading}
			<Loader />
		{:else}
			<slot></slot>
		{/if}
	</main>

	{#if $navOpen}
		<div class="absolute w-full h-full z-10 bg-gray-900 opacity-75 top-0" on:click={() => {$navOpen = false}}></div>
	{/if}
</FirebaseApp>
 