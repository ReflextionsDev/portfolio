<script>
	import Card from "./components/Card.svelte";
	import Games from "./components/Games.svelte";
	import Navbar from "./components/Navbar.svelte";
	import Showcase from "./components/Showcase.svelte";

	const games = [
		{
			title: "Roadway Repair",
			card_img: "/assets/games/cards/rrmenu.png",
			desc: "lorem ipsum",
			platform: "phone"
		},
		{
			title: "Bouncy Balloons",
			card_img: "/assets/games/cards/voter1.png",
			desc: "Bouncy Balloons is part of a mobile web game suite I did in 2016. It features 30 levels with increasing mechanics and physics challenges.",
			platform: "phone"
		},
		{
			title: "Game 3",
			card_img: "/assets/games/cards/musklander1.png",
			desc: "loren ipsum laptop",
			platform: "laptop"
		},
	];
</script>

<main>
	<Navbar />

	<!-- Componentize -->

	<Games games={games} />

	<!-- <Showcase {...games[1]} games={games} /> -->
	

	<!-- <Showcase {...games[2]} games={games} /> -->
</main>

<style>
	h1 {
		margin: 0;
		padding: 0;
	}

	p {
		maFrgin: 0;
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
