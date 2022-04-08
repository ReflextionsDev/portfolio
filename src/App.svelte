<script>
	export let name;
	import Card from "./components/Card.svelte";

	const games = [
		{
			title: "Game 1",
			card_img: "/assets/games/cards/rrmenu.png",
		},
		{
			title: "Game 2",
			card_img: "/assets/games/cards/voter1.png",
		},
		{
			title: "Game 3",
			card_img: "/assets/games/cards/musklander1.png",
		},
	];
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>

	<div class="games">

			{#each games as game}
			<Card 
				title={game.title}
				src = {game.card_img}
			/>
		{/each}
		

	</div>
	
	<!-- <Card title={23}/>
	<Card/>
	<Card/> -->
</main>

<style>

	main {
		text-align: center;
	}

	.games {
		display: flex;

		/* flex-direction: column; */
		flex-wrap: wrap;

		justify-content: center;
		
	}

</style>
