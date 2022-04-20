<script>
	import Card from "./Card.svelte";
	export let games;
	console.log(games);
</script>

<div class="games">
	{#each games as game}
		<Card title={game.title} src={game.card_img} />
	{/each}
</div>

<style>
	.games {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
