<!-- The Splash page is a combination of header content and a navbar
    At the top, landing info is displayed, below is a dynamic navigation bar
    Header is a togglable class to adjust the component when in header mode -->
<script>
    // Components
    import Info from "./Info.svelte";
    import Nav from "./NavBar.svelte";

    // Theme
    import { theme } from "../stores.js";
    let maskColor = theme.bgMasks.blue;

    // Responsive variables to set splash top to the bottom of content: so sticky position can be used
    // contentHeight is binded to splash__content, and splashTop is subscribed to content height
    let contentHeight;
    let splashTop = "0px";
    $: splashTop = -contentHeight + "px";

    // Header toggles header css class rules, elemNav is binded
    let header = false;
    let elemNav;

    // Check header mode on scroll, checks if the navbar has reached the top of the page
    function updateHeaderMode() {
        const navTop = Math.floor(elemNav.getBoundingClientRect().top);
        navTop <= 0 ? (header = true) : (header = false);
    }
</script>

<svelte:window
    on:scroll={(e) => {
        updateHeaderMode();
    }}
/>

<div class="splash" class:header style="--splashTop: {splashTop};">
    <div class="splash__bg background" class:header />
    <div class="splash__blur" class:header style="--maskColor: {maskColor};">
        <div class="splash__content" bind:offsetHeight={contentHeight}>
            <Info />
        </div>

        <div class="splash__nav" bind:this={elemNav}>
            <Nav {header} />
        </div>
    </div>
</div>

<style>
    /* Sticky the component, setting top to the bottom of the content */
    .splash {
        position: sticky;
        top: var(--splashTop);
        z-index: 100;
    }

    /* Renders a background image below the whole component */

    .splash__bg {
        z-index: -2;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        content: "";
        position: absolute;
        width: auto;
        height: inherit;
        background-image: url("/assets/backgrounds/purplebgblur.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }

    /* Reduce bg image while in header mode */
    .splash__bg.header {
        opacity: 50%;
    }

    /* Add background mask color */
    .splash__blur {
        width: auto;
        height: inherit;
        background-color: var(--maskColor);
    }

    /* Blur content behind the header in header mode */
    .splash__blur.header {
        backdrop-filter: blur(3px);
    }

    /* Adjust padding for vw, extra bottom padding for navbar */
    .splash__content {
        /* padding-top: 4vw; */
        padding-bottom: 8vw;
    }
</style>
