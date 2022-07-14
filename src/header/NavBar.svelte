<!-- Show web title and icon when in header mode (NLB.DEV) -->
<script>
    // Theme
    import { theme } from "../stores.js";
    let fillColor = theme.bgColors.primary;

    // Header mode
    export let header;

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

<div class="navbar">
    <div class="tabs" class:header style="--skewAngle: {skewAngle};">
        <a href="/web" class="tab tab__web">
            <div>WEB</div>
        </a>

        <a href="/games" class="tab tab__games">
            <div>GAMES</div>
        </a>
    </div>
    <div class="navbar__fill-clip">
        <div
            class="navbar__fill"
            style="--skewAngle: {skewAngle}; --fillColor: {fillColor}"
        />
    </div>
</div>

<!-- Side shadows on hover, current tab could be higher too -->
<style>
    .navbar {
        height: 48px;
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .navbar__fill-clip {
        width: 100%;
        height: 600%;
        overflow: hidden;
        position: relative;
        bottom: 500%;
        /* z-index: -1; */
    }

    .navbar__fill {
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

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .tabs.header {
        align-items: flex-start;
    }

    .tab {
        display: flex;
        /* align-self: center; */
        justify-content: center;
        align-items: center;
        /* align-self: center; */
        font-size: larger;
        font-weight: bold;
        bottom: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: all 0.1s ease-out;

        color: white;

        height: 100%;
        width: 10%;
        min-width: 100px;

        text-decoration: none;
    }

    .tab:hover {
        background-color: rgb(178, 207, 230);
        height: 120%;
    }

    .tab__web {
        background-color: rgb(98, 29, 247);
    }

    .tab__games {
        background-color: rgb(53, 129, 186);
    }
</style>
