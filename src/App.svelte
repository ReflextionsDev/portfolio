<script>
	import Info from "./components/Info.svelte";
	// Imports
	import router from "page";
	import Navbar from "./components/Navbar.svelte";
	import Home from "./pages/Home.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";
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

<!-- <header><Navbar class="content" /></header> -->

<main>
	{#if page === "home"}
		<Home />
	{:else if page === "games"}
		<Info />
		<Games {games} />
	{:else if page === "gameShowcase"}
		{#if gameProps == null}
			{window.location.replace(`${url}/games`)}
		{:else}
			<GameShowcase {...gameProps} />
		{/if}
	{/if}
</main>

<style>
	header {
		/* position: absolute; */
		height: 6%;
		position: sticky;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 1;

		background-color: rgb(24 225 234 / 62%);
		box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
	}

	header::before {
		content: "";
		position: absolute;
		background: inherit;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* box-shadow: inset 0 0 2000px rgb(255 255 255 / 50%); */
		filter: blur(10px);
		backdrop-filter: blur(8px);
		/* margin: -20px; */
	}

	main {
		text-align: center;
		/* height: auto; */
		display: flex;
		flex-direction: column;

		margin: auto;
		/* make a body prop */
		/* min-width: 320px;
		
		width: max(60vw, 1200px); */

		background-color: white;
	}
</style>
