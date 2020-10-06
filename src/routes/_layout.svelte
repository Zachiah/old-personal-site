<script>
	
	import "bulma/css/bulma.min.css";
	import "/custom.css";
	import Nav from "../components/Nav.svelte";
	import TailwindCss from "/components/TailwindCss.svelte";

	import firebase from "firebase/app";
	import { FirebaseApp, User, Doc, Collection } from "/sveltefire.js";

	import {lastPath} from "/stores/auth.store.js";

	import {stores} from "@sapper/app";
	const {page} = stores();

	page.subscribe((v) => {
		if (v.path !== '/sign-in' && v.path !== '/sign-up') {
			$lastPath = v.path;
			console.log(v.path);
		}
	});

	export let segment;

</script>

<TailwindCss />

<FirebaseApp {firebase}>
	<Nav {segment} />

	<main class="container is-fluid">
		<slot></slot>
	</main>
</FirebaseApp>