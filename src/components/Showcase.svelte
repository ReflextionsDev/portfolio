<script>
    export let title;
    export let desc;
</script>

<div class="page">
    <div class="showcase">
        <div class="spotlight">
            <div class="phone">
                <div class="phone__top">
                    <div class="phone__speaker" />
                </div>
                <div class="phone__mid">
                    <div class="game">
                        <iframe
                            src="https://taupe-dolphin-87a2aa.netlify.app/"
                            title="description"
                        />
                    </div>
                </div>
                <div class="phone__bot">
                    <div class="phone__home" />
                </div>
            </div>
        </div>
        <div class="flexCenter">
            <div class="details">
                <div class="content">
                    <h1>{title}</h1>
                    <p style="font-size:1.5em; text-align:justify">{desc}</p>
                    <div class="details__images">
                        <img
                            src="/assets/games/cards/musklander1.png"
                            alt=""
                            class="src"
                        />
                        <br/>
                        <img
                            src="/assets/games/cards/musklander1.png"
                            alt=""
                            class="src"
                        />
                        <br/>
                        <img
                            src="/assets/games/cards/musklander1.png"
                            alt=""
                            class="src"
                        />
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* [Page] */
    .page {
        height: 90%;
        background-color: rgb(244, 244, 244);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* [Showcase] */
    .showcase {
        /* border: red 1px solid; */
        /* max-width: 1140px; */
        max-width: 137vh;
        border-radius: 10px;
        background-color: white;
        display: flex;
        width: 90%;
        height: 85%;
        box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
    }

    /* [Spotlight] */
    .spotlight {
        flex: 1;
        /* background-color: rgb(245, 245, 245); */
        display: flex;
        align-items: center;
        justify-content: center;
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

    /* [Details] */

    .flexCenter {
        flex: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
    }

    .details {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-width: 100%;
        max-height: 88%;
    }

    /* max width div? */

    .content {
        max-width: 75%;
        max-height: 90%;
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

    /* custom scrollbar */
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: hsl(196, 15%, 86%);
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
</style>
