<script>
    import Phone from "./../Phone.svelte";
    import Laptop from "../Laptop.svelte";
    export let reverse, splash, preview;
</script>

<div style="padding-inline: 30px" class="content__splash">
    {#if splash === "laptop"}
        <Laptop img={preview.desktop} />
    {:else if splash === "both"}
        <Laptop img={preview.desktop} />
        <div class="phoneOverlay" class:reverse>
            <Phone img={preview.mobile} />
        </div>
    {:else}
        <Laptop img="/assets/games/protoshift/protoshiftCover.png" />
    {/if}
</div>

<style>
    .content__splash {
        position: relative;
    }
    
    .phoneOverlay {
        position: absolute;
        bottom: -10%;
        height: 60%;
        left: 2%;
    }

    .phoneOverlay.reverse {
        left: auto;
        right: 2%;
    }
</style>
