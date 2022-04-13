<script>
	import Showcase from './Showcase.svelte';
    export let title;
    export let desc;
</script>

<div class="showcase">

    <div class="spotlight">
        Game Here
    </div>

    <div class="details">
        <h1>{title}</h1>
        <p>{desc}</p>
        <img src="/assets/games/cards/musklander1.png" alt="" class="src">
        
        <img src="/assets/games/cards/musklander1.png" alt="" class="src">

        <img src="/assets/games/cards/musklander1.png" alt="" class="src">
        
    </div>



  
</div>

<style>
    .showcase {
        border: red 1px solid;
        background-color: grey;
        display: flex;
        /* height: 100vh; */
        height: 90%;
        /* max-height: 50%; */
        
    }

    .spotlight {
        flex: 1;
    }

    .details {
        flex: 1;
        overflow: scroll;
        overflow-x: hidden;
    }

    .details > img {
        max-width: 90%;
    }

</style>