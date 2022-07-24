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

{#if platform === "phone"}
    <Phone {src} />
{:else if platform === "laptop"}
    <div class="showcase content" style="flex-direction: column;">
        <h2 class="dash">{title}</h2>

        <div class="preview" style="padding: 5% 15%">
            <Laptop {src} />
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
{/if}

<style>
    .info__item {
        max-width: 50%;
        gap: 45px;
        
    }
    .laptop__wrapper {
    }

    /* [Showcase] */
    .showcase {
        display: flex;
    }

    /* [Spotlight] */
    .preview {
        flex: 1;
    }

    .info {
        /* flex: 1;
        display: flex;
        justify-content: center;
        align-items: center; */
        /* max-height: 100%; */
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .details {
        /* flex: 1; */
        /* overflow-y: auto; */
        /* overflow-x: hidden; */
        /* max-width: 100%; */
        /* max-height: 88%; */
    }

    .info__desc {
        flex: 1;
    }

    .info__images {
        /* max-height: 100%; */
        flex: 1;
        /* overflow: auto; */
    }

    img {
        /* padding: 20%; */
        max-width: 100%;
        border-radius: 4%;
    }

    .info__images {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 45px;
        padding: 30px 0px;
    }
</style>
