<script>
    // Imports
    import { Lightbox } from "svelte-lightbox";
    import ProjectSplash from "./ProjectSplash.svelte";

    // Vars
    export let title = "project tile",
        desc = "project desc",
        images = [],
        src = "",
        gif = "",
        date = "";

    export let links = [];
    export let videos = [];
    export let fullPage = false;

    export let stack = [];
    export let reverse = false;
    export let splash = "both";
    export let link = "";
    export let preview = {};
    export let youAreHere = false;
</script>

<!-- On mobile, hide preview object, only show links (play in browser) for mobile, for desktop games, show gif in laptop -->
<!-- For landscape, adjust spotlight flex and make page bigger (vw height) -->

<!-- allow user to click images for full size module popup -->
<!-- Add gallery support -->
<!-- Make open as page button scroll to top page -->

<div class="content">
    <h2 class="dash title">{title}</h2>

    <div class="splash">
        <ProjectSplash {reverse} {splash} {preview} />
    </div>

    <div class="links">
        {#each links as link}
            <a href={link.link} target="game">
                <h4 style="max-width: 100%">{link.label}</h4>
            </a>
        {/each}
    </div>

    <div class="content__section">
        <p class="content__text ">
            {#if date}
                <p><b>Release Date: </b> {date}</p>
            {/if}
            <!-- <svelte:component this={desc} /> -->
            {desc}
        </p>
    </div>

    <!-- Media -->
    <div class="content__section content__padding images">
        {#each images as image}
            <div class="image">
                <Lightbox transitionDuration="150">
                    <img src={image.src} alt={image.alt} />
                </Lightbox>
            </div>
        {/each}
    </div>

    <!-- Full Page Button -->
    {#if !fullPage}
        <a
            href={`/projects/${title.split(" ").join("").toLowerCase()}`}
            target="new"
        >
            <button class="button">Open as page</button>
        </a>
    {/if}
</div>

<style>
    .splash {
        /* margin-bottom: 50px; */
        /* margin-top: 50px; */
        padding: 1% 10% 1%;
    }

    @media (max-width: 1200px) {
        .splash {
            padding: 5% 5% 2%;
        }
    }

    img {
        max-width: 100%;
    }

    .images {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .image {
        flex: 1;
        min-width: max(270px, 40%);
        margin: 10px;
        display: flex;
        justify-content: center;
    }

    .video {
        width: 1193px;
        aspect-ratio: 16/9;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
    }
</style>
