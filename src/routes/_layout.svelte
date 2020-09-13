<script>
	

	import Nav from "../components/Nav.svelte"

	export let segment;
</script>

<style lang="scss">
	@import "bulma/bulma.sass";
</style>

<Nav {segment} />

<main class="container is-fluid">
	<slot></slot>
</main>