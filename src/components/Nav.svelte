<div class="tabs">
    <div class="tabs__bar">
        <div class="tab tab__web">
            <div>WEB</div>
        </div>

        <div class="tab tab__games">
            <div>GAMES</div>
        </div>
    </div>
    <div class="tabs__fill"></div>
</div>

<!-- Side shadows on hover, current tab could be higher too -->

<style>
    .tabs__fill {
        content: "";
        width: 100%;
        height: 300%;
        position: absolute;
        background-color: rgb(26 26 26);
        /* z-index: 1; */
        top: 48px;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(-3deg);
        -webkit-backface-visibility: hidden;
        overflow: hidden;
    }

    .tabs {
        /* z-index: 1; */
        /* padding: 24px 0px; */
        height: 48px;
        margin-top: 6vw;
        position: relative;
        transition: all 0.4s ease-in-out;
    }

    .tabs__bar {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 41%);
        /* z-index: 1; */
        top: 0;
        left: 0;
        transform-origin: bottom left;
        transform: skewY(-3deg);
        -webkit-backface-visibility: hidden;
        /* overflow: hidden; */
    }

    .tab {
        display: flex;
        align-self: center;
        justify-content: center;
        align-items: center;
        align-self: center;
        font-size: larger;
        font-weight: bold;
        bottom: 0;
        transition: all 0.1s ease-out;
    }

    .tab:hover {
        /* background-color: wheat; */
        height: 120%;
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
