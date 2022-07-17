<!-- Section is a formatting component for angled backdrops, should have the following props:
    - Top, Bottom: boolean angles determining to have skewed backdrop
    - Content: a svelte component to be display as content
    - BG: background color to be displayed   
    - SkewAngle
 -->

 <!-- Add support for background image and color mask on top -->
<script>
    import { theme } from "../stores.js";
    export let top, bottom, bg;

    let { skewAngle } = theme;
</script>

<div
    class="section"
    class:top
    class:bottom
    style="
        --backgroundColor: {bg};
        --skewAngle: {skewAngle + 'deg'};"
>
    <div class="slot">
        <div class="content">
            <slot />
        </div>
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
        padding: 1vh 0 8vh;
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
        transform: skewY(var(--skewAngle));
    }

    .top::before {
        transform-origin: bottom left;
    }

    .bottom::after {
        transform-origin: bottom right;
    }
</style>
