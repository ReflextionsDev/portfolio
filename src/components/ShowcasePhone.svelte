<!-- On mobile, show phone with gif, with text on it that says play in browser (if possible) or button below -->

<script>
    import Phone from "./Phone.svelte";
    export let src = "";
    export let title, links, desc;
</script>

<h2 class="dash title">{title}</h2>

<div class="showcase content__section">
    <div class="preview">
        <div style="margin-inline: 15%">
            <Phone {src} />
        </div>
    </div>

    <div class="details">
        <div style="margin-inline: 0%">
            <h2 class="titleAlt dash">{title}</h2>
            <div class="links content__text content__section">
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
        flex: 1;
        max-width: 100%;
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
</style>
