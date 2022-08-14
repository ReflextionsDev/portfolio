<script>
    // Lightbox disabled for now because of inability to use object-fit
    // import { Lightbox } from "svelte-lightbox";
    export let images = [
        {
            src: "",
            alt: "",
        },
    ];
</script>

<div class="images">
    {#each images as image}
        <div class="image">
            <!-- <Lightbox> -->
                <img src={image.src} alt={image.alt} />
            <!-- </Lightbox> -->
        </div>
    {/each}
</div>

<style>
    .images {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        /* gap: 1%; */
    }

    .image {
        flex: 1;
        height: inherit;
        padding: 1%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        min-width: 180px;
        max-width: 100%;
        height: 100%;
        max-height: 209px;
        object-fit: cover;
    }
</style>
