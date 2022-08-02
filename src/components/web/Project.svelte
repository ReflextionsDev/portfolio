<!-- Should be modular, accept images, title text, tech stack, order, links, etc -->
<script>
    import Laptop from "../Laptop.svelte";

    export let title, desc;
    export let stack = [];
    export let reverse = false;
</script>

<div class="project content">
    <h3 class="project__title">{title}</h3>

    <div class="spotlight content__section" class:reverse>
        <div style="padding-inline: 30px">
            <Laptop img="/assets/games/protoshift/protoshiftCover.png"/>
        </div>

        <div style="display: flex; justify-content: center; gap: 5% ">
            {#each stack as item}
                <h4>{item}</h4>
            {/each}
        </div>
    </div>

    <div class="info content__section" class:reverse>
        <h3 class="info__title">{title}</h3>

        <p class="info__text">
            {desc}
        </p>
        <div class="buttons">
            <button class="button">Live Demo</button>
            <button class="button">More Info & Source</button>
        </div>
    </div>
</div>

<style>
    .project {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
    }

    .project__title {
        width: 100%;
        order: 1;
    }

    .spotlight h4 {
        margin: 1rem 0;
    }

    .spotlight {
        order: 2;
    }

    .info {
        order: 3;
    }

    .buttons {
        margin: 25px;
        display: flex;
        justify-content: center;
        gap: max(10%, 15px);
        flex-wrap: wrap;
    }

    /* Reverse class allows swapping of spotlight and info */
    @media (min-width: 768px) {
        .spotlight.reverse {
            order: 3;
        }
        .info.reverse {
            order: 2;
        }
    }

    .spotlight,
    .info {
        flex: 1;
    }

    p {
        text-align: left;
    }

    /* Hide shared title on big display */
    @media (min-width: 1200px) {
        .project__title {
            display: none;
        }
    }

    /* Replace info title with shared title on smaller display */
    @media (max-width: 1200px) {
        .info__title {
            display: none;
        }

        .info__text {
            display: inline-block;
            max-width: 90%;
        }
    }

    /* Tablets */
    @media (max-width: 992px) {
        p {
            margin: 0;
        }

        .spotlight {
            width: 75%;
        }
    }

    /* Phones */
    @media (max-width: 768px) {
        .project {
            flex-direction: column;
            align-items: center;
        }

        .spotlight {
            width: 100%;
        }
    }
</style>
