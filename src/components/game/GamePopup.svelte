<script>
    import GameShowcase from "./GameShowcase.svelte";
    import { games } from "../../stores";

    export let title;

    let gameProps = {};
    gameProps = games.find((gameObj) => {
        return gameObj.title === title;
    });
</script>

<div class="popup">
    <GameShowcase {...gameProps} />
</div>

<style>
    .popup {
        margin-bottom: 100px;
    }
</style>
