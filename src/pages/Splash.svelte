<script>
    import { onMount } from "svelte";

    import Info from "./../components/Info.svelte";
    import Nav from "./../components/Nav.svelte";

    let header = false;

    // Responsive variables to set splash top to the bottom of content: so sticky position can be used
    let contentHeight;
    let splashTop = "";
    $: splashTop = -contentHeight + "px";

    let elem;

    // Convert to svelte... onMount and stuff

    document.addEventListener("DOMContentLoaded", function () {
        elem = document.querySelector(".splash__nav");
        console.log(elem);
    });

    function updateNav() {
        // console.log("test", Math.floor(elem.getBoundingClientRect().top));

        const navTop = Math.floor(elem.getBoundingClientRect().top);

        navTop <= 0 ? (header = true) : (header = false);

        // console.log("header", header);
    }
</script>

<svelte:window
    on:scroll={(e) => {
        updateNav();
    }}
/>

<div class="splash" class:header style="--splashTop: {splashTop};">
    <div class="splash__blur" class:header>

  
      
        

        <!-- Wrapper for hiding splash content in header mode -->
        <div class="splash__content" bind:offsetHeight={contentHeight}>
            <br/>
            <br/>
            <br/>
        

            
            <Info />

            <br/>
            <br/>
            <br/>
        
        
        </div>

     


        <div class="splash__nav">
            <Nav />
        </div>
    </div>
</div>

<style>
    .splash {
        position: sticky;
        top: var(--splashTop);
        z-index: 100;
        
    }

    .splash::after {
        background-color: rgb(27 46 132 / 54%);
    }

    .splash::before {
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

    .splash.header::before {
        opacity: 50%;
    }



    .splash__blur {
        width: auto;
        height: inherit;
        /* backdrop-filter: blur(3px); */
        background-color: rgb(27 46 132 / 54%);
    }

    .splash__blur.header {
         backdrop-filter: blur(3px);
    }

    .splash__content {
        padding-bottom: 6vw;
    }
</style>
