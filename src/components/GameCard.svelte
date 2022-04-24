<script>
    export let title;
    export let src = "/assets/games/cards/rrmenu.png";

	import router from "page";

    let gif = "/assets/games/cards/testgif.gif";

    // let gif = "/assets/games/cards/cardGIF_RR2.gif";

    function test(){
        router('/games/roadwayrepair');
        console.log("yo")
    }
    
</script>


<div class="game">
    <!-- <h1>{title}</h1> -->

    <!-- <img {src} alt="" class="card" /> -->

    <a href={`/games/${title.split(" ").join("").toLowerCase()}`}><img on:click={test} class="cover" {src} /></a>

    <!-- <button on:click="{test}">
    CLICK ME</button> -->
    <!-- <img class="gif" alt="placeholder" src={gif} /> -->
</div>

<!-- On enter, change src... -->

<!-- On hover:
show gif, show platform icons (freelance, web, mobile, stuff, game jam, #gamejam #freelance ?) engines?
Title and opacity fades in, mouse changes, hover animation too
Change text color on hover too
horizontal shutter in
 -->

<!-- /assets/games/cards/testgif.gif -->
<style>
    .game {
        display: flex;
    }

    .game img {
        width: 450px;
        border-radius: 10px;
        margin: 10px;

        /* position: relative; */
    }

    /* .game :hover {
        content: url("/assets/games/cards/testgif.gif");
    } */

    .cover {
        /* opacity: 0; */
    }

    .game .gif {
        /* background-size: cover; */
        height: 253px;
        width: auto;
        position: absolute;
        opacity: 0;
        /* left: 0; */
    }

    .game .gif:hover {
        opacity: 100;
        /* position: absolute; */
        /* left: 0; */
        -webkit-transition: opacity 1s ease-in-out;
        -moz-transition: opacity 0.3s ease-in-out;
        -o-transition: opacity 0.3s ease-in-out;
        transition: opacity 1s ease-in-out;
    }
</style>
