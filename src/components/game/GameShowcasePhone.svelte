<!-- On mobile, show phone with gif, with text on it that says play in browser (if possible) or button below -->
<script>
    import Phone from "../Phone.svelte";
    import { Lightbox } from "svelte-lightbox";
    export let src = "";
    export let date = "";
    export let icon = "";
    export let title, links, desc, gif;
    export let hasDesktopPreview, hasMobilePreview;
</script>

<h2 class="dash title">{title}</h2>

<div class="showcase content__section">
    <div class="preview">
        <div style="margin-inline: 15%">
            <Phone {src} {gif} {hasDesktopPreview} {hasMobilePreview} />
        </div>
    </div>

    <div class="details">
        <div style="margin-inline: 0%">
            <div />
            <h2 class="titleAlt">{title}</h2>

            <div class="links content__text content__section">
                {#each links as link}
                    <a href={link.link} target="new">
                        <h4 style="max-width: 100%">{link.label}</h4>
                    </a>
                {/each}
            </div>

            <div class="content__section">
                <p class="content__text ">
                    {#if date}
                        <p><b>Release Date: </b> {date}</p>
                    {/if}
                    <svelte:component this={desc} />
                </p>
            </div>
            {#if icon}
                <div class="icon">
                    <Lightbox>
                        <img src={icon} alt="Game Icon" />
                    </Lightbox>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .showcase {
        display: flex;
    }

    .title {
        display: none;
    }

    .preview {
        max-width: 100%;
        flex: 1;
    }

    .details {
        flex: 1;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
    }

    .icon {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon img {
        max-width: 30%;
    }

    @media (max-width: 768px) {
        .showcase {
            flex-direction: column;
        }

        .title {
            display: table;
        }

        .titleAlt {
            display: none;
        }
    }
</style>
