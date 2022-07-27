<script>
    // Vars
    export let title;
    export let src = "/assets/games/cards/rrmenu.png";
    export let size = "normal";
    export let gif = "";

    // Modal
    import { getContext } from "svelte";
    import Popup from "./GamePopup.svelte";
    const { open } = getContext("simple-modal");
    const openPopup = () => open(Popup, { title });
</script>

<div class="game {size} hvr-pulse-grow" on:click={openPopup}>
    <img class="card  full" {src} alt={title} />
    <img class="gif full" src={gif} alt={title} />
    <div class="cover full" />
    <!-- <div class="title full">{title}</div> -->
    <img
        class="icon"
        src="/assets/icons/fullscreen2.png"
        alt="freelance icon"
    />
</div>

<!-- Need cleanup -->
<style>
    /* Effects */
    /* Hover Effects by IanLunn, MIT License: https://github.com/IanLunn/Hover/blob/master/css/hover.css */
    @-webkit-keyframes hvr-pulse-grow {
        to {
            -webkit-transform: scale(1.01);
            transform: scale(1.01);
        }
    }
    @keyframes hvr-pulse-grow {
        to {
            -webkit-transform: scale(1.02);
            transform: scale(1.02);
        }
    }
    .hvr-pulse-grow {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }
    .hvr-pulse-grow:hover,
    .hvr-pulse-grow:focus,
    .hvr-pulse-grow:active {
        -webkit-animation-name: hvr-pulse-grow;
        animation-name: hvr-pulse-grow;
        -webkit-animation-duration: 0.8s;
        animation-duration: 0.8s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }

    /* Game */
    .game {
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 4px;
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
    }

    .game * {
        transition: all 0.4s ease-in-out;
    }

    .game {
        transition: box-shadow 0.4s ease-in-out;
    }

    .game img {
        vertical-align: middle;
        display: inline-block;
        object-fit: cover;
    }

    .game:hover {
        box-shadow: 0px 0px 20px 1px black;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
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
        box-shadow: inset 0 0 20px black;
    }

    .title {
        opacity: 0%;
        color: white;
        top: -150px;
        text-shadow: 2px 2px #000000;
        font-size: 3em;
    }

    /* .game:hover .title {
        opacity: 70%;
        top: 10px;
        align-items: center;
        justify-content: center;
    } */

    .icon {
        position: absolute;
        bottom: -100px;
        left: 0;
        /* top: 0; */
    }

    .game:hover .icon {
        bottom: 2%;
        opacity: 100%;
        /* transition: all 0.2s ease-in-out; */
    }

    /* Card Sizes */
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

    .huge {
        grid-column: span 3;
        grid-row: span 2;
    }

    .full {
        position: absolute;
        max-width: 100%;
        width: 100%;
        height: 100%;
    }
</style>
