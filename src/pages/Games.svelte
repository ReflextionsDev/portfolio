<script>
	import GameCard from './../components/GameCard.svelte';
	export let games;
</script>

<div class="games">
	{#each games as game}
		<GameCard title={game.title} src={game.card_img} />
	{/each}
</div>

<style>
	.games {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
