<script>
    export let title;
    export let desc;
</script>

<div class="showcase">

    <div class="spotlight">
        <div class="phone">
            <div class="phone__top">
                <div class="phone__speaker"></div>
            </div>
            <div class="phone__mid">
            <div class="game">
                <iframe src="https://taupe-dolphin-87a2aa.netlify.app/" title="description"></iframe>
            </div>
            </div>
            <div class="phone__bot">
                <div class="phone__home"></div>
            </div>
        
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

    .phone {
        height: 960px;
        max-height: 75%;
        aspect-ratio: 9/16;
        background-color: rgb(1, 16, 11);
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        /* justify-content: center; */
         box-shadow: 3px 5px 12px rgb(82, 82, 82);
    }

    .phone__top {
        flex: 1;
        /* background-color: rgb(20, 137, 149); */
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
        background-color: rebeccapurple;
        margin: auto;
    }
    
    .phone__bot {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__home {
        background-color: rgb(41, 41, 41);
        height: 60%;
        aspect-ratio: 1/1;
        border-radius: 50px;
    }
    

    .game {
        /* width: 640px; */
        /* height: 960px;
        max-height: 75%;
        aspect-ratio: 2/3;
        background-color: aquamarine; */
        /* border: 1px rgb(65, 135, 155) solid; */
        width: 100%;
        height: 100%;
    }

    .game iframe {
        border: none;
        width: 100%;
        height: 100%;
        /* border-bottom: 1px black solid; */
        /* box-shadow: 3px 5px 12px rgb(0, 0, 0); */
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
