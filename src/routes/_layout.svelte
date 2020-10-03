<script>
	
	import "bulma/css/bulma.min.css";
	import "/custom.css";
	import Nav from "../components/Nav.svelte";

	import firebase from "firebase/app";
	import { FirebaseApp, User, Doc, Collection } from "/sveltefire.js";

	export let segment;
</script>

<FirebaseApp {firebase}>
	<Nav {segment} />

	<main class="container is-fluid">
		<slot></slot>
	</main>
</FirebaseApp>