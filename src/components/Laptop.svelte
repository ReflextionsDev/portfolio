<!-- Support image instead of source
Add fullscreen button, which is togglable -->
<script>
    import { Lightbox } from "svelte-lightbox";
    import MediaQuery from "svelte-media-query";
    export let src;
    export let gif;
    let hasDesktopPreview = true;
    let hasMobilePreview = true;
</script>

<!-- Should prob componetize and slot laptop content -->

<div class="laptop">
    <div class="laptop__top">
        <div class="laptop__camera" />
    </div>
    <div class="laptop__mid">
        <div class="game">
            <MediaQuery query="(min-width: 1200px)" let:matches>
                {#if matches && hasDesktopPreview}
                    <iframe {src} title="Game Preview" allowfullscreen={true} />
                {:else if !matches && hasMobilePreview}
                    <div class="demo">
                        <img class="gif" src={gif} alt="gameplay gif" />
                        <a href={src} target="game">
                            <div class="cover">
                                <img
                                    class="playBtn"
                                    src="/assets/icons/play.png"
                                    alt="play button"
                                />
                            </div>
                        </a>
                    </div>
                {:else}
                    <div class="lightbox">
                        <Lightbox transitionDuration="150">
                            <img class="gif" src={gif} alt="gameplay gif" />
                        </Lightbox>
                    </div>
                {/if}
            </MediaQuery>
        </div>
    </div>
    <div class="laptop__bot">
        <div class="laptop__divot" />
    </div>
</div>

<style>
    /* Demo */
    .demo {
        position: relative;
    }

    .cover {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.056);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .playBtn {
        opacity: 80%;
        width: 50px;
        height: auto;
    }

    /* Laptop */
    .laptop {
        width: 95%;
        aspect-ratio: 3/2;
        background-color: rgb(1, 16, 11);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 0px 12px rgb(82, 82, 82);
        align-items: center;
        margin: auto;
    }

    .laptop__top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .laptop__camera {
        height: 40%;
        aspect-ratio: 1/1;
        border: rgb(40, 39, 39) 2px solid;
        border-radius: 50px;
    }

    .laptop__mid {
        width: 95%;
        /* flex: 1; */
        height: 90%;
        margin: auto;
    }

    .laptop__bot {
        flex: 1.5;
        display: flex;
        justify-content: center;
        width: 105%;
        background-color: black;
        border-radius: 15px 15px 100px 100px;
        box-shadow: 3px 5px 12px rgb(82, 82, 82);
    }

    .laptop__divot {
        background-color: rgb(40, 39, 39);
        width: 40%;
        height: 30%;
        border-radius: 0px 0px 30px 30px;
    }

    /* Preview */
    .game {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .game iframe {
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .gif {
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    .lightbox {
        width: 100%;
    }

    /* Media Query */
    @media (max-width: 1200px) {
    }
</style>
