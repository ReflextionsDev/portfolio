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
        <img class="card  full" {src} alt={title} />
        <img class="gif full" src={gif} alt={title} />
        <div class="cover full" />
        <!-- <div class="title full">{title}</div> -->
        <img class="icon" src="/assets/icons/fullscreen2.png" />
    </a>
</div>

<style>
    .game {
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 34px;
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

    /* Relative used to allow links to be usable as absolute parent containers */

    a {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
    }

    a * {
        transition: all 0.4s ease-in-out;
    }

    .full {
        position: absolute;
        max-width: 100%;
        width: 100%;
        height: 100%;
    }

    .game img {
        vertical-align: middle;
        display: inline-block;
        object-fit: cover;
    }

    .game {
        transition: box-shadow 0.4s ease-in-out;
    }

    .game:hover {
        box-shadow: 0px 0px 20px 1px black;

    }

    .game .gif {
        left: 0;
        opacity: 0;
    }

    .game:hover .gif {
        opacity: 100;
    }

    .cover {
        top: 0;
        background-color: black;
        opacity: 0%; 
    }

    .game:hover .cover {
        opacity: 20%;
        /* vignette */
        /* box-shadow: inset 0 0 20px black; */
    }

    .title {
        opacity: 0%;
        color: white;
        top: -150px;
        text-shadow: 2px 2px #000000;
        font-size: 3em;
    }

    .game:hover .title {
        opacity: 70%;
        top: 10px;
        align-items: center;
        justify-content: center;
    }

    .icon {
        position: absolute;
        bottom: -100px;
        /* top: 0; */
        /* opacity: 0; */
    }

    .game:hover .icon {
        bottom: 2%;
        opacity: 100%;
        /* transition: all 0.2s ease-in-out; */
    }
</style>
