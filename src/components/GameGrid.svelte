<script>
    import GameCard from "./../components/GameCard.svelte";
    import { games, gameTags } from "../stores";
    let tag = "mobile";

    function getTagCount(tag) {
        let sum = games.reduce((count, game) => {
            if (game.tags.includes(tag) || tag === "all") {
                return count + 1;
            } else {
                return count;
            }
        }, 0);

        return sum;
    }
</script>

<div class="content">
    <div class="filter">
        <div class="filter__content">
            <h3 class="filter__header">
                {tag[0].toUpperCase() + tag.substring(1)}
            </h3>
            <div class="filter__dropdown">
                {#each gameTags as filter}
                    {#if filter !== tag}
                        <div
                            class="filter__item"
                            on:click={(e) => (tag = filter)}
                        >
                            <h3>
                                {filter[0].toUpperCase() + filter.substring(1)}
                            </h3>
                            <p>
                                ({getTagCount(filter)})
                            </p>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>

    <div class="games">
        {#each games as game}
            {#if game.tags.includes(tag)}
                <GameCard
                    title={game.title}
                    src={game.cover}
                    gif={game.gif}
                    size={game.size}
                />
            {:else if tag === "all"}
                <GameCard
                    title={game.title}
                    src={game.cover}
                    gif={game.gif}
                    size={game.size}
                />
            {/if}
        {/each}
    </div>
</div>

<style>
    .filter {
        color: whitesmoke;
        display: flex;
        justify-content: flex-end;
    }

    .filter h3 {
        margin: 0;
        padding: 0.25rem 0;
        max-width: 100%;
    }

    .filter__content {
        flex: 0.2;
        position: relative;
        margin: 15px;
    }

    .filter__header {
        background: #000000d5;
        margin: 10px;
    }

    .filter__dropdown {
        position: absolute;
        width: 100%;
        z-index: 1;
        background: #000000b5;
        display: none;
    }

    .filter__content:hover .filter__dropdown {
        display: block;
    }

    .filter__item:hover {
        background: #ffffff8f;
        cursor: pointer;
    }

    .filter__header:hover {
        background: #5e5e5e8f;
        cursor: pointer;
    }

    .filter__item,
    .filter__header {
        transition: background-color 50ms;
        border-bottom: #55535e 2px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4%;
        padding: 5px 0;
    }

    .filter__item p {
        margin: 0;
    }

    .games {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-rows: 200px;
        grid-auto-flow: dense;
    }
</style>
