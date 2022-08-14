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
    export let fullPage = false;

    export let deps = "";
    console.log("deps", deps);

    export let fullDesc;

    export let stack = [];
    export let techs = [];
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

    <div class="content__section content__text">
        <div>
            <p>{desc}</p>


            <div class="techused">
                <div class="tech">
                <i>Technologies: </i>
                    <ul>
                        {#each techs as tech}
                            <li>
                                <a href={tech.link} target="tech"
                                    >{tech.label}</a
                                >
                            </li>
                        {/each}
                    </ul>
                </div>
                <div class="tech">
                    <i>Dependencies: </i>
                    <ul>
                        {#each deps as dep}
                            <li>
                                <a href={dep.link} target="dep">{dep.label}</a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <br />
            <svelte:component this={fullDesc} />
        </div>
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
    /* Splash */
    .splash {
        padding: 1% 10% 1%;
    }

    @media (max-width: 1200px) {
        .splash {
            padding: 5% 5% 2%;
        }
    }

    /* Images */
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

    /* Links */
    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
    }

    /* Text */
    .techused {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        column-gap: 15px;
    }

    .tech {
        margin-right: auto;
    }
    
</style>
