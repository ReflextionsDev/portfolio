<script>
    export let title;
    export let desc;
</script>

<div class="showcase">

    <div class="spotlight">
        <div class="game">
            <iframe src="https://taupe-dolphin-87a2aa.netlify.app/" title="description"></iframe>
        </div>
    </div>

    <div class="details">
        <div class="content">
            <h1>{title}</h1>
            <p style="font-size:1.5em; text-align:justify">{desc}</p>
            <div class="details__images">
                <img src="/assets/games/cards/musklander1.png" alt="" class="src" />
                <img src="/assets/games/cards/musklander1.png" alt="" class="src" />
                <img src="/assets/games/cards/musklander1.png" alt="" class="src" />
            </div>
        </div>
    </div>

</div>

<style>
    /* Showcase */
    .showcase {
        border: red 1px solid;
        display: flex;
        height: 90%;
    }

    /* Spotlight */
    .spotlight {
        flex: 1;
        background-color: rgb(220, 220, 220);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .game {
        /* width: 640px; */
        height: 960px;
        max-height: 75%;
        aspect-ratio: 2/3;
        background-color: aquamarine;
        /* border: 1px rgb(65, 135, 155) solid; */
    }

    .game iframe {
        border: none;
        width: 100%;
        height: 100%;
        /* border-bottom: 1px black solid; */
        box-shadow: 3px 5px 12px rgb(0, 0, 0);
    }

    /* Details */
    .details {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }

    /* max width div? */

    .content {
        max-width: 80%;
        /* align-self: center; */
        margin: auto;
    }

    img {
        /* padding: 20%; */
        max-width: 100%;
        border-radius: 4%;
    }

    .details__images {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        padding: 30px 0px;
    }


</style>
