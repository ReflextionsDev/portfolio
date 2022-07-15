<!-- The base app page. Loads splash page then uses routing in conjuction with navbar to display content.  -->
<script>
	// Imports
	import router from "page";

	// Pages
	import Splash from "./header/Splash.svelte";
	import Web from "./pages/Web.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";

	// Variables
	import { games, url } from "./stores";

	// Used to load game showcases, will probably need to be update when converted to modal
	let gameTitle = {};
	let gameProps = null;

	// Routing
	let page = "";
	router("/", () => (page = "home"));
	router("/games", () => (page = "games"));
	// Game showcase
	router(
		"/games/:game",
		(ctx, next) => {
			// If game parameter matches object in store list, load props
			gameTitle = ctx.params.game;
			gameProps = games.find((gameObj) => {
				let cleanTitle = gameObj.title
					.split(" ")
					.join("")
					.toLowerCase();
				return cleanTitle === gameTitle;
			});
			console.log("props", gameProps);
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
			<Web />
		{:else if page === "games"}
			<Games {games} />
		{:else if page === "gameShowcase"}
			<!-- Redirect to game page is props are missing -->
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
		/* background-image: url("/assets/backgrounds/purplebgblur.jpg");
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat; */
	}
</style>
