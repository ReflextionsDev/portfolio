<script>
    import { Lightbox } from "svelte-lightbox";
    import MediaQuery from "svelte-media-query";

    // If preview on large device is supported, load from src, else load GIF
    // On large screens content is embeded, on smaller screens a link appears over the GIF
    export let img, src, gif, hasDesktopPreview, hasMobilePreview;

    // If img is defined, content is static and does not have preview content
    let preview = false;
    if (img === "") {
        preview = true;
    }
</script>

<div class="screen">
    <MediaQuery query="(min-width: 1200px)" let:matches>
        {#if preview}
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
        {:else}
            <div class="lightbox">
                <Lightbox transitionDuration="150">
                    <img class="gif" src={img} alt="project preview" />
                </Lightbox>
            </div>
        {/if}
    </MediaQuery>
</div>

<style>
    .screen {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .demo {
        position: relative;
        width: 100%;
        height: 100%;
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

    iframe {
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .gif {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    .lightbox {
        width: 100%;
    }
</style>
