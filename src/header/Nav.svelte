<!-- Show web title and icon when in header mode -->
<script>
    // Theme
    import { theme } from "../stores.js";
    let fillColor = theme.bgColors.primary;

    // Dynamic variable used to change navbar skew as the user scrolls down
    let skewBase = theme.skewAngle;
    let skewAngle = skewBase + "deg";

    // Easing
    function easeInQuart(x) {
        return x * x * x * x;
    }

    // Recalculate skew angle on scroll
    function NavScroll() {
        // Scroll angle is determined by scroll progress of the splash content
        const elem = document.querySelector(".splash__content");

        let distScrolled = Math.abs(elem.getBoundingClientRect().top);
        let elemHeight = elem.offsetHeight;

        // Percentage of the element that has been scrolled, capped at 100
        let progress = Math.min(
            Math.round((distScrolled / elemHeight) * 100),
            100
        );

        // Easing function
        progress = easeInQuart(progress / 100);

        // Invert top distance,
        let skewMultiplier = 1 - progress;
        skewAngle = skewBase * skewMultiplier + "deg";
    }
</script>

<svelte:window on:scroll={() => NavScroll()} />

<div class="tabs">
    <div class="tabs__bar" style="--skewAngle: {skewAngle};">
        <a href="/web">
            <div class="tab tab__web">
                <div>WEB</div>
            </div>
        </a>

        <a href="/games">
            <div class="tab tab__games">
                <div>GAMES</div>
            </div>
        </a>
    </div>
    <div class="tabs__fill-clip">
        <div
            class="tabs__fill"
            style="--skewAngle: {skewAngle}; --fillColor: {fillColor}"
        />
    </div>
</div>

<!-- Side shadows on hover, current tab could be higher too -->
<style>
    .tabs__fill-clip {
        width: 100%;
        height: 600%;
        overflow: hidden;
        position: relative;
        bottom: 500%;
        /* z-index: -1; */
    }

    .tabs__fill {
        content: "";
        width: 100%;
        height: 600%;
        position: absolute;
        /* background-color: rgb(26 26 26); */
        background-color: var(--fillColor);
        /* top: 48px; */
        top: 100%;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(var(--skewAngle));
        /* Smooths angled edges */
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        overflow: hidden;
    }

    .tabs {
        height: 48px;
        position: relative;
    }

    .tabs__bar {
        z-index: 1;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 41%);
        top: 0;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(var(--skewAngle));
        /* Smooths angled edges */
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .tab {
        display: flex;
        align-self: center;
        justify-content: center;
        align-items: center;
        align-self: center;
        font-size: larger;
        font-weight: bold;
        bottom: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: all 0.1s ease-out;
    }

    .tab:hover {
        /* background-color: wheat; */
        height: 120%;
    }

    .tab__web {
        z-index: 1;
        background-color: rgb(98, 29, 247);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 80%;
    }

    .tab__games {
        /* z-index: 1; */
        background-color: rgb(53, 129, 186);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 90%;
    }
</style>
