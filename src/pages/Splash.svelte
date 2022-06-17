<script>
    import Info from "./../components/Info.svelte";
    import Nav from "./../components/Nav.svelte";
</script>


<div class="splash">
<div class="splash__blur">
    
<Info />
<Nav />

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

    .splash__blur {
        width: auto;
        height: inherit;
        backdrop-filter: blur(5px);
        background-color: rgb(27 46 132 / 54%);
    }
</style>