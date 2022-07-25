<script>
    // Imports
    import { Lightbox } from "svelte-lightbox";
    import Laptop from "../components/Laptop.svelte";
    import Phone from "../components/Phone.svelte";
    import ShowcaseLaptop from "../components/ShowcaseLaptop.svelte";
    import ShowcasePhone from "../components/ShowcasePhone.svelte";

    // Vars
    export let title;
    export let desc;
    export let platform;
    export let cover;
    export let images;
    export let src;
    export let links = [];
    export let videos = [];
    export let fullPage = false;

    console.log(videos);
</script>

<!-- Later add: open as page -->
<!-- On mobile, hide preview object, only show links (play in browser) for mobile, for desktop games, show gif in laptop -->
<!-- For landscape, adjust spotlight flex and make page bigger (vw height) -->
<!-- Should componetize -->
<!-- allow user to click images for full size module popup -->
<!-- Add gallery support -->
<!-- Make open as page button scroll to top page -->

<!-- <div>
    <div class="showcase">
        <div class="preview">
            {#if platform === "phone"}
                <Phone {src} />
            {:else if platform === "laptop"}
                <div class="laptop__wrapper">
                    <Laptop {src} />
                </div>
            {/if}
        </div>

        <div class="info">
            <div class="details">
                <div class="content">
                    <h1>{title}</h1>
                    <p style="font-size:1.5em; text-align:justify">
                        {desc}
                    </p>

                    <div class="details__images">
                        {#each images as image}
                            <img src={image.src} alt={image.alt} />
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->

<!-- {#if platform === "phone"}
    <div class="showcase">
        <div class="preview">
            <Phone {src} />
        </div>

        
        <div class="info">
            <p class="info__item info__desc content__text">
                {desc}
            </p>

            {#each images as image}
                <div class="info__item">
                    <img src={image.src} alt={image.alt} />
                </div>
            {/each}
        </div>
    </div>
{:else if platform === "laptop"} -->

<div class="content">
    <!-- Showcase Type -->
    {#if platform === "phone"}
        <ShowcasePhone {src} {title} {links} {desc} />
    {:else if platform === "laptop"}
        <ShowcaseLaptop {src} {title} {links} {desc} />
    {/if}

    <!-- Media -->
    <div class="content__section content__padding images">
        {#each videos as video}
            <div class="image">
                <iframe
                    class="video"
                    src={video.src}
                    title="YouTube video player"
                    frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media;picture-in-picture"
                    allowfullscreen
                />
            </div>
        {/each}
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
            href={`/games/${title.split(" ").join("").toLowerCase()}`}
            target="new"
        >
            <button class="button">Open as page</button>
        </a>
    {/if}
</div>

<style>
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
    }

    .video {
        width: 1193px;
        aspect-ratio: 16/9;
    }
</style>
