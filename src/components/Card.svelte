<script>
    export let title;
    export let src = "/assets/games/cards/rrmenu.png";

    let gif = "/assets/games/cards/testgif.gif";
</script>

<div class="game">
    <!-- <h1>{title}</h1> -->
    <img {src} alt="" class="card" />
</div>

<!-- On enter, change src... -->
<!-- /assets/games/cards/testgif.gif -->

<div id="cf">
    <img class="bottom" src="/assets/games/cards/testgif.gif" />
    <img class="top" src="/assets/games/cards/rrmenu.png" />
</div>

<style>
    .game {
        display: flex;

        /* min-width: 0; */
    }

    .game > img {
        width: 450px;
        border-radius: 10px;
        margin: 10px;
    }

    .game :hover {
        content: url("/assets/games/cards/testgif.gif");
    }

    #cf {
        position: relative;
        height: 281px;
        width: 450px;
        margin: 0 auto;
    }

    #cf img {
        position: absolute;
        left: 0;
        -webkit-transition: opacity 0.3s ease-in-out;
        -moz-transition: opacity 0.3s ease-in-out;
        -o-transition: opacity 0.3s ease-in-out;
        transition: opacity 0.3s ease-in-out;
    }

    #cf img.top:hover {
        opacity: 0;
    }
</style>

<!-- On hover:
show gif, show platform icons (freelance, web, mobile, stuff, game jam, #gamejam #freelance ?) engines?
Title and opacity fades in, mouse changes, hover animation too
Change text color on hover too
horizontal shutter in
 -->