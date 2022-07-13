<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var, and skew, make theme object -->
<!-- Nav bar should scroll to top of page -->

<!-- Make component w/ angled top, and one without, or make it a boolean of a section component -->

<script>
	// Imports
	import router from "page";

	import Home from "./pages/Home.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";
	import Splash from "./pages/Splash.svelte";
	
	import { games } from "./stores";

	// Variables
	let url = "http://localhost:8080";
	let page = "";
	let game = {};
	let gameProps = null;
	// URLS are temporary, need to update with sitelock versions after domain registered
	// Sizes are normal, tall, big, small, wide (unused)
	// Add freelance bool
	// Add embedded bool (preview)
	// Show year of production?

	// Routing
	router("/", () => (page = "home"));
	router("/games", () => (page = "games"));
	router(
		"/games/:game",
		(ctx, next) => {
			game = ctx.params.game;
			// Load props for defined game
			gameProps = games.filter((gameObj) => {
				return gameObj.title.split(" ").join("").toLowerCase() === game;
			});
			gameProps = gameProps[0];
			next();
		},
		() => (page = "gameShowcase")
	);
	router("/*", () => (page = "home"));
	router.start();
</script>

<div class="wrapper">
	<!-- Header -->
	<Splash />

	<!-- Routed body -->
	<main>
		{#if page === "home"}
			<Home />
		{:else if page === "games"}
			<Games {games} />
		{:else if page === "gameShowcase"}
			{#if gameProps == null}
				{window.location.replace(`${url}/games`)}
			{:else}
				<GameShowcase {...gameProps} />
			{/if}
		{/if}
	</main>
</div>

<style>
	.wrapper {
		text-align: center;
		display: flex;
		flex-direction: column;
		margin: auto;
		width: auto;
		height: inherit;
		/* Duplicate splash bg as page background */
		background-image: url("/assets/backgrounds/purplebgblur.jpg");
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
