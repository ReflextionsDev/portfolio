<script>
	import GameCard from "./../components/GameCard.svelte";
	export let games;
</script>

<div class="games">
	{#each games as game}
		<GameCard title={game.title} src={game.cover} gif={game.gif} size={game.size} />
	{/each}
</div>

<style>
	.games {
		/* display: flex;
		flex-wrap: wrap;
		justify-content: center;
		overflow-y: auto;
		padding: 10px 0px; */
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-auto-rows: 200px;
		grid-auto-flow: dense;
	}
</style>
