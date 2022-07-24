<script>
    import GameShowcase from "../pages/GameShowcase.svelte";
    import { games } from "../stores";

    export let title;

    let gameProps = {};
    gameProps = games.find((gameObj) => {
        return gameObj.title === title;
    });
</script>

<GameShowcase {...gameProps} />
