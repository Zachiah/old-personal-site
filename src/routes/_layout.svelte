<script>
	
	import "bulma/css/bulma.min.css";
	import Nav from "../components/Nav.svelte"

	export let segment;
</script>

<Nav {segment} />

<main class="container is-fluid">
	<slot></slot>
</main>