<script>
    import GameIntro from "../components/game/GameIntro.svelte";
    import GameGrid from "../components/game/GameGrid.svelte";
    import Section from "./../components/Section.svelte";
    import SectionBreak from "./../components/SectionBreak.svelte";
    import { theme } from "../stores";
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
        <h2 class="dash">Game Archive</h2>

        <!-- <h3>Featured, All, Web, Mobile, Freelance, Game Jam, For Sale</h3> -->

        <GameGrid />
    </Section>

    <SectionBreak />
</div>
