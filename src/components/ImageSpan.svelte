<script>
    import { Lightbox } from "svelte-lightbox";

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
            <Lightbox>
                <img src={image.src} alt={image.alt} />
            </Lightbox>
        </div>
    {/each}
</div>

<style>
    .images {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 1%;
    }

    .image {
        flex: 1;
    }

    img {
        /* min-width: 180px; */
        max-width: 100%;
    }
</style>
