<!-- Should be modular, accept images, title text, tech stack, order, links, etc -->
<script>
    // Imports
    import ProjectSplash from "./ProjectSplash.svelte";

    // Vars
    export let title, desc;
    export let stack = [];
    export let reverse = false;
    export let splash = "both";
    export let link = "";
    export let preview = {};
    export let youAreHere = false;

    // Modal
    import { getContext } from "svelte";
    import Popup from "./ProjectPopup.svelte";
    const { open } = getContext("simple-modal");
    const openPopup = () => open(Popup, { title });
</script>

<div class="project content">
    <h3 class="project__title">{title}</h3>

    <div class="spotlight content__section" class:reverse>
        <div on:click={openPopup}>
            <ProjectSplash {reverse} {splash} {preview} />
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
            {#if youAreHere}
                <div class="tooltip">
                    <span class="tooltiptext">You are here!</span>
                    <button class="button">Live Demo</button>
                </div>
            {:else}
                <a href={link} target="project"
                    ><button class="button">Live Demo</button>
                </a>
            {/if}

            <button class="button" on:click={openPopup}>
                More Info & Source
            </button>
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
        position: relative;
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

    /* Tooltip */
    .tooltip {
        position: relative;
        display: inline-block;
    }
    .tooltip .tooltiptext {
        opacity: 0;
        width: 120px;
        background-color: rgba(42, 14, 114, 0.746);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 10px;
        position: absolute;
        z-index: 1;
        bottom: 120%;
        transition-property: opacity;
        transition-delay: 100ms;
        transition-duration: 200ms;
        font-size: 0.9rem;
        margin-left: -10%;
    }

    .tooltip:hover .tooltiptext {
        opacity: 100;
    }

    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(42, 14, 114, 0.746) transparent transparent
            transparent;
    }
</style>
