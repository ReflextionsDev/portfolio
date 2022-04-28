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
	// URLS are temporary, need to update with sitelock versions after domain registered
	const games = [
		{
			title: "Roadway Repair",
			cover: "/assets/games/roadwayrepair/rrmenu.png",
			images: [
				{
					src: "/assets/games/roadwayrepair/rrmenu.png",
					alt: "roadway repair menu screen",
				},
				{
					src: "/assets/games/roadwayrepair/roadway1.png",
					alt: "roadway repair menu, levels, and tutorial screen",
				},
				{
					src: "/assets/games/roadwayrepair/roadway2.png",
					alt: "roadway level screens",
				},
			],
			desc: "Roadway Repair is a pipes-stlye puzzle game themed around... well, roads. It is part of a mobile web game suite I did in 2016. I think was the first game I spent money outsourcing the art on.",
			platform: "phone",
			src: "https://euphonious-dolphin-56fff0.netlify.app/",
		},
		{
			title: "Bouncy Balloons",
			cover: "/assets/games/cards/voter1.png",
			images: [],
			desc: "Bouncy Balloons is part of a mobile web game suite I did in 2016. It features 30 levels with increasing mechanics and physics challenges.",
			platform: "phone",
			src: "https://euphonious-dolphin-56fff0.netlify.app/",
		},
		{
			title: "Game3",
			cover: "/assets/games/cards/musklander1.png",
			images: [],
			desc: "loren ipsum laptop",
			platform: "laptop",
			src: "https://fr.wikipedia.org/wiki/Main_Page",
		},
		{
			title: "Game4",
			cover: "/assets/games/cards/testgif.gif",
			images: [],
			desc: "loren ipsum laptop",
			platform: "laptop",
			src: "https://fr.wikipedia.org/wiki/Main_Page",
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
