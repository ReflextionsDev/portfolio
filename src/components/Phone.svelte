<script>
    export let src;
</script>

<div class="phone">
    <div class="phone__top">
        <div class="phone__speaker" />
    </div>
    <div class="phone__mid">
        <div class="game">
            <iframe {src} title="Game Preview (Phone)" />
        </div>
    </div>
    <div class="phone__bot">
        <div class="phone__home" />
    </div>
</div>

<style>
    .phone {
        height: 960px;
        max-height: 90%;
        aspect-ratio: 9/16;
        background-color: rgb(1, 16, 11);
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 5px 12px rgb(82, 82, 82);
    }

    .phone__top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__speaker {
        background-color: rgb(41, 41, 41);
        width: 50%;
        height: 10%;
        border-radius: 5px;
    }

    .phone__mid {
        width: 90%;
        flex: 9;
        margin: auto;
    }

    .phone__bot {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__home {
        height: 55%;
        aspect-ratio: 1/1;
        border: rgb(41, 41, 41) 3px solid;
        border-radius: 50px;
    }
    .phone {
        height: 960px;
        max-height: 90%;
        aspect-ratio: 9/16;
        background-color: rgb(1, 16, 11);
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 5px 12px rgb(82, 82, 82);
    }

    .phone__top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__speaker {
        background-color: rgb(41, 41, 41);
        width: 50%;
        height: 10%;
        border-radius: 5px;
    }

    .phone__mid {
        width: 90%;
        flex: 9;
        margin: auto;
    }

    .phone__bot {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__home {
        height: 55%;
        aspect-ratio: 1/1;
        border: rgb(41, 41, 41) 3px solid;
        border-radius: 50px;
    }

    .game {
        width: 100%;
        height: 100%;
    }

    .game iframe {
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }
</style>