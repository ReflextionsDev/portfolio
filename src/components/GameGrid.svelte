<script>
    import GameCard from "./../components/GameCard.svelte";
    import { games } from "../stores";
    export let tag = "all";
</script>

<div class="games content">
    {#each games as game}
        <GameCard
            title={game.title}
            src={game.cover}
            gif={game.gif}
            size={game.size}
        />
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
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-rows: 200px;
        grid-auto-flow: dense;
        padding: 5% 5%;

        /* background-color: rgb(237, 237, 237); */
    }

    .games {
        /* margin-top: 100px; */
        /* padding: 50px 50px 200px 50px; */
        /* background-color: #94e0e0; */
        /* position: relative; */
        /* z-index: 1; */
    }
</style>
