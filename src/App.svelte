<script>
	// Imports
	import router from "page";
	import Navbar from "./components/Navbar.svelte";
	import Home from "./pages/Home.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";

	const games = [
		{
			id: "roadwayrepair",
			title: "Roadway Repair",
			card_img: "/assets/games/cards/rrmenu.png",
			desc: "lorem ipsum",
			platform: "phone",
		},
		{
			id: "bouncyballoons",
			title: "Bouncy Balloons",
			card_img: "/assets/games/cards/voter1.png",
			desc: "Bouncy Balloons is part of a mobile web game suite I did in 2016. It features 30 levels with increasing mechanics and physics challenges.",
			platform: "phone",
		},
		{
			id: "game3",
			title: "Game3",
			card_img: "/assets/games/cards/musklander1.png",
			desc: "loren ipsum laptop",
			platform: "laptop",
		},
	];

	// Router
	let page;
	// do something w/
	let game;
	let gameProps = null;

	console.log("game props: ", gameProps);

	router("/", () => (page = "home"));
	router("/games", () => (page = "games"));
	router(
		"/games/:game",
		(ctx, next) => {
			game = ctx.params.game
			gameProps = games.filter((gameObj) => {
				return gameObj.title.split(" ").join("").toLowerCase() === game;
			});

			gameProps = gameProps[0];

			console.log("game props: ", gameProps);
			next();
		},
		() => (page = "gameShowcase")
	);
	router("/*", () => (page = "home"));
	router.start();

	console.log("game props: ", gameProps);
</script>

<main>
	<Navbar />
	<!-- <svelte:component this={page} {games} {...games[1]} title={params} /> -->

	{#if page === "home"}
		<Home />
	{:else if page === "games"}
		<Games {games} />
	{:else if page === "gameShowcase"}
		<!-- Validate here -->

		{#if gameProps == null}
			<!-- <Games {games} /> -->
			{window.location.replace("http://localhost:8080/games")}
		{:else}
			<GameShowcase {...gameProps} />
		{/if}

		<!-- make sure title exists, if so, pass destructured index, else return to games -->

		<!-- {#if game = ''} -->
	{:else}
		<!-- <Home /> -->
		{window.location.replace("http://localhost:8080")}
	{/if}

	<!-- Componentize -->

	<!-- <Games games={games} /> -->

	<!-- could do url validation in showcase(rename to game?) break down pages too 
	
		If 'directory' = game.title / render, else > return to games... but not great
		Figure out how to architect

	-->

	<!-- <Showcase {...games[2]} games={games} /> -->
</main>

<style>
	h1 {
		margin: 0;
		padding: 0;
	}

	p {
		margin: 0;
		padding: 0;
	}

	main {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.navbar {
		background-color: aqua;
		height: 10%;
		min-height: 10%;
	}
</style>
