<script>
    import GameIntro from "./GameIntro.svelte";
    import GameCard from "./../components/GameCard.svelte";
    import SectionBreak from "./../components/SectionBreak.svelte";
    import Section from "./../components/Section.svelte";
    import { theme } from "../stores";
    // export let games;
    import { games } from "../stores";
</script>

<div class="page">
    <Section top={false} bottom={false} bg={theme.bgColors.primary}>
        <GameIntro />
    </Section>

    <Section
        top={true}
        bottom={true}
        bg={"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)"}
    >
        <h2 class="dash">Games</h2>

        <h3>Featured</h3>
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

        <h3>Featured</h3>
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
    </Section>

    <SectionBreak />
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
