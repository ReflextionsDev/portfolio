<script>
    import Laptop from "../components/Laptop.svelte";
    import Phone from "../components/Phone.svelte";

    import { theme } from "../stores";

    export let title;
    export let desc;
    export let platform;
    export let cover;
    export let images;
    export let src;
    export let links = [];

    console.log("links", links);
</script>

<!-- Later add: open as page -->
<!-- On mobile, hide preview object, only show links (play in browser) for mobile, for desktop games, show gif in laptop -->
<!-- For landscape, adjust spotlight flex and make page bigger (vw height) -->
<!-- Should componetize -->
<!-- allow user to click images for full size module popup -->

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
    <h2 class="dash">{title}</h2>

    {#if platform === "phone"}
        <Phone {src} />
    {:else if platform === "laptop"}
        <div style="padding: 5% 15% 2%">
            <Laptop {src} />
        </div>
    {/if}

    <div class="links">
        {#each links as link}
            <a href={link.link} target="new">
                <h4 style="max-width: 100%">{link.label}</h4>
            </a>
        {/each}
    </div>

    <div class="content__section">
        <p class="content__text ">
            {desc}
        </p>
    </div>

    <div class="content__section content__padding images">
        {#each images as image}
            <div class="image">
                <img src={image.src} alt={image.alt} />
            </div>
        {/each}
    </div>
</div>

<style>
    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
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
    }
</style>
