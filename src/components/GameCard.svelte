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
        <img class="card" {src} alt={title} />
        <img class="gif" src={gif} alt={title} />
        <div class="cover"></div>
        <div class="title">{title}</div>
    </a>
</div>

<style>
    .game {
        justify-content: center;
        align-items: center;
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

    a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }

    .game img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        display: inline-block;
        object-fit: cover;
        border-radius: 5px;
    }

    .game .gif {
        position: absolute;
        left: 0;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    .game:hover .gif {
        opacity: 100;
    }

    .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: black;
        opacity: 0%;
        transition: opacity 0.4s ease-in-out;
    }

    .game:hover .cover {
        opacity: 30%;
    }

</style>