<!-- Need to optimize gifs... maybe use videos, or cut them even shorter, downscale -->
<script>
    import GameCard from "./GameCard.svelte";
    import { games, gameTags, iconSize } from "../../stores";
    import MenuIcon from "../icons/MenuIcon.svelte";

    let tag = "featured";
    // For testing
    // tag = "all"

    function updateTag(filter) {
        tag = filter;
    }

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

<!-- Needs to not load gifs on mobile -->

<div>
    <!-- Filter -->
    <div class="filter">
        <div class="filter__content">
            <h3 class="filter__header">
                {tag[0].toUpperCase() + tag.substring(1)}
                <MenuIcon size={36} />
            </h3>
            <div class="filter__dropdown">
                {#each gameTags as filter}
                    {#if filter !== tag}
                        <div
                            class="filter__item"
                            on:click={(e) => updateTag(filter)}
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

    <!-- Game Cards -->
    <div class="games content__padding">
        {#each games as game}
            {#if game.tags.includes(tag)}
                <GameCard
                    title={game.title}
                    src={game.cover}
                    gif={game.gif}
                    size={game.size}
                    tags={game.tags}
                />
            {:else if tag === "all"}
                <GameCard
                    title={game.title}
                    src={game.cover}
                    gif={game.gif}
                    size={game.size}
                    tags={game.tags}
                />
            {/if}
        {/each}
    </div>
</div>

<style>
    /* Filter */
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
        min-width: 200px;
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
        gap: 4%;
        align-items: center;
    }

    .filter__item {
        justify-content: center;
        padding: 5px 0;
    }

    .filter__header {
        background: #000000d5;
        margin: 10px;
        justify-content: space-between;
        padding-inline: 10px !important;
    }

    .filter__item p {
        margin: 0;
    }

    /* Games */
    .games {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-rows: 200px;
        grid-auto-flow: dense;
    }

    /* Grid breakpoints */
    @media (max-width: 870px) {
        .games {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-auto-rows: 150px;
        }
    }

    @media (max-width: 700px) {
        .games {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            grid-auto-rows: 140px;
        }
    }

    @media (max-width: 600px) {
        .games {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            grid-auto-rows: 120px;
        }
    }

    @media (max-width: 330px) {
        .games {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            grid-auto-rows: 80px;
        }
    }
</style>
