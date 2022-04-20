<script>
    import Games from "./Games.svelte";

    import Laptop from "./Laptop.svelte";

    import Phone from "./Phone.svelte";

    export let title;
    export let desc;
    export let platform;
</script>

<!-- src="https://fascinating-kitsune-33d92d.netlify.app/" -->

<!-- For landscape, adjust spotlight flex and make page bigger (vw height) -->

<div class="page">
    <div class="showcase">
        <div class="spotlight">


            {#if platform === "phone"}
                <Phone src="https://taupe-dolphin-87a2aa.netlify.app/" />
            {:else if platform === "laptop"}
                <Laptop src="https://fascinating-kitsune-33d92d.netlify.app/" />
            {/if}
        </div>
        <div class="info">
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
                        <br />
                        <img
                            src="/assets/games/cards/musklander1.png"
                            alt=""
                            class="src"
                        />
                        <br />
                        <img
                            src="/assets/games/cards/musklander1.png"
                            alt=""
                            class="src"
                        />
                        <br />
                        <!-- <Games games={games}/> -->
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
        /* max-width: 137vh; */
        /* max-width: 167vh; */
        border-radius: 10px;
        background-color: white;
        display: flex;
        width: 90%;
        height: 85%;
        max-width: 1920px;
        box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
    }

    /* [Spotlight] */
    .spotlight {
        /* flex: 1; */
        flex: 1;
        /* background-color: rgb(245, 245, 245); */
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 50%;
    }

    /* [Details] */

    .laptop {
        background-color: wheat;
    }

    .info {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        /* max-width: 100%; */
        min-width: 620px;
        /* max-width: 50%; */
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
