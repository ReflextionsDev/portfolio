<!-- Section is a formatting component for angled backdrops, should have the following props:
    - Top, Bottom: boolean angles determining to have skewed backdrop
    - Content: a svelte component to be display as content
    - BG: background color to be displayed   
    - SkewAngle
 -->
<script>
    import { theme } from "../stores.js";
    export let top, bottom, bg;
    export let contentNoClip = false;

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
        <div class="content" class:contentNoClip>
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
        /* background-color: var(--backgroundColor); */
        background: var(--backgroundColor);
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
        box-shadow: 0 0 40px #000000de;
    }

    .bottom::after {
        transform-origin: bottom right;
        box-shadow: 0 0 40px #000000de;
        clip-path: polygon(0% 0%, 100% 0%, 100% 120%, 0% 120%);
    }
</style>
