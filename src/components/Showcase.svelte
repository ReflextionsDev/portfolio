<script>
    export let title;
    export let desc;
</script>

<div class="showcase">
    <div class="spotlight">Game Here</div>
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
    .showcase {
        border: red 1px solid;
        display: flex;
        height: 90%;
    }

    .spotlight {
        flex: 1;
        background-color: grey;
    }

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
