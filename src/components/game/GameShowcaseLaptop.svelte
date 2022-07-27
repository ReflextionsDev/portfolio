<!-- On mobile, show gif in desktop image -->
<script>
    import Laptop from "../Laptop.svelte";
    export let src = "";
    export let date = "";
    export let title, links, desc, gif;
    export let hasDesktopPreview, hasMobilePreview;
</script>

<h2 class="dash title">{title}</h2>

<div class="laptop-wrapper">
    <Laptop {src} {gif} {hasDesktopPreview} {hasMobilePreview} />
</div>

<div class="links">
    {#each links as link}
        <a href={link.link} target="game">
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

<style>
    .laptop-wrapper {
        padding: 5% 15% 2%;
    }

    @media (max-width: 1200px) {
        .laptop-wrapper {
            padding: 5% 5% 2%;
        }
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
    }
</style>
