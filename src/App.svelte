<script>
	export let name;
	import Card from "./components/Card.svelte";
	import Navbar from "./components/Navbar.svelte";
	import Showcase from "./components/Showcase.svelte";

	const games = [
		{
			title: "Roadway Repair",
			card_img: "/assets/games/cards/rrmenu.png",
		},
		{
			title: "Bouncy Balloons",
			card_img: "/assets/games/cards/voter1.png",
			desc: "Bouncy Balloons is part of a mobile web game suite I did in 2016. It features 30 levels with increasing mechanics and physics challenges.",
		},
		{
			title: "Game 3",
			card_img: "/assets/games/cards/musklander1.png",
		},
	];
</script>

<main>
	<!-- <div class="navbar">
		<h1>Hello {name}!</h1>
		<p>
			Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to
			learn how to build Svelte apps.
		</p>
	</div> -->

	<Navbar/>

	<!-- Componentize -->
	<!-- 
	<div class="games">
			{#each games as game}
			<Card 
				title={game.title}
				src = {game.card_img}
			/>
		{/each}
	</div> -->

	<Showcase {...games[1]} />
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

	.games {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.navbar {
		background-color: aqua;
		height: 10%;
	}
</style>
