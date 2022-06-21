<!-- Scroll fix:
    Content is hidden before scroll completes, so it jumps, needs to scroll then apply header stuff
    Content jump is fixed, but need to add margin to page now...
    remove skew as soon as scroll applied
-->
<script>
    import Info from "./../components/Info.svelte";
    import Nav from "./../components/Nav.svelte";

    let header = false;

    let scroll_PastSplash = false;

    let scroll_ThresholdElement = null;
    let scroll_ToElem = null;
    let elem_Splash = null;

    // better way to do this? check svelte docs
    document.addEventListener("DOMContentLoaded", function () {
        // scroll_ThresholdElement = document.querySelector(".info__links");

        scroll_ThresholdElement = document.querySelector(".info__title");

        scroll_ToElem = document.querySelector(".tabs");
        elem_Splash = document.querySelector(".splash");

        // !!!! Will rename soon !!!!
        // elem_nav = document.querySelector(".tabs")
    });

    // start header mode
    function beforeSplash() {
        scroll_PastSplash = true;
        console.log("Trigger Header Mode");
        console.log("YOU SCROLLED DOWN");

        scroll_ToElem.scrollIntoView({ behavior: "smooth" });
        // elem_Splash.classList.add("splash--header");
        // header = !header;
    }

    // end header mode
    // this won't work when fixed
    function pastSplash() {
        scroll_PastSplash = false;
        console.log("Cancel Header Mode");
    }

    // can use svelte on:scroll
    window.onscroll = function () {
        // if (scroll_ThresholdElement.getBoundingClientRect().bottom <= 0) {
        //     if (!scroll_PastSplash) {
        //         beforeSplash();
        //     }
        // } else {
        //     if (scroll_PastSplash) {
        //         pastSplash();
        //     }
        // }

        // will also rename
        const elem = document.querySelector(".tabs__bar");

        // console.log('bottom', Math.round(elem.getBoundingClientRect().bottom))
        // console.log('height', Math.round(elem.offsetHeight))

        if (!header) {
            if (
                Math.round(elem.getBoundingClientRect().bottom - 2) <=
                elem.offsetHeight
            ) {
                // functionalize me
                console.log("YEET");
                header = !header;

                const page = document.querySelector('.page')
                console.log(page)
                page.scrollIntoView
                window.scrollTo(0,0); 
            }
        }
    };

    // should prevent duplicate events too
    function handleScroll(e) {
        e.deltaY > 0 ? beforeSplash() : console.log("YOU SCROLLED UP");
    }
</script>

<!-- HTML -->
<!-- Probably better to convert on:wheel to window events so I can prevent scrolling all across page -->
<div
    class="splash"
    class:header
    on:wheel|preventDefault={(e) => handleScroll(e)}
>
    <div class="splash__blur">
        <!-- Wrapper for hiding splash content in header mode -->
        <div class="splash__content" class:header>
            <Info />
        </div>

        <div class="splash__nav">
            <Nav {header} />
        </div>
    </div>
</div>

<style>
    .splash {
        background-image: url("/assets/backgrounds/purplebg.jpg");
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
    }

    .splash.header {
        background-image: none;
        position: fixed;
        width: 100%;
        z-index: 10;
    }

    .splash__blur {
        width: auto;
        height: inherit;
        backdrop-filter: blur(5px);
        background-color: rgb(27 46 132 / 54%);
    }

    .splash__content.header {
        display: none;
    }
</style>
