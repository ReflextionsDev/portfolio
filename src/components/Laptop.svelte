<script>
    export let src;
</script>

<div class="laptop">
    <div class="laptop__top">
        <div class="laptop__speaker" />
    </div>
    <div class="laptop__mid">
        <div class="game">
            <iframe {src} title="Game Preview (laptop)" />
        </div>
    </div>
    <div class="laptop__bot">
        <div class="laptop__home" />
    </div>
</div>

<style>
    .laptop {
 
        /* height: 480px; */
        /* width: 640px; */
        width: 87%;
        /* max-height: 10%; */
        /* max-width: 100%; */
        aspect-ratio: 3/2 ;
        /* width: 100%; */

        background-color: rgb(1, 16, 11);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 0px 12px rgb(82, 82, 82);
        align-items: center;
    }

    .laptop__top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .laptop__speaker {
        /* background-color: rgb(41, 41, 41);
        width: 50%;
        height: 10%;
        border-radius: 5px; */
        height: 20%;
        aspect-ratio: 1/1;
        border: rgb(77, 77, 77) 3px solid;
        background-color: rgb(214, 11, 11) 3px solid;
        border-radius: 50px;
    }

    .laptop__mid {
        width: 95%;
        /* flex: 1; */
        height: 90%;
        margin: auto;
    }

    .laptop__bot {
        flex: 1.5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110%;
        background-color: black;
        border-radius: 0px 0px 100px 100px;
        box-shadow: 3px 5px 12px rgb(82, 82, 82);
    }

    .laptop__home {
        /* height: 55%;
        aspect-ratio: 1/1;
        border: rgb(41, 41, 41) 3px solid;
        border-radius: 50px; */
    }

    .game {
        width: 100%;
        height: 100%;
    }

    .game iframe {
        border: none;
        width: 100%;
        height: 100%;
        /* border-radius: 15px; */
    }
</style>
