<script>
    import GameShowcase from "./GameShowcase.svelte";
    import { games } from "../../stores";

    export let title;

    let gameProps = {};
    gameProps = games.find((gameObj) => {
        return gameObj.title === title;
    });
</script>

<GameShowcase {...gameProps} />
