<script>
	// Imports
	import router from "page";
	import Navbar from "./components/Navbar.svelte";
	import Home from "./pages/Home.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";

	// Variables
	let url = "http://localhost:8080";
	let page = "";
	let game = {};
	let gameProps = null;
	const games = [
		{
			title: "Roadway Repair",
			card_img: "/assets/games/cards/rrmenu.png",
			desc: "lorem ipsum",
			platform: "phone",
		},
		{
			title: "Bouncy Balloons",
			card_img: "/assets/games/cards/voter1.png",
			desc: "Bouncy Balloons is part of a mobile web game suite I did in 2016. It features 30 levels with increasing mechanics and physics challenges.",
			platform: "phone",
		},
		{
			title: "Game3",
			card_img: "/assets/games/cards/musklander1.png",
			desc: "loren ipsum laptop",
			platform: "laptop",
		},
	];

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

<main>
	<Navbar />

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

<style>
	main {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
