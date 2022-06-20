<script>
    import Info from "./../components/Info.svelte";
    import Nav from "./../components/Nav.svelte";

    let headerMode = false;

    function yeet() {
        console.log("yo");
    }

    // Maybe this should be in splash component instead

    let scroll_PastSplash = false;

    let scroll_ThresholdElement = null;
    let scroll_ToElem = null;

    let elem_Splash = null;

    // convert to svelte on: ?

    // better way to do this?
    document.addEventListener("DOMContentLoaded", function () {
        scroll_ThresholdElement = document.querySelector(".info__links");
        scroll_ToElem = document.querySelector(".tabs");
        elem_Splash = document.querySelector(".splash");
    });

    // needs to work to prevent firing a billion times

    function beforeSplash() {
        scroll_PastSplash = true;
        console.log("Trigger Header Mode");

        scroll_ToElem.scrollIntoView({ behavior: "smooth" });
        elem_Splash.classList.add("splash--header");
        headerMode = !headerMode;
    }

    // this won't work when fixed
    function pastSplash() {
        scroll_PastSplash = false;
        console.log("Cancel Header Mode");
    }

    window.onscroll = function () {
        if (scroll_ThresholdElement.getBoundingClientRect().bottom <= 0) {
            if (!scroll_PastSplash) {
                beforeSplash();
            }
        } else {
            if (scroll_PastSplash) {
                pastSplash();
            }
        }
    };
</script>

<!-- redesign:
don't componetize tabs / navbar, make part of splash
Wrap splash stuff in a content element or section that is handled, if scroll past content div then transform header -->

<!-- do events based on content wrapper -->

<!-- <div class="splash" class:splash--header={false}> -->
<div class="splash">
    <div class="splash__blur">
        <!-- use js to display info -->

        <Info />

        <Nav />
    </div>
</div>

<style>
    .splash--header {
        position: fixed;
        width: 100%;
        z-index: 10;
        color: rebeccapurple;
    }

    .splash__content {
        display: none;
    }

    .splash {
        background-image: url("/assets/backgrounds/purplebg.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }

    .splash--header {
        position: fixed;
        width: 100%;
        z-index: 10;
        color: rebeccapurple;
    }

    .splash__blur {
        width: auto;
        height: inherit;
        backdrop-filter: blur(5px);
        background-color: rgb(27 46 132 / 54%);
    }
</style>
