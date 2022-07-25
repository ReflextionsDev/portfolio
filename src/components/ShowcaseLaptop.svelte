<!-- On mobile, show gif in desktop image -->

<script>
    import Laptop from "./Laptop.svelte";
    export let src = "";
    export let title, links, desc;
</script>

<h2 class="dash title">{title}</h2>

<div style="padding: 5% 15% 2%">
    <Laptop {src} />
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
        {desc}
    </p>
</div>

<style>
    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5%;
    }
</style>
