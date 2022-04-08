<script>
    export let title
    export let src = '/assets/games/cards/rrmenu.png'
</script>


    <div class="game">
        <!-- <h1>{title}</h1> -->
        <img {src} alt="" class="card">
    </div>


<style>
    .game {
        display: flex;
        /* min-width: 0; */
    }

    .game > img {
        width: 450px;
    }
</style>