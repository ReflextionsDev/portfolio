<script>
    import Info from "./../components/Info.svelte";
    import Nav from "./../components/Nav.svelte";

    let header = false;
</script>

<div class="splash" class:header>
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
        /* background-image: none; */
        opacity: 50%;
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

    .splash__content {
        padding-bottom: 6vw;
    }
</style>
