<script>
    import Games from "./Games.svelte";
    import Skills from "./../components/Skills.svelte";
    import Info from "./../components/Info.svelte";
</script>

<!-- Intro, Skills, Projects, Contact and Resume PDF at bottom of page -->
<!-- Could move about section to below projects w/ resume -->
<!-- Pass in background color as var -->

<div>
    <Info />

    <div class="tabs">
        <div class="tabs__bar">

            <div class="tab tab__web">
                <div>WEB</div>
            </div>
            
            <div class="tab tab__games">
                <div>GAMES</div>
            </div>

        </div>
    </div>

    <Skills />
    <Skills />
    <Skills />
</div>

<style>
    .tabs {
        /* z-index: 1; */
        padding: 24px 0px;
        background-color: black;
        position: relative;
        
    }

    .tabs__bar {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: inherit;
        /* z-index: 1; */
        top: 0;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(-3deg);
        -webkit-backface-visibility: hidden;
        overflow: hidden;
    }


    .tab {
        display: flex;
        align-self: center;
        justify-content: center;
        align-items: center;
        align-self: center;
        font-size: larger;
        font-weight: bold;
    }

    .tab:hover {
        background-color: wheat;
    }

    .tab__web {
        z-index: 1;
        background-color: rgb(98, 29, 247);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 80%;
    }

    .tab__games {
        z-index: 1;
        background-color: rgb(53, 129, 186);
        position: absolute;
        width: 10%;
        height: 100%;
        left: 90%;
    }
</style>
