<script>
	// Imports
	import router from "page";
	import Navbar from "./components/Navbar.svelte";
	import Home from "./pages/Home.svelte";
	import Games from "./pages/Games.svelte";
	import GameShowcase from "./pages/GameShowcase.svelte";

	// Router
	let page;
	// do something w/
	let params = "";

	router("/", () => (page = Games));
	router("/games", () => (page = Games));
	router(
		"/games/:id",
		(ctx, next) => {
			params = ctx.params.id;
			next();
		},
		() => (page = GameShowcase)
	);
	router.start();

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


</script>

<main>
	<Navbar />
	<svelte:component this={page} {games} {...games[1]} title={params} />

	

	<!-- Componentize -->

	<!-- <Games games={games} /> -->

	<!-- could do url validation in showcase(rename to game?) break down pages too 
	
		If 'directory' = game.title / render, else > return to games... but not great
		Figure out how to architect

	-->


	<!-- <Showcase {...games[1]} games={games} /> -->

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
