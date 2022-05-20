<!-- On hover:
show gif, show platform icons (freelance, web, mobile, stuff, game jam, #gamejam #freelance ?) engines?
Title and opacity fades in, mouse changes, hover animation too
Change text color on hover too
horizontal shutter in
 -->
 
<script>
    export let title;
    export let src = "/assets/games/cards/rrmenu.png";
    export let size = "normal";
    export let gif = "";
</script>

<div class="game {size}">
    <a href={`/games/${title.split(" ").join("").toLowerCase()}`}>
        <img class="cover" {src} />
        <img class="gif" src={gif} />
    </a>
</div>

<style>
    .game {
        /* display: flex; */
        justify-content: center;
        align-items: center;
    }

    .game img {
        /* width: 450px;
        border-radius: 10px; */
        /* margin: 10px; */
        /* position: relative; */
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    .tall {
        grid-row: span 2;
    }

    .wide {
        grid-column: span 2;
    }

    .big {
        grid-column: span 2;
        grid-row: span 2;
    }

    .game :hover {
        content: url("/assets/previewgif.gif");
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        opacity: 10;
    }

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
