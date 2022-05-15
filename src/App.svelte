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
			src: "https://tangerine-duckanoo-61afbc.netlify.app/",
			size: "tall"
		},
		{
			title: "Bouncy Balloons",
			cover: "/assets/games/bouncyballoons/bouncyballoons1.png",
			images: [
				{
					src: "/assets/games/bouncyballoons/bouncyballoons1.png",
					alt: "bouncy balloons menu screen",
				},
				{
					src: "/assets/games/bouncyballoons/bouncyballoons2.png",
					alt: "bouncy ballons screenshot (1)",
				},
				{
					src: "/assets/games/bouncyballoons/bouncyballoons3.png",
					alt: "bouncy ballons screenshot (2)",
				},
			],
			desc: "Bouncy Balloons is a physics based puzzle game. It is part of a mobile web game suite I did in 2016. It features 20 levels with increasing mechanics and difficulty.",
			platform: "phone",
			src: "https://stupendous-cobbler-26964c.netlify.app/",
			size: "wide"
		},
		{
			title: "Brix Builder",
			cover: "/assets/games/brixbuilder/brixbuilder1.png",
			images: [
				{
					src: "/assets/games/brixbuilder/brixbuilder1.png",
					alt: "Brix Builder menu screen",
				},
				{
					src: "/assets/games/brixbuilder/brixbuilder2.png",
					alt: "Brix Builder screenshot (1)",
				},
				{
					src: "/assets/games/brixbuilder/brixbuilder3.png",
					alt: "Brix Builder screenshot (2)",
				},
			],
			desc: "Brix Builder is an arcade inspired stacking game. It is part of a mobile web game suite I did in 2016. It features 3 difficulties with 7 levels each.",
			platform: "phone",
			src: "https://deluxe-haupia-237473.netlify.app/",
			size: "big"
		},
		

		{
			title: "Rocket Runner",
			cover: "/assets/games/rocketrunner/rocketrunner1.png",
			images: [
				{
					src: "/assets/games/rocketrunner/rocketrunner1.png",
					alt: "Rocket Runner menu screen",
				},
				{
					src: "/assets/games/rocketrunner/rocketrunner2.png",
					alt: "Rocket Runner screenshot (1)",
				},
				{
					src: "/assets/games/rocketrunner/rocketrunner3.png",
					alt: "Rocket Runner screenshot (2)",
				},
			],
			desc: "Rocket Runner is an simple dodging game with unlockable skins and currency. It is part of a mobile web game suite I did in 2016.",
			platform: "phone",
			src: "https://deluxe-haupia-237473.netlify.app/",
			size: "normal"
		},
		{
			title: "Game3",
			cover: "/assets/games/cards/musklander1.png",
			images: [],
			desc: "loren ipsum laptop",
			platform: "laptop",
			src: "https://fr.wikipedia.org/wiki/Main_Page",
			size: "normal"
		},
		// {
		// 	title: "Game4",
		// 	cover: "/assets/games/cards/testgif.gif",
		// 	images: [],
		// 	desc: "loren ipsum laptop",
		// 	platform: "laptop",
		// 	src: "https://fr.wikipedia.org/wiki/Main_Page",
		// },
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
