<!-- Section is a formatting component for angled backdrops, should have the following props:
    - Top, Bottom: boolean angles determining to have skewed backdrop
    - Content: a svelte component to be display as content
    - BG: background color to be displayed   
    - SkewAngle
 -->
<script>
    export let top = false,
        bottom,
        bg;
    console.log("top", top);
</script>

<div class="section" class:top class:bottom style="--backgroundColor: {bg}">
    <div class="slot">
        <slot />
    </div>
</div>

<style>
    .slot {
        position: relative;
        z-index: 1;
    }

    .section {
        position: relative;
        background-color: var(--backgroundColor);
    }

    .top::before,
    .bottom::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: inherit;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .top::before {
        transform-origin: bottom left;
        transform: skewY(-3deg);
    }

    .bottom::after {
        transform-origin: bottom right;
        transform: skewY(-3deg);
    }
</style>
